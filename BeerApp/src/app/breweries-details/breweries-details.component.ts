import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-breweries-details',
  templateUrl: './breweries-details.component.html',
  styleUrls: ['./breweries-details.component.scss']
})
export class BreweriesDetailsComponent implements OnInit {
  breweryId: any = [];
  breweryDetails: any = [];

  constructor(private http: HttpClient,
              private router: Router,
              public route: ActivatedRoute) {

    this.breweryId = this.route.snapshot.paramMap.get('breweryId'); //get id parameter
  }

  getBreweryById() {
    return this.http.get(`api/brewery/${this.breweryId}/?key=659d5c6b8f3d2447f090119e48202fdb`)
  }
  initialisation(r) {
console.log('initialization',(r))
  }
  async getBreweryDetails() {
    await this.getBreweryById().toPromise()
      .then(result => {
        this.breweryDetails = result
        console.log(this.breweryDetails.data)
      })
    return await this.getBreweryById().toPromise();
  }

  ngOnInit() {
    this.getBreweryDetails()
      .then(r => this.initialisation(r))
  }

}
