import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginGuard implements CanActivate {
  @Inject(JwtService)
  private readonly jwtService: JwtService;
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization ?? '';

    const Bearer = authorization.split(' ')[0];

    if (!Bearer) {
      throw new Error('Authorization header is missing');
    }

    const token = authorization.split(' ')[1];

    // Verify the token
    try {
      const decoded = this.jwtService.verify(token);
      (request as any).user = decoded; // Attach user info to the request
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token, please login again');
    }
  }
}
