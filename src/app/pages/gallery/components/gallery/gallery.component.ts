import { Component, OnInit } from '@angular/core';
import { GalleryItem } from '@model/gallery-item.model';
import { ApiService } from '@service/api.service';
import * as qs from 'qs';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  galleryItems: GalleryItem[] = [];

  queryArgs = qs.stringify({
    populate: [
      'tattooImage',
      'customer',
      'tattooDescription',
      'tattooTitle',
      'artist',
    ],
  });

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getResources('galleries', this.queryArgs).subscribe((data) => {
      this.galleryItems = data.data as GalleryItem[];
      console.log(this.galleryItems);
    });
  }
}
