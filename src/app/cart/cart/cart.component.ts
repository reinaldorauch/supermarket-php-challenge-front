import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductsService } from '../../product/products.service';
import { map, switchMap } from 'rxjs';
import { AddItemData, CheckoutCart } from '../../types';
import { MatDialog } from '@angular/material/dialog';
import { CartTotalModalComponent } from '../cart-total-modal/cart-total-modal.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  $cart = this.svc.currentCart;
  currentCartItems$ = this.$cart.pipe(map((cart) => cart?.items ?? []));

  displayedColumns = [
    'name',
    'quantity',
    'type',
    'price',
    'priceTax',
    'itemTotal',
    'itemTotalTax',
  ];
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
    private productsService: ProductsService,
    private dialog: MatDialog
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

  openModal() {
    const cart = this.svc.getCurrentCart();
    cart && this.openFinalizeModal(cart);
  }

  openFinalizeModal(data: CheckoutCart) {
    this.dialog.open(CartTotalModalComponent, {
      data,
      width: '500px',
    });
  }

  async onFinalizeClick() {
    const cart = this.svc.getCurrentCart();
    try {
      if (!cart) throw new Error('Cart not active');
      await this.svc.finalize(cart.id);
      this.openFinalizeModal(cart);
    } catch (err: any) {
      this.snackbar.open(
        err?.error?.error?.description || 'Error when finalizing cart',
        undefined,
        { duration: 500 }
      );
    }
  }
}
