import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {BreweriesComponent} from "./pages/brewery/breweries/breweries.component";
import {BeersComponent} from "./pages/beer/beers/beers.component";
import {BreweriesDetailsComponent} from "./pages/brewery/breweries-details/breweries-details.component";
import {PageNotFoundComponent} from "./pages/page-not-found/page-not-found.component";


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
    path: "breweries/brewery/:breweryId",
    component:BreweriesDetailsComponent,
  },
  {
    path: "beers",
    component:BeersComponent
  },
  {
    path: "beers/beer/:beerId",
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
