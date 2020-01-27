import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IProduct, IProductList} from '../../models/product';
import {PassProductService} from '../../services/pass-product.service';
import {SharingService} from '../../services/sharing.service';
import {F} from '../../models/fedex';
import {U} from '../../models/ups';
import {MatDialog} from '@angular/material';
import {AddProductComponent} from '../../dialogs/add-product/add-product.component';
import {SaveComponent} from '../../dialogs/save/save.component';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  selectedProduct: IProductList<F, U>;
  fedex: any;
  name: string = '';
  description: string = '';
  price: number = null;
  thumbnail: string = '';
  productForm: FormGroup;
  isSelected: boolean = false;

  constructor(private fb: FormBuilder,
              private passProductService: PassProductService,
              private shareService: SharingService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.initForm();
    this.passProductService.getProduct().subscribe(product => {
      this.selectedProduct = product;
      switch (this.selectedProduct.type) {
        case 1:
          this.fedex = this.selectedProduct.fedex;
          this.name = this.fedex.name;
          this.thumbnail = this.fedex.thumbnailUrl;
          this.description = this.fedex.description;
          this.price = this.fedex.price;
          break;
        case 2:
          // this.selectedProduct.ups.forEach((el) => {
          //   this.name = el.name;
          //   this.thumbnail = el.thumbnailUrl;
          //   this.description = el.description;
          //   this.price = el.price;
          // });
          break;
        case 3:
          this.name = this.selectedProduct.name;
          this.thumbnail = this.selectedProduct.thumbnailUrl;
          this.description = this.selectedProduct.description;
          this.price = this.selectedProduct.price;
          break;

      }
    });
  }

  initForm() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
    });
  }


  onSaveProduct(form) {
    this.dialog.open(SaveComponent, {
      width: '450px',
      data: {product: form }
    });


  }


}
