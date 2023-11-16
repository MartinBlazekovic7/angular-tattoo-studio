import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn } from '@angular/router';
import { Collections } from '@enum/collections.enum';
import { UserDetails } from '@model/user-details.model';
import { AuthService } from '@service/auth.service';
import { DataService } from '@service/data.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MaintenanceRedirectGuard {
  currentUser?: UserDetails;
  constructor(
    private authService: AuthService,
    private dataService: DataService
  ) {}
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return new Observable((observer) => {
      this.authService.authInterface!.onAuthStateChanged((user) => {
        if (user) {
          this.dataService
            .getData(Collections.USERS, user.uid)
            .subscribe((data) => {
              this.currentUser = data;
              if (this.currentUser?.isAdmin) {
                observer.next(true);
              } else {
                observer.next(false);
              }
            });
        }
      });
    });
    /*     if (this.authService.isUserAdmin()) {
      console.log('User is admin');
      //window.location.href = '/forbidden';
      return true;
    }
    console.log('User is not admin');
    return false;*/
  }
}

export const adminGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  return inject(MaintenanceRedirectGuard).canActivate(route);
};
