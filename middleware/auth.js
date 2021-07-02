module.exports = {
    ensureAuth: function (req, res, next) {
        if(req.session.user) {
            console.log(req.session.user);
            return next();
        } else {
            res.status(401).send("Unauthorized");
        }
    },
    ensureGuest: function (req, res, next) {
        if(req.session.user) {
            res.status(403).send("Forbidden");
        } else {
            return next();
        }
    }
}