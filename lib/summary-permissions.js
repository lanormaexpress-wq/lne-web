// Populated by requireAdmin from the protected database table, never request bodies/user_metadata.
const isOwner = user => user?.app_metadata?.role === 'owner';
const catalog = require('../admin-permission-catalog');
const allowed = (user, key) => catalog.allowed({ owner: isOwner(user), permissions: user?.admin_permissions }, key);
const canPublish = user => allowed(user, 'summary_access') && allowed(user, 'summary_publish');
const canCreateCard = user => allowed(user, 'summary_access') && allowed(user, 'summary_cards_manage');
const requirePermission = key => (req, res, next) => allowed(req.adminUser, key) ? next() : res.status(403).json({ error: 'No tienes permiso para esta operación.' });
module.exports = { isOwner, canPublish, canCreateCard, allowed, requirePermission };
