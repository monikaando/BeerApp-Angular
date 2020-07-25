import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
// import {HttpClient} from "@angular/common/http";
import {ApiService} from "../../../../services/api.service";
import {Brewery} from "../../../models/brewery";

@Component({
  selector: 'app-breweries-details',
  templateUrl: './breweries-details.component.html',
  styleUrls: ['./breweries-details.component.scss']
})
//if no photo? no description?, no beers list?
export class BreweriesDetailsComponent implements OnInit {
  breweryId: any = [];
  breweryDetails: any = [];
  beersList: any = [];
  loadingInProgress=true;

  constructor(private apiService: ApiService,
              private router: Router,
              public route: ActivatedRoute) {

    this.breweryId = this.route.snapshot.paramMap.get('breweryId'); //get id parameter
  }
  ngOnInit() {
    this.getBreweryById()
    this.loadingInProgress=false;
    console.log('breweryId',this.breweryId);
    console.log('breweryDetails',this.breweryDetails)
    console.log('beersList',this.beersList);
  }

  getBreweryById() {
    this.apiService.getBreweryById(this.breweryId).subscribe((response)=>{
      this.breweryDetails = response
      console.log('breweryDetails',this.breweryDetails)

      this.getBeersByBrewery();
    })
}
  getBeersByBrewery(){
    this.apiService.getBeersByBrewery(this.breweryId).subscribe((response)=>{
      this.beersList = response;
      console.log('beersList',this.beersList);

    })
  }
}
