import { Injectable } from '@angular/core';
import { Auth } from './auth.service';
import { CanActivate } from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate 
{
    constructor(private auth: Auth) {}

    canActivate()
    {
        if (this.auth.authenticated())
            return true;

        this.auth.login();
        return false;
    }
}