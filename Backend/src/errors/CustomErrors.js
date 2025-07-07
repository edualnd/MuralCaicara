class CustomError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
    this.name = this.name;
  }
}
export default CustomError;
