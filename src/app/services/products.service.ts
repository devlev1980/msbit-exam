import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IProduct, IProductList} from '../models/product';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _http: HttpClient) {
  }

  getProducts(): Observable<IProductList<any, any>[]> {
    return this._http.get<IProductList<any, any>[]>(environment.apiUrl);
  }
}
