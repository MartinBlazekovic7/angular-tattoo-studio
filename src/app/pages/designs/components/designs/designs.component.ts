import { Component, OnInit } from '@angular/core';
import { Design } from '@model/design.model';
import { Tag } from '@model/tag.model';
import { Type } from '@model/type.model';
import { ApiService } from '@service/api.service';
import * as qs from 'qs';

@Component({
  selector: 'app-designs',
  templateUrl: './designs.component.html',
  styleUrls: ['./designs.component.scss'],
})
export class DesignsComponent implements OnInit {
  panels = ['Type', 'Tags'];

  collapsed?: boolean = false;

  types: Type[] = [];
  tags: Tag[] = [];

  designs: Design[] = [];
  designsFiltered: Design[] = [];
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

  typeFilterLabel?: string = 'Type';
  selectedType?: Type | null;

  sortLabel?: string = 'Popularity (DESC)';

  selectedDesign?: Design;
  showSelectedDesign?: boolean = false;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getResources('types').subscribe((data) => {
      this.types = data.data as Type[];
    });
    this.api.getResources('tags').subscribe((data) => {
      this.tags = data.data as Tag[];
    });
    this.api.getResources('designs', this.queryArgs).subscribe((data) => {
      this.designs = data.data as Design[];
      this.applyFilters();
    });
  }

  applyFilters(): void {
    this.filterByType(null);
  }

  filterByType(type: Type | null): void {
    console.log(type);
    if (type) {
      this.selectedType = type;
      console.log(this.designs);
      this.designsFiltered = this.designs.filter(
        (item) => item.attributes?.type?.data?.id === type.id
      );
    } else {
      this.selectedType = null;
      this.designsFiltered = this.designs;
    }
    console.log(this.designsFiltered);
    this.typeFilterLabel = this.selectedType?.attributes?.name || 'Type';
  }
  sortDesigns(sortType: string): void {
    switch (sortType) {
      case 'price-asc':
        this.sortLabel = 'Price (ASC)';
        this.designsFiltered.sort(
          (a, b) => a?.attributes?.price! - b?.attributes?.price!
        );
        break;
      case 'price-desc':
        this.sortLabel = 'Price (DESC)';
        this.designsFiltered.sort(
          (a, b) => b?.attributes?.price! - a?.attributes?.price!
        );
        break;
      case 'alphabetical-asc':
        this.sortLabel = 'Alphabetical (ASC)';
        this.designsFiltered.sort((a, b) =>
          a?.attributes!.name!.localeCompare(b?.attributes!.name!)
        );
        break;
      case 'alphabetical-desc':
        this.sortLabel = 'Alphabetical (DESC)';
        this.designsFiltered.sort((a, b) =>
          b.attributes!.name!.localeCompare(a?.attributes!.name!)
        );
        break;
      case 'popularity-asc':
        this.sortLabel = 'Popularity (ASC)';
        this.designsFiltered.sort(
          (a, b) => a?.attributes?.popularity! - b?.attributes?.popularity!
        );
        break;
      case 'popularity-desc':
        this.sortLabel = 'Popularity (DESC)';
        this.designsFiltered.sort(
          (a, b) => b?.attributes?.popularity! - a?.attributes?.popularity!
        );
        break;
      default:
        console.error('Invalid sortType:', sortType);
    }
  }

  closeModal(): void {
    this.showSelectedDesign = false;
  }
}
