import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CheckoutCart } from '../../types';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart-total-modal',
  templateUrl: './cart-total-modal.component.html',
  styleUrls: ['./cart-total-modal.component.css'],
})
export class CartTotalModalComponent {
  constructor(
    public dialogRef: MatDialogRef<CartTotalModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CheckoutCart,
    private snackbar: MatSnackBar
  ) {}

  get totalItemCount() {
    return this.data.items.reduce((acc, i) => i.quantity + acc, 0);
  }

  printInvoiceClick() {
    this.dialogRef.close();
    this.snackbar.open('Printing invoice...', undefined, { duration: 1000 });
  }
}
