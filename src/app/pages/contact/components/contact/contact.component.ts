import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Collections } from '@enum/collections.enum';
import { ContactFormData } from '@model/contact.model';
import { Design } from '@model/design.model';
import { UserDetails } from '@model/user-details.model';
import { HotToastService } from '@ngneat/hot-toast';
import { ApiService } from '@service/api.service';
import { AuthService } from '@service/auth.service';
import { DataService } from '@service/data.service';
import { FileUploadService } from '@service/file-upload.service';
import * as qs from 'qs';
import { switchMap } from 'rxjs';
import { FirebaseHelper } from 'src/app/helpers/firebase.helper';

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

  designs: Design[] = [];
  queryArgs = qs.stringify({
    populate: [
      'slug',
      'price',
      'image',
      'type',
      'tags',
      'artists',
      'popularity',
    ],
  });

  selectedDesigns: Design[] = [];

  file: any;
  filePath: string = '';

  showingOrderModal: boolean = false;
  orderModalTitle: string = '';
  orderModalDesc: string = '';

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private fb: NonNullableFormBuilder,
    private api: ApiService,
    private fileUploadService: FileUploadService,
    private toast: HotToastService
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
    this.api.getResources('designs', this.queryArgs).subscribe((data) => {
      this.designs = data.data as Design[];
    });
  }

  submitForm() {
    if (!this.contactForm.valid) {
      this.contactForm.markAllAsTouched();
      return;
    }
    const contactFormData: ContactFormData = this.contactForm.value;
    contactFormData.selectedDesigns = this.selectedDesigns;
    contactFormData.uid = FirebaseHelper.generateReviewId();
    if (this.currentUser) {
      contactFormData.userId = this.currentUser.uid;
    }
    this.dataService.addData(Collections.ORDERS, contactFormData).subscribe({
      next: () => {
        this.contactForm.reset();
        this.showingOrderModal = true;
        this.selectedDesigns = [];
        this.orderModalTitle = 'Thank you';
        this.orderModalDesc =
          'Your message has been received. We will contact you through email or phone as soon as possible.';
      },
      error: () => {
        this.contactForm.reset();
        this.selectedDesigns = [];
        this.showingOrderModal = true;
        this.orderModalTitle = 'Error';
        this.orderModalDesc =
          'There was an error submitting your message. Please try again later.';
      },
    });
    if (this.file) {
      const uid = contactFormData.uid;
      this.filePath = `images/${contactFormData.uid}/${this.file.name}`;
      this.fileUploadService
        .uploadFile(this.file, this.filePath)
        .pipe(
          this.toast.observe({
            loading: 'Uploading file...',
            success: 'File uploaded successfully',
            error: 'There was an error in uploading the file',
          }),
          switchMap((filePath) =>
            this.dataService.updateOrder({
              uid,
              filePath,
            })
          )
        )
        .subscribe();
    }
  }

  handleFileInput(event: any) {
    this.file = event?.target?.files[0];
  }

  selectDesign(design: Design) {
    this.selectedDesigns.push(design);
  }
  removeDesign(design: Design) {
    this.selectedDesigns = this.selectedDesigns.filter(
      (d) => d.id !== design.id
    );
  }

  closeModal(): void {
    this.showingOrderModal = false;
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
