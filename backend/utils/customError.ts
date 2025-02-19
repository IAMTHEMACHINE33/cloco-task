export class AuthenticationError extends Error {
  statusCode: number;

  constructor(message = 'Authentication Failed') {
    super(message);
    this.name = 'AuthenticationError';
    this.statusCode = 401; 
  }
}
