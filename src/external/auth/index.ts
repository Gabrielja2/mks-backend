import { JWT_SECRET } from '@/shared';
import { IAuthenticationAdapter } from '@/ports';
import jsonWebToken from 'jsonwebtoken';

export class AuthenticationAdapter implements IAuthenticationAdapter {
  private readonly secretKey: string = JWT_SECRET;
  private readonly jsonWebToken = jsonWebToken;

  createJsonWebToken(payload: object, expiryTimeInSeconds: number): string {
    return this.jsonWebToken.sign(payload, this.secretKey, {
      expiresIn: expiryTimeInSeconds,
    });
  }
}
