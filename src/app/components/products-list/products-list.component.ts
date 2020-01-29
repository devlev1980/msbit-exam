import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../../services/products.service';
import {IProduct, IProductList} from '../../models/product';
import {PassProductService} from '../../services/pass-product.service';
import {MatDialog} from '@angular/material';
import {YesNoComponent} from '../../dialogs/yes-no/yes-no.component';
import {SharingService} from '../../services/sharing.service';
import {AddProductComponent} from '../../dialogs/add-product/add-product.component';
import {F} from '../../models/fedex';
import {U} from '../../models/ups';


@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
  providers: [PassProductService]
})
export class ProductsListComponent implements OnInit {
  options: IOption[] = [];
  products: IProductList<F, U>[] = [];
  selectedProduct: IProductList<F, U>;
  searchText: string = '';
  private updatedProduct: IProduct;
  private index: number;
  counter: number = 0;
  start = 5 + this.counter;
  p: number = 1;

  constructor(private productsService: ProductsService,
              private passProductService: PassProductService,
              public dialog: MatDialog,
              private shareService: SharingService) {
  }

  ngOnInit() {
    this.options = [
      {
        id: 0,
        value: 'Name'
      },
      {
        id: 1,
        value: 'Type'
      }
    ];
    setTimeout(() => {
      for (this.counter; this.counter < this.start; this.counter++) {
      }
      this.productsService.getProducts().subscribe((data) => {
        this.products = data;
      });
    }, 2000);

    this.shareService.getProduct().subscribe(updatedProduct => {
      this.updatedProduct = updatedProduct;
    });

  }

  onSelectProduct(product: IProductList<F, U>) {
    this.selectedProduct = product;
    this.index = this.products.findIndex((x) => x === product);
    if (product.type === 2 && product.ups.length > 1) {
      return;
    } else {
      this.passProductService.sendProduct(product);
    }
  }

  onSelectUps(ups: any) {
    this.index = this.products.findIndex((x) => x.ups === ups);
  }

  onSortBy(option: IOption) {
    switch (option.id) {
      case 0:
        // Here i got an error : localCompare is undefined :(
        this.products = this.products.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 1:
        this.products = this.products.sort((a, b) => a.type - b.type);
        break;
    }

  }

  onDeleteProduct(productIndex: number) {
    const deleteDialogRef = this.dialog.open(YesNoComponent, {
      width: '400px'
    });
    deleteDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.products.splice(productIndex, 1);
      }
    });

  }

  onAddProduct() {
    const addDialogref = this.dialog.open(AddProductComponent, {
      width: '600px'
    });
    addDialogref.afterClosed().subscribe((form: IProduct) => {
      if (form) {
        this.convertDateToTimeStamp(form);
      }
    });
  }

  convertDateToTimeStamp(form: IProduct) {
    const timestamp = Date.parse(form.creationDate.toLocaleDateString().slice(0, 10));
  }


  onChangePage(event: number) {
    this.p = event;
  }


}

interface IOption {
  id: number;
  value: string;
}


