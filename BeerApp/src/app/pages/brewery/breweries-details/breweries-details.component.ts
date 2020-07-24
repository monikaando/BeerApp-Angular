import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

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

  constructor(private http: HttpClient,
              private router: Router,
              public route: ActivatedRoute) {

    this.breweryId = this.route.snapshot.paramMap.get('breweryId'); //get id parameter
  }

  getBreweryById() {
    return this.http.get(`api/brewery/${this.breweryId}/?key=659d5c6b8f3d2447f090119e48202fdb`)
  }

  getBeersByBrewery() {
    return this.http.get(`api/brewery/${this.breweryId}/beers/?key=659d5c6b8f3d2447f090119e48202fdb`)
  }

  initialisation(r) {
    console.log('initialization', (r))
  }

  async getBreweryDetails() {
    await this.getBreweryById().toPromise()
      .then(result => {
        this.breweryDetails = result
        console.log(this.breweryDetails.data)
        this.getBeersList()
      })
    return await this.getBreweryById().toPromise();
  }

  async getBeersList() {
    await this.getBeersByBrewery().toPromise()
      .then(result => {
        this.beersList = result
        console.log('Beers list: ',this.beersList)


      })
    return await this.getBeersByBrewery().toPromise();
  }

  ngOnInit() {
    this.getBreweryDetails()
      .then(r => this.initialisation(r))
  }
}
