export default class HttpError extends Error {
  constructor(message, errorCode) {
    super(message); //Add a 'message' propoerty
    this.code = errorCode;
  }
}
