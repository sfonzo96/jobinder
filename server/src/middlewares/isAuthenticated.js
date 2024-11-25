import Result from "../utils/Result.js";
import HttpStatusCodes from "../utils/httpStatusCodes.js";

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }

    return res.handleResult(
        Result.Failure(
            HttpStatusCodes.UNAUTHORIZED,
            "Necesitas autenticarte para acceder."
        )
    );
};

export default isAuthenticated;
