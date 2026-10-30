'use strict';
// Move an ordinary MP4 index ahead of its media, without re-encoding any track.
const fs = require('node:fs'), crypto = require('node:crypto');
function atoms(buffer, start = 0, end = buffer.length) {
    const result = [];
    for (let offset = start; offset < end;) {
        if (offset + 8 > end) throw new Error('Truncated MP4 atom');
        let size = buffer.readUInt32BE(offset), header = 8;
        if (size === 1) { size = Number(buffer.readBigUInt64BE(offset + 8)); header = 16; }
        if (size === 0) size = end - offset;
        if (!Number.isSafeInteger(size) || size < header || offset + size > end) throw new Error('Invalid MP4 atom');
        result.push({ offset, size, header, type: buffer.toString('ascii', offset + 4, offset + 8) });
        offset += size;
    }
    return result;
}
function faststart(input) {
    const boxes = atoms(input), indexes = boxes.filter(b => b.type === 'moov'), media = boxes.filter(b => b.type === 'mdat');
    if (indexes.length !== 1 || media.length !== 1 || boxes.some(b => ['moof', 'sidx', 'mfra'].includes(b.type))) throw new Error('Only a single unfragmented MP4 is supported');
    const moov = indexes[0], mdat = media[0];
    if (moov.offset < mdat.offset) return Buffer.from(input);
    const index = Buffer.from(input.subarray(moov.offset, moov.offset + moov.size));
    let tables = 0;
    function relocate(start, end) {
        for (const box of atoms(index, start, end)) {
            const payload = box.offset + box.header;
            if (['moov', 'trak', 'mdia', 'minf', 'stbl'].includes(box.type)) relocate(payload, box.offset + box.size);
            if (!['stco', 'co64'].includes(box.type)) continue;
            tables++;
            const count = index.readUInt32BE(payload + 4), width = box.type === 'stco' ? 4 : 8;
            if (payload + 8 + count * width !== box.offset + box.size) throw new Error('Invalid chunk offset table');
            for (let i = 0; i < count; i++) {
                const position = payload + 8 + i * width;
                const old = width === 4 ? index.readUInt32BE(position) : Number(index.readBigUInt64BE(position));
                if (!Number.isSafeInteger(old) || old < mdat.offset + mdat.header || old >= mdat.offset + mdat.size) throw new Error('Chunk lies outside media');
                const updated = old + moov.size;
                if (width === 4) { if (updated > 0xffffffff) throw new Error('32-bit chunk overflow'); index.writeUInt32BE(updated, position); }
                else index.writeBigUInt64BE(BigInt(updated), position);
            }
        }
    }
    relocate(0, index.length);
    if (!tables) throw new Error('No media chunk tables found');
    const output = Buffer.concat(boxes.flatMap(box => box === moov ? [] : box === mdat ? [index, input.subarray(box.offset, box.offset + box.size)] : [input.subarray(box.offset, box.offset + box.size)]));
    const moved = atoms(output).find(box => box.type === 'mdat');
    const hash = value => crypto.createHash('sha256').update(value).digest('hex');
    if (output.length !== input.length || hash(input.subarray(mdat.offset, mdat.offset + mdat.size)) !== hash(output.subarray(moved.offset, moved.offset + moved.size))) throw new Error('Media bytes changed');
    return output;
}
if (require.main === module) {
    const [source, target] = process.argv.slice(2);
    if (!source || !target || source === target) throw new Error('Usage: node faststart-video.cjs input.mp4 output.mp4');
    const input = fs.readFileSync(source), output = faststart(input);
    fs.writeFileSync(target, output, { flag: 'wx' });
    console.log(JSON.stringify({ bytes: output.length, atoms: atoms(output).map(b => ({ type: b.type, offset: b.offset, size: b.size })), media: 'identical bytes; no re-encoding' }));
}
module.exports = { faststart, atoms };
