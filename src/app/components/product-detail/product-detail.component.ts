import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IProductList} from '../../models/product';
import {PassProductService} from '../../services/pass-product.service';
import {F} from '../../models/fedex';
import {U} from '../../models/ups';
import {MatDialog} from '@angular/material';
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
  private date: Date;
  private formattedDate: string = '';

  constructor(private fb: FormBuilder,
              private passProductService: PassProductService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.initForm();
    this.passProductService.getProduct().subscribe(product => {
      this.selectedProduct = product;
      switch (this.selectedProduct.type) {
        case 1:
          this.fedex = this.selectedProduct.fedex;
          this.thumbnail = this.fedex.thumbnailUrl;
          this.productForm.get('name').patchValue(this.fedex.name);
          this.productForm.get('description').patchValue(this.fedex.description);
          this.productForm.get('price').patchValue(this.fedex.price);
          this.convertToDateString(this.fedex.creationDate);
          this.productForm.get('creation_date').patchValue(this.formattedDate);
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
          this.thumbnail = this.selectedProduct.thumbnailUrl;
          this.productForm.get('name').patchValue(this.selectedProduct.name);
          this.productForm.get('description').patchValue(this.selectedProduct.description);
          this.productForm.get('price').patchValue(this.selectedProduct.price);
          this.productForm.get('creation_date').patchValue(this.formattedDate);
          this.productForm.get('delivery_comp').patchValue(this.selectedProduct.deliveryComp);
          break;

      }
    });
  }

  initForm() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.min(1)]],
      delivery_comp: [''],
      creation_date: [''],
    });


  }


  onSaveProduct(form) {
    console.log(form);
    this.dialog.open(SaveComponent, {
      width: '450px',
      data: {product: form}
    });


  }


   convertToDateString(timestamp: number) {
    this.date = new Date(timestamp);
    const year = this.date.getFullYear();
    const month = ('0' + (this.date.getMonth())).substr(-2);
    const day = ('0' + this.date.getDate()).substr(-2);
    this.formattedDate = day + '/' + month + '/' + year;
  }
}
