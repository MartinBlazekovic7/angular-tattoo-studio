import { Component } from '@angular/core';
import { User } from '@angular/fire/auth';
import { NonNullableFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Collections } from '@enum/collections.enum';
import { UserDetails } from '@model/user-details.model';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from '@service/auth.service';
import { DataService } from '@service/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  panels = ['First', 'Second', 'Third'];
  panels2 = ['Fourth', 'Fifth', 'Sixth'];

  currentUser?: User;
  currentUserDetails?: UserDetails;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: NonNullableFormBuilder,
    private toast: HotToastService,
    private dataService: DataService
  ) {}

  editingProfile = false;

  profileForm = this.fb.group({
    uid: [''],
    displayName: [''],
    firstName: [''],
    lastName: [''],
    email: [''],
    phoneNumber: [''],
  });

  ngOnInit() {
    this.authService.authInterface!.onAuthStateChanged((user) => {
      if (user) {
        this.currentUser = user;
        this.dataService
          .getData(Collections.USERS, user.uid)
          .subscribe((data) => {
            this.currentUserDetails = data;
            this.profileForm.patchValue({ ...this.currentUserDetails });
          });
      }
    });
  }

  saveProfile() {
    const { uid, ...data } = this.profileForm.value;

    if (!uid) {
      return;
    }

    this.dataService
      .updateUser({ uid, ...data })
      .pipe(
        this.toast.observe({
          loading: 'Updating profile...',
          success: 'Profile updated successfully!',
          error: 'Profile update failed. Please try again.',
        })
      )
      .subscribe(() => {
        this.editingProfile = false;
      });
  }

  startProfileEdit() {
    this.editingProfile = true;
  }

  cancelProfileEdit() {
    this.editingProfile = false;
  }
}
