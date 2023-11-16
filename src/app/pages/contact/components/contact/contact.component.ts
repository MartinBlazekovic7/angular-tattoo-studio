import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Collections } from '@enum/collections.enum';
import { UserDetails } from '@model/user-details.model';
import { AuthService } from '@service/auth.service';
import { DataService } from '@service/data.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  currentUser?: User;
  currentUserDetails?: UserDetails;

  contactForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', Validators.required],
    message: ['', Validators.required],
  });

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private fb: NonNullableFormBuilder
  ) {}
  ngOnInit(): void {
    this.authService.authInterface!.onAuthStateChanged((user) => {
      if (user) {
        this.currentUser = user;
        this.dataService
          .getData(Collections.USERS, user.uid)
          .subscribe((data) => {
            this.currentUserDetails = data;
            this.contactForm.patchValue({ ...this.currentUserDetails });
          });
      }
    });
  }

  submitForm() {
    if (!this.contactForm.valid) {
      this.contactForm.markAllAsTouched();
      return;
    }
    console.log(this.contactForm.value);
  }
  handleFileInput($event: Event) {
    throw new Error('Method not implemented.');
  }

  get email() {
    return this.contactForm.get('email');
  }

  get firstName() {
    return this.contactForm.get('firstName');
  }

  get lastName() {
    return this.contactForm.get('lastName');
  }

  get phoneNumber() {
    return this.contactForm.get('phoneNumber');
  }

  get message() {
    return this.contactForm.get('message');
  }
}
