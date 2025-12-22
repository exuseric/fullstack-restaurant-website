export class AppError extends Error {
  public readonly code: number;

  constructor(message: string, code: number) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Resource not found") {
    super(message, 404);
  }
}

export class BadRequestError extends AppError {
  constructor(message = "Invalid input provided") {
    super(message, 400);
  }
}

export class InternalServerError extends AppError {
  constructor(message = "An unexpected error occurred") {
    super(message, 500);
  }
}
