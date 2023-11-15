import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Collections } from '@enum/collections.enum';
import { UserDetails } from '@model/user-details.model';
import { HotToastService } from '@ngneat/hot-toast';
import { ApiService } from '@service/api.service';
import { AuthService } from '@service/auth.service';
import { DataService } from '@service/data.service';
import { switchMap } from 'rxjs';
import { FirebaseErrorHelper } from 'src/app/helpers/firebase-error.helper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  currentUser?: User;
  currentUserDetails?: UserDetails;

  showingLogin = true;

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    displayName: ['', [Validators.required]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  });

  constructor(
    private fb: NonNullableFormBuilder,
    private authService: AuthService,
    private dataService: DataService,
    private toast: HotToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.authInterface!.onAuthStateChanged((user) => {
      if (user) {
        this.currentUser = user;
        this.dataService
          .getData(Collections.USERS, user.uid)
          .subscribe((data) => {
            this.currentUserDetails = data;
          });
      }
    });
  }

  onSubmitLogin() {
    const { email, password } = this.loginForm.value;

    if (!this.loginForm.valid || !email || !password) {
      return;
    }

    this.authService
      .login(email, password)
      .pipe(
        this.toast.observe({
          success: 'Login successful!',
          loading: 'Logging in...',
          error: ({ message }) => FirebaseErrorHelper.getErrorMessage(message),
        })
      )
      .subscribe(() => {
        this.router.navigate(['/profile']);
      });
  }

  onSubmitRegister() {
    const { displayName, email, password } = this.registerForm.value;

    if (!this.registerForm.valid || !displayName || !password || !email) {
      return;
    }

    this.authService
      .register(email, password)
      .pipe(
        switchMap(({ user: { uid } }) =>
          this.dataService.addData(Collections.USERS, {
            uid,
            email,
            displayName: displayName,
          })
        ),
        this.toast.observe({
          success: 'Registration successful!',
          loading: 'Registering...',
          error: ({ message }) => FirebaseErrorHelper.getErrorMessage(message),
        })
      )
      .subscribe(() => {
        this.router.navigate(['/profile']);
      });
  }

  logout() {
    this.authService.logout().subscribe(() => {
      window.location.reload();
    });
  }

  get emailLogin() {
    return this.loginForm.get('email');
  }

  get passwordLogin() {
    return this.loginForm.get('password');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get displayName() {
    return this.registerForm.get('displayName');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }
}
