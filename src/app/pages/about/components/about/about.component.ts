import { Component, OnInit } from '@angular/core';
import { Artist } from '@model/artist.model';
import { ApiService } from 'src/app/services/api.service';
import * as qs from 'qs';
import { Review } from '@model/review.model';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  artists: Artist[] = [];
  reviews: Review[] = [];
  queryArgs = qs.stringify({
    populate: 'image',
  });
  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getResources('artists', this.queryArgs).subscribe((data) => {
      this.artists = data.data as Artist[];
    });
    this.api.getResources('reviews').subscribe((data) => {
      this.reviews = data.data as Review[];
    });
  }
}
