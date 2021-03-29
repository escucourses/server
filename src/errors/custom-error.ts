export interface ErrorBody {
  message?: string;
  file?: string;
  originalError?: Error;
  triggeredByUser?: number;
}

export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): { message: string; field?: string }[];
}
