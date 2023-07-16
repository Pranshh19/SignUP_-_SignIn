const JWT = require('jsonwebtoken');

//Middleware me humesha next krna jruri hai nhi toh loop me fas jayega

const jwtAuth = (req,res,next) => {
    const token = (req.cookies && req.cookies.token) || null;

    if (!token) {
        return res.status(400).json({
            success: false,
            message: "Not Authorized"
        })
    }

    try {
        const payload = JWT.verify(token, process.env.SECRET);

        //Joh getuser me email and id access hori woh yhn se hori hai dhyan rkhna
        req.user = { id: payload.id, email: payload.email };
    }
    catch {
        return res.status(400).json({
            success: false,
            message: e.message
        })
    }

    next();
}


module.exports = jwtAuth;