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

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getResources('designs', this.queryArgs).subscribe((data) => {
      this.designs = data.data as Design[];
    });
    this.api.getResources('types').subscribe((data) => {
      this.types = data.data as Type[];
    });
    this.api.getResources('tags').subscribe((data) => {
      this.tags = data.data as Tag[];
    });
  }
}
