class SuccessfulResponse {
  constructor(res, statusCode, message, data) {
    this.res = res;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }

  buildResponse() {
    this.res.status(this.statusCode).json({
      success: true,
      message: this.message,
      data: this.data,
    });
  }
}

module.exports = SuccessfulResponse;
