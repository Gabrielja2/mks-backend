export interface IAuthenticationAdapter {
  createJsonWebToken(payload: object, expiryTimeInSeconds: number): string;
}
