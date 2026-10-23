(function () {
    function render(container, norma) {
        if (!container || (!norma.introduction && !norma.image)) {
            container?.replaceChildren();
            return;
        }

        const introContainer = document.createElement('div');
        introContainer.className = 'intro-container';

        if (norma.introduction) {
            const introText = document.createElement('div');
            introText.className = 'intro-text';
            const introContent = document.createElement('div');
            introContent.className = 'intro-content';

            const title = document.createElement('h1');
            title.className = 'intro-titulo';
            title.textContent = norma.displayTitle || norma.title;

            const paragraph = document.createElement('p');
            paragraph.className = 'intro-parrafo';
            const emphasis = Array.isArray(norma.introductionEmphasis)
                ? norma.introductionEmphasis.filter(Boolean)
                : [];

            if (emphasis.length === 0) {
                paragraph.textContent = norma.introduction;
            } else {
                const escapedTerms = emphasis
                    .map(term => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
                    .join('|');
                const matcher = new RegExp(escapedTerms, 'g');
                let cursor = 0;

                for (const match of norma.introduction.matchAll(matcher)) {
                    paragraph.append(document.createTextNode(norma.introduction.slice(cursor, match.index)));
                    const strong = document.createElement('strong');
                    strong.textContent = match[0];
                    paragraph.append(strong);
                    cursor = match.index + match[0].length;
                }

                paragraph.append(document.createTextNode(norma.introduction.slice(cursor)));
            }

            introContent.appendChild(paragraph);
            introText.append(title, introContent);
            introContainer.appendChild(introText);

            if (norma.image) {
                const image = document.createElement('img');
                image.src = norma.image.src;
                image.alt = norma.image.alt || norma.title;
                image.className = norma.image.className || '';
                introContent.appendChild(image);

                const syncImageHeight = () => {
                    const paragraphHeight = paragraph.getBoundingClientRect().height;
                    if (paragraphHeight > 0) image.style.height = `${paragraphHeight}px`;
                };
                image.addEventListener('load', syncImageHeight, { once: true });
                if (window.ResizeObserver) {
                    const observer = new ResizeObserver(() => {
                        if (!paragraph.isConnected) {
                            observer.disconnect();
                            return;
                        }
                        syncImageHeight();
                    });
                    observer.observe(paragraph);
                }
            }
        } else if (norma.image) {
            const image = document.createElement('img');
            image.src = norma.image.src;
            image.alt = norma.image.alt || norma.title;
            image.className = norma.image.className || '';
            introContainer.appendChild(image);
        }

        container.replaceChildren(introContainer);
    }

    window.LNEIntroductionRenderer = Object.freeze({ render });
})();
