import { filter } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Artist } from '@model/artist.model';
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
  galleryItemsFiltered: GalleryItem[] = [];

  queryArgs = qs.stringify({
    populate: [
      'tattooImage',
      'customer',
      'tattooDescription',
      'tattooTitle',
      'artist',
    ],
  });

  selectedArtist: Artist | null = null;
  artists: Artist[] = [];
  artistsFiltered: Artist[] = [];

  artistFilterLabel = 'Artist';

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getResources('galleries', this.queryArgs).subscribe((data) => {
      this.galleryItems = data.data as GalleryItem[];
    });
    this.api.getResources('artists', this.queryArgs).subscribe((data) => {
      this.artists = data.data as Artist[];
      this.filterByArtist(null);
    });
  }

  filterByArtist(artist: Artist | null): void {
    if (artist) {
      this.selectedArtist = artist;
      this.galleryItemsFiltered = this.galleryItems.filter(
        (item) =>
          item.attributes?.artist?.data?.attributes?.name ===
          artist.attributes?.name
      );
      this.artistsFiltered = this.artists.filter(
        (artist) => artist.id !== this.selectedArtist?.id
      );
    } else {
      this.selectedArtist = null;
      this.galleryItemsFiltered = this.galleryItems;
      this.artistsFiltered = this.artists;
    }
    this.artistFilterLabel = this.selectedArtist?.attributes?.name || 'Artist';
  }
}
