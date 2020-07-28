import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../../services/api.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-beer-detail',
  templateUrl: './beer-details.component.html',
  styleUrls: ['./beer-details.component.scss']
})
export class BeerDetailsComponent implements OnInit {
  beerId: string = "";
  beerDetails: any;
  loadingInProgress = true;

  constructor(private apiService: ApiService,
              private router: Router,
              public route: ActivatedRoute) {

    this.beerId = this.route.snapshot.paramMap.get('beerId'); //get id parameter
  }

  ngOnInit() {
    this.getBeerById();
  }

  getBeerById() {
    this.apiService.getBeerById(this.beerId).subscribe((response) => {
      this.beerDetails = response
      this.loadingInProgress = false;
      console.log('response', response)
      console.log('beerId', this.beerId)
      console.log('beerDetails', this.beerDetails)
    })
  }
}
