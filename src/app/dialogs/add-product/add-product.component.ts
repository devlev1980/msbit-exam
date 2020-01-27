import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  addProductForm: FormGroup;
  generatedId: number;

  constructor(private fb: FormBuilder) {
    this.generatedId = Math.floor(Math.random() * 100 + 1);
  }

  ngOnInit() {
    this.addProductForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      deliveryComp: [''],
      creationDate: [''],
      type: [null],
      thumbnailUrl: [''],
      id: [this.generatedId]
    });


    // this.productForm.addControl('deliveryComp', this.fb.control(this.selectedProduct.deliveryComp));
    // this.productForm.addControl('creationDate', this.fb.control(this.selectedProduct.creationDate));
    // this.productForm.addControl('type', this.fb.control(this.selectedProduct.type));
    // this.productForm.addControl('thumbnailUrl', this.fb.control(this.selectedProduct.thumbnailUrl));
    // this.productForm.addControl('url', this.fb.control(this.selectedProduct.url));
    // this.productForm.addControl('id', this.fb.control(this.selectedProduct.id));

  }

}
