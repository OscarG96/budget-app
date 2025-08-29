// errors/DatabaseError.ts
import { BaseError } from './BaseError';

export class DatabaseError extends BaseError {
  constructor(message: string, public originalError?: unknown) {
    super(message);
  }
}