import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
  imports: [BrowserModule],
})
export class AppModule {}
