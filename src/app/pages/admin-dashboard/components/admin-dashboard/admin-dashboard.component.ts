import { Component, OnInit } from '@angular/core';
import { Collections } from '@enum/collections.enum';
import { Review, ReviewData } from '@model/review.model';
import { ApiService } from '@service/api.service';
import { DataService } from '@service/data.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  chosenItems?: string = 'Reviews';
  showingReviews: boolean = true;
  reviews: ReviewData[] = [];

  constructor(private api: ApiService, private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getAllData(Collections.REVIEWS).subscribe((data: any) => {
      this.reviews = data as ReviewData[];
    });
  }

  showItems(itemType: string) {
    this.chosenItems = itemType;
    if (this.chosenItems === 'Orders') {
      this.showingReviews = false;
    }
    this.showingReviews = true;
  }
}
