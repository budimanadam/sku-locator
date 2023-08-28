async function auth(req, rep) {
    if (!req.headers.authorization || req.headers.authorization === null || req.headers.authorization === 'null') {
        return rep.view("/templates/login.ejs");
    }
}

module.exports = {auth};
