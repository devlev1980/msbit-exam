import {Pipe, PipeTransform} from '@angular/core';
import {IProductList} from '../models/product';
import {F} from '../models/fedex';
import {U} from '../models/ups';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: IProductList<F, U>[], args?: any): any {

    if (!value) {
      return null;
    }
    if (!args) {
      return value;
    }

    args = args.toLowerCase();

    return value.filter((item) => {
      return JSON.stringify(item).toLowerCase().includes(args);
    });
  }
}


