import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProductsComponent } from './products/products.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, ProductsComponent],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
  imports: [BrowserModule],
})
export class AppModule {}
