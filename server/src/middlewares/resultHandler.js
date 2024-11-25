function resultHandler(req, res, next) {
    if (!res.handleResult) {
        res.handleResult = (result) => {
            return res.status(result.code).json({
                success: result.isSuccess,
                message: result.message,
                data: result.data,
            });
        };
    }

    next();
}

export default resultHandler;
