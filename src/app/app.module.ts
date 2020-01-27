import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ProductsListComponent} from './components/products-list/products-list.component';
import {MaterialModule} from './shared/material.module';
import {ProductsService} from './services/products.service';
import {HttpClientModule} from '@angular/common/http';
import {ProductDetailComponent} from './components/product-detail/product-detail.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PassProductService} from './services/pass-product.service';
import {SearchPipe} from './pipes/search.pipe';
import {YesNoComponent} from './dialogs/yes-no/yes-no.component';
import {AddProductComponent} from './dialogs/add-product/add-product.component';
import {SaveComponent} from './dialogs/save/save.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsListComponent,
    ProductDetailComponent,
    SearchPipe,
    YesNoComponent,
    AddProductComponent,
    SaveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [YesNoComponent, AddProductComponent, SaveComponent],
  providers: [ProductsService, PassProductService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
