import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {IProductList} from '../models/product';
import {F} from '../models/fedex';
import {U} from '../models/ups';

@Injectable({
  providedIn: 'root'
})
export class PassProductService {
  private subject = new Subject<IProductList<F, U>>();

  sendProduct(product: any) {
    this.subject.next(product);
  }

  clearData() {
    this.subject.next();
  }

  getProduct(): Observable<IProductList<F, U>> {
    return this.subject.asObservable();
  }
}




