import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart/cart.component';
import { ProductComponent } from './product/product/product.component';
import { UserComponent } from './user/user.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CartModule } from './cart/cart.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';

const routes: Routes = [
  { path: 'cart', component: CartComponent },
  { path: 'product', component: ProductComponent },
  { path: 'user', component: UserComponent },
  { path: '', redirectTo: '/cart', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [
    CartModule,
    ProductModule,
    UserModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
