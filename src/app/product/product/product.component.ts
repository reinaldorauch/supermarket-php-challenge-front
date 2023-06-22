import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product, ProductType } from '../../types';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  productsDataSource$ = this.svc.products;
  typesDataSource$ = this.svc.types;
  types$ = this.svc.types;
  displayedProductColumns = ['name', 'type', 'price'];
  displayedTypeColumns = ['name', 'taxRate'];

  productForm = this.formBuilder.group({
    name: ['', Validators.required],
    price: [0, Validators.required],
    type: [0, Validators.required],
  });

  productTypeForm = this.formBuilder.group({
    name: ['', Validators.required],
    taxRate: [0, Validators.required],
  });

  constructor(
    private svc: ProductsService,
    private formBuilder: FormBuilder,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.svc.init();
  }

  async onProductSubmit() {
    if (!this.productForm.valid) {
      this.snackbar.open('Product data is invalid', undefined, {
        duration: 500,
      });
      return;
    }

    try {
      await this.svc.create(this.productForm.value as Product);
    } catch (err: any) {
      this.snackbar.open(
        err?.error?.error?.description || 'Error when creating product'
      );
    }
  }

  async onProductTypeSubmit() {
    if (!this.productTypeForm.valid) {
      this.snackbar.open('Product Type data is invalid', undefined, {
        duration: 500,
      });
      return;
    }

    try {
      await this.svc.createType(this.productTypeForm.value as ProductType);
    } catch (err: any) {
      this.snackbar.open(
        err?.error?.error?.description || 'Error when creating product type'
      );
    }
  }
}
