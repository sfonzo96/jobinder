class Result {
    constructor(isSuccess, code, message = null, data = null) {
        this.isSuccess = isSuccess;
        this.code = code;
        this.data = data;
        this.message = message;
    }

    static Success(code = 200, message = null, data = null) {
        return new Result(true, code, message, data);
    }

    static Failure(
        code = 500,
        errorMessage = "Ocurrió un problema inesperado."
    ) {
        return new Result(false, code, errorMessage);
    }
}

export default Result;
