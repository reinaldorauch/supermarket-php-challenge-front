import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductsService } from '../../product/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  $cart = this.svc.currentCart;
  $loading = this.svc.isLoading;
  $products = this.productsService.products;

  addItemForm = this.formBuilder.group({
    productId: [null, Validators.required],
    quantity: [1, Validators.required],
  });

  constructor(
    private svc: CartService,
    private snackbar: MatSnackBar,
    private formBuilder: FormBuilder,
    private productsService: ProductsService
  ) {}

  async ngOnInit() {
    await Promise.all([this.svc.init(), this.productsService.init()]);
  }

  onCreateCartClick() {
    try {
      this.svc.create();
    } catch (err: any) {
      const msg = err?.error?.error?.description || 'Error when creating cart';
      this.snackbar.open(msg, undefined, { duration: 300 });
    }
  }

  onAddItemSubmit() {}
}
