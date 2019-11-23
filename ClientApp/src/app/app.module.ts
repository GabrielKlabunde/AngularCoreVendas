import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
@NgModule({
  declarations: [
    AppComponent,
    ProdutosComponent,
    PedidosComponent
  ],
    imports: [
    BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
