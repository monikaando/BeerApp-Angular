import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../../services/api.service";

@Component({
  selector: 'app-breweries-details',
  templateUrl: './brewery-details.component.html',
  styleUrls: ['./brewery-details.component.scss']
})
export class BreweryDetailsComponent implements OnInit {
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
  }

  getBreweryById() {
    this.apiService.getBreweryById(this.breweryId).subscribe((response)=>{
      this.breweryDetails = response
      this.getBeersByBrewery();
    })
}
  getBeersByBrewery(){
    this.apiService.getBeersByBrewery(this.breweryId).subscribe((response)=>{
      this.beersList = response;
    })
  }
}
