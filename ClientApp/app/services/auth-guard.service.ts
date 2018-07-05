import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Auth } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate 
{
    constructor(protected auth: Auth) {}

    canActivate()
    {
        if (this.auth.authenticated())
            return true;

        window.location.href = 'https://vegaproject.auth0.com/login?client=RfRu3un13a0073C7X2mH41qxfHRbUc33';
        return false;
    }
}