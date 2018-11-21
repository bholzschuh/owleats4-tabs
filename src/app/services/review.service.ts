import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Review } from '../models/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  reviewsCollection: AngularFirestoreCollection<Review>;

  constructor(
    private db: AngularFirestore,
  ) { }

  getReviews(rid) {
    this.reviewsCollection = this.db.collection('restaurants/' + rid + "/reviews");
    return this.reviewsCollection.valueChanges();
  }

  addReview(rid, review: Review) {
    console.log(rid + review.uid + review.comment + review.rating);
    this.db.collection("restaurants/" + rid + "/reviews").add(review);
  }
}
