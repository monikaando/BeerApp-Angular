import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../../../services/api.service';
import {ActivatedRoute} from '@angular/router';
import {BeerDetails} from '../../../models/beerDetails';

@Component({
  selector: 'app-beer-detail',
  templateUrl: './beer-details.component.html',
  styleUrls: ['./beer-details.component.scss']
})
export class BeerDetailsComponent implements OnInit {
  beerId: string;
  beerDetails: BeerDetails;
  loadingInProgress = true;

  constructor(private apiService: ApiService,
              public route: ActivatedRoute) {
    // get id parameter
    this.beerId = this.route.snapshot.paramMap.get('beerId');
  }
  ngOnInit(): void {
    this.getBeerById();
  }
  getBeerById(): void {
    this.apiService.getBeerById(this.beerId).subscribe((response) => {
      this.beerDetails = response;
      this.loadingInProgress = false;
    });
  }
}
