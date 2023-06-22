import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductsService } from '../../product/products.service';
import { map, switchMap } from 'rxjs';
import { AddItemData, CheckoutCart } from '../../types';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  $cart = this.svc.currentCart;
  currentCartItems$ = this.$cart.pipe(map((cart) => cart?.items ?? []));

  displayedColumns = ['name', 'quantity', 'type', 'price'];
  $loading = this.svc.isLoading;
  products$ = this.productsService.products;

  addItemForm = this.formBuilder.group({
    productId: [0, Validators.required],
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
      this.snackbar.open(
        err?.error?.error?.description || 'Error when creating cart',
        undefined,
        { duration: 500 }
      );
    }
  }

  onAddItemSubmit() {
    if (!this.addItemForm.valid) {
      this.snackbar.open('Add item data invalid', undefined, { duration: 500 });
      return;
    }

    try {
      const cartId = this.svc.getCurrentCartId();
      if (!cartId) {
        throw new Error('Cart not active');
      }
      this.svc.addItem({ ...(this.addItemForm.value as AddItemData), cartId });
    } catch (err: any) {
      this.snackbar.open(
        err?.error?.error?.description || 'Error when adding item to the cart',
        undefined,
        { duration: 500 }
      );
    }
  }
}
