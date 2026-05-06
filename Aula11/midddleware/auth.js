const jwt = require('jsonwebtoken');

module.exports = {
    authenticateTokenFromSession: function (req, res, next) {
        const token = req.session.token;
        if (token == null) return res.sendStatus(401);
        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if (err)
            return res.sendStatus(403);
            //req.user = user;
            next();
        });
    },

    authenticateTokenFromHeaders: function (req, res, next) {
        // Gather the jwt access token from the request header  
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; 
        // Unauthorized
        if (token == null) return res.sendStatus(401);
            jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if (err)
            return res.sendStatus(403); // Forbidden
            req.user = user;
            next();
        });
    }
}