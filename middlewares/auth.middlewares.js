
function updateLocals(req, res, next) {
    if (req.session.user) res.locals.isUserActive = true
    else res.locals.isUserActive = false

    next();
}

function isLoggedIn(req, res, next) {
    if (req.session.user) next()
    else res.redirect("/auth/login")
}

function isAdmin(req, res, next) {
    if (req.session.user.role === "admin") next();
    else res.redirect("/auth/login")
}

module.exports = {
    updateLocals: updateLocals,
    isLoggedIn: isLoggedIn,
    isAdmin: isAdmin,
};
