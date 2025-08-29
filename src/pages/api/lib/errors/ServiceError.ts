import { BaseError } from './BaseError';

export class ServiceError extends BaseError {
  constructor(message: string, public cause?: unknown) {
    super(message);
  }
}