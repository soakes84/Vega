import { JwtHelper } from 'angular2-jwt';
import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';

import Auth0Lock from 'auth0-lock';

@Injectable()
export class Auth {
  profile: any;
  private roles: string[] = [];

  lock = new Auth0Lock('RfRu3un13aOO73C7X2mH41qxfHRbUc33', 'vegaproject.auth0.com', {});

  constructor()
  {
    this.profile = JSON.parse(localStorage.getItem('profile'));

    var token = localStorage.getItem('token');
    if (token)
    {
      var jwtHelper = new JwtHelper();
      var decodedToken = jwtHelper.decodeToken(token);
      this.roles = decodedToken['https://vega.com/roles'];
    }

    this.lock.on("authenticated", (authResult) => {
      localStorage.setItem('token', authResult.accessToken);

      var jwtHelper = new JwtHelper();
      var decodedToken = jwtHelper.decodeToken(authResult.accessToken);
      this.roles = decodedToken['https://vega.com/roles'];

      this.lock.getUserInfo(authResult.accessToken, (error, profile) => {
        if (error)
          throw error;

        console.log(profile);
        localStorage.setItem('profile', JSON.stringify(profile));
        this.profile = profile;
      });
    });
  }

  public isInRole(roleName: string) 
  {
    return this.roles.indexOf(roleName) > -1;
  }

  public login() {
    this.lock.show();
  }

  public authenticated() {
    return tokenNotExpired('token');
  }

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('profile');
    this.profile = null;
    this.roles = [];
  }
}