export class AuthenticationError extends Error {
  statusCode: number;

  constructor(message = 'Authentication Failed') {
    super(message);
    this.name = 'AuthenticationError';
    this.statusCode = 403; 
  }
}

export class AuthorizationError extends Error {
  statusCode: number;

  constructor(message = 'Authorization Failed') {
    super(message);
    this.name = 'AuthorizationError';
    this.statusCode = 403; 
  }
}
