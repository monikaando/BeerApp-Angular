import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BreweriesComponent } from './breweries/breweries.component';
import { BeersComponent } from './beers/beers.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BreweriesComponent,
    BeersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
