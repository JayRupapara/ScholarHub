import jwt from 'jsonwebtoken';
import StatusCodes from 'http-status-codes';
export default (req, res, next) => {
    try {
        let token = req.cookies.accessToken;
        if (token == null) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: "Unauthorized",
                success: false
            });
        }
        jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
            if (err) {
                return res.status(StatusCodes.UNAUTHORIZED).json({
                    message: "Unauthorized"+err.message,
                    success: false
                });
            } else {
                req.user = user;
                console.log("user", user);
                next();
            }
        });
    } catch (error) {
        // console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message,
            success: false
        });
    }
};
