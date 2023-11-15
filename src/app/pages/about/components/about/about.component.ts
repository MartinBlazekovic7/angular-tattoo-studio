import { Component, OnInit } from '@angular/core';
import { Artist } from '@model/artist.model';
import { ApiService } from 'src/app/services/api.service';
import * as qs from 'qs';
import { Review, ReviewData } from '@model/review.model';
import { NonNullableFormBuilder } from '@angular/forms';
import { AuthService } from '@service/auth.service';
import { DataService } from '@service/data.service';
import { User } from '@angular/fire/auth';
import { UserDetails } from '@model/user-details.model';
import { Collections } from '@enum/collections.enum';
import { HotToastService } from '@ngneat/hot-toast';
import { FirebaseHelper } from 'src/app/helpers/firebase.helper';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  currentUser?: User;
  currentUserDetails?: UserDetails;

  artists: Artist[] = [];
  reviews: Review[] = [];
  queryArgs = qs.stringify({
    populate: 'image',
  });

  reviewForm = this.fb.group({
    rating: [''],
    reviewer: [''],
    reviewText: [''],
  });

  constructor(
    private api: ApiService,
    private authService: AuthService,
    private dataService: DataService,
    private fb: NonNullableFormBuilder,
    private toast: HotToastService
  ) {}

  ngOnInit(): void {
    this.api.getResources('artists', this.queryArgs).subscribe((data) => {
      this.artists = data.data as Artist[];
    });
    this.api.getResources('reviews').subscribe((data) => {
      this.reviews = data.data as Review[];
    });
    this.authService.authInterface!.onAuthStateChanged((user) => {
      if (user) {
        this.currentUser = user;
        this.dataService
          .getData(Collections.USERS, user.uid)
          .subscribe((data) => {
            this.currentUserDetails = data;
            this.reviewForm.setValue({
              reviewer: this.currentUserDetails?.displayName ?? '',
              rating: '',
              reviewText: '',
            });
          });
      }
    });
  }

  onSubmitReview(): void {
    const { rating, reviewer, reviewText } = this.reviewForm.value;

    if (!this.reviewForm.valid || !rating || !reviewer || !reviewText) {
      return;
    }

    const reviewData: ReviewData = {
      uid: FirebaseHelper.generateReviewId(),
      rating: parseInt(rating),
      reviewer,
      reviewText,
    };
    if (this.currentUser) {
      reviewData.userId = this.currentUser.uid;
    }

    this.dataService
      .addData(Collections.REVIEWS, reviewData)
      .pipe(
        this.toast.observe({
          success: 'Review submitted successfully!',
          loading: 'Submitting review...',
          error: 'There was an error submitting your review. Please try again.',
        })
      )
      .subscribe(() => {
        this.reviewForm.reset();
      });
  }
}
