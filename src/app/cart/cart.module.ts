import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { CartService } from './cart.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [CartComponent],
  imports: [CommonModule, HttpClientModule],
  exports: [CartComponent],
  providers: [CartService],
})
export class CartModule {}
