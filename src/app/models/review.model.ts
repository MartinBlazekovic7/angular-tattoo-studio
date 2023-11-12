export class Review {
  id?: number;
  attributes?: ReviewAttributes;
}

class ReviewAttributes {
  reviewText?: string;
  reviewer?: string;
  rating?: number;
}
