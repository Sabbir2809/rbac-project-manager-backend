export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly details?: any;

  constructor(
    message: string,
    statusCode: number,
    isOperational = true,
    details?: any
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.details = details;

    // Capture stack trace for better error logging
    Error.captureStackTrace(this, this.constructor);
  }
}

// Not Found Error: 404 for missing resources
export class NotFoundError extends AppError {
  constructor(message = "Resources Not Found!") {
    super(message, 404);
  }
}

// Validation Error: 400 for invalid request data
export class ValidationError extends AppError {
  constructor(message = "Invalid Request Data!", details?: any) {
    super(message, 400, true, details);
  }
}

// Authentication Error: 401 Unauthorized access
export class AuthError extends AppError {
  constructor(message = "Unauthorized!") {
    super(message, 401);
  }
}

// Forbidden Error: 403 for insufficient permissions
export class ForbiddenError extends AppError {
  constructor(message = "Forbidden Access!") {
    super(message, 403);
  }
}

// Database Error: 500 for database-related issues
export class DatabaseError extends AppError {
  constructor(message = "Database Error!", details?: any) {
    super(message, 500, true, details);
  }
}

// Rate Limit Error: 429 for exceeding API rate limits
export class RateLimitError extends AppError {
  constructor(message = "Too Many Requests, Please Try Again Later!") {
    super(message, 429);
  }
}

// Conflict Error: 409 for duplicate or conflicting resources
export class ConflictError extends AppError {
  constructor(message = "Conflict! Resource already exists.", details?: any) {
    super(message, 409, true, details);
  }
}
