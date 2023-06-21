import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  $cart = this.svc.currentCart;
  $loading = this.svc.isLoading;

  constructor(private svc: CartService, private snackbar: MatSnackBar) {}

  ngOnInit() {
    this.svc.init();
  }

  onCreateCartClick() {
    try {
      this.svc.create();
    } catch (err: any) {
      const msg = err?.error?.error?.description || 'Error when creating cart';
      this.snackbar.open(msg, undefined, { duration: 300 });
    }
  }
}
