/* eslint-disable prettier/prettier */
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        // Add your authentication and authorization logic here
        const request = context.switchToHttp().getRequest();
        const accessToken = request.headers.authorization;

        console.log(accessToken);

        if (!accessToken) {
            return false;
        }
        // Perform necessary checks on the access token and validate user authorization

        return true; // Return true if authorized, or false if not authorized
    }
}