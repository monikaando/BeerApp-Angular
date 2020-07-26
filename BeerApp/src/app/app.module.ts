import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { BreweriesComponent } from './pages/brewery/breweries/breweries.component';
import { BeersComponent } from './pages/beer/beers/beers.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { BreweryDetailsComponent } from './pages/brewery/brewery-details/brewery-details.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { BeerDetailsComponent } from './pages/beer/beer-details/beer-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BreweriesComponent,
    BeersComponent,
    BreweryDetailsComponent,
    PageNotFoundComponent,
    BeerDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
