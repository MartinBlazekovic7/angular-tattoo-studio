export class Review {
  id?: number;
  attributes?: ReviewAttributes;
}

class ReviewAttributes {
  reviewText?: string;
  reviewer?: string;
  rating?: number;
}

export class ReviewData {
  uid?: string;
  reviewText?: string;
  reviewer?: string;
  rating?: number;
  userId?: string;
}
