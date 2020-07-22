import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {BreweriesComponent} from "./breweries/breweries.component";
import {BeersComponent} from "./beers/beers.component";
import {BreweriesDetailsComponent} from "./breweries-details/breweries-details.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";


const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "breweries",
    component:BreweriesComponent,
    pathMatch: 'full'
  },
  {
    path: "beers",
    component:BeersComponent
  },
  {
    path: "breweries/brewery/:breweryId",
    component:BreweriesDetailsComponent,
  },
  {
    path: "**",
    component:PageNotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
