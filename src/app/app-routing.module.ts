import { NgModule, inject } from '@angular/core';
import { ResolveFn, RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart/cart.component';
import { ProductComponent } from './product/product/product.component';
import { UserComponent } from './user/user.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CartModule } from './cart/cart.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { authGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [authGuard],
  },
  {
    path: 'product',
    component: ProductComponent,
    canActivate: [authGuard],
  },
  {
    path: 'users',
    component: UserComponent,
    canActivate: [authGuard],
  },
  {
    path: '',
    redirectTo: '/cart',
    pathMatch: 'full',
  },
  { path: 'login', component: LoginComponent },
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
