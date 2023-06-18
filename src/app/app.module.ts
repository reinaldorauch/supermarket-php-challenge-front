import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotFoundComponent } from './not-found/not-found.component';
import { NavComponent } from './nav/nav.component';
import { TokenService } from './token.service';
import { LoginService } from './login.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';

@NgModule({
  declarations: [AppComponent, NotFoundComponent, NavComponent],
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatButtonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [
    TokenService,
    LoginService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
