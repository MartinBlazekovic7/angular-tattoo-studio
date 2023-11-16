import { Component, OnInit } from '@angular/core';
import { Collections } from '@enum/collections.enum';
import { ContactFormData } from '@model/contact.model';
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
  orders: ContactFormData[] = [];

  constructor(private api: ApiService, private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getAllData(Collections.REVIEWS).subscribe((data: any) => {
      this.reviews = data as ReviewData[];
    });
    this.dataService.getAllData(Collections.ORDERS).subscribe((data: any) => {
      this.orders = data as ContactFormData[];
      this.orders.sort((a, b) => (a?.createdAt ? -b?.createdAt! : 0));
    });
  }

  showItems(itemType: string) {
    this.showingReviews = !this.showingReviews;
    this.chosenItems = itemType;
    if (itemType === 'Orders') {
      this.chosenItems = 'Orders';
    }
  }

  markCompleted(order: ContactFormData) {
    order.completed = true;
    this.orders.forEach((o) => {
      if (o.uid === order.uid) {
        o.completed = true;
      }
    });
    this.dataService.updateOrder({ ...order }).subscribe();
  }
}
