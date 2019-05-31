import { Component, OnInit} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CoinApiService } from '../../services/coins/coin-api.service';
import { Router } from '@angular/router';

/**
 * Burn public coin component, which is used for rendering the page of burn public coin.
 */
@Component({
  selector: 'app-burn-public-coin',
  templateUrl: './burn-public-coin.component.html',
  providers: [CoinApiService],
  styleUrls: ['./burn-public-coin.component.css']
})
export class BurnPublicCoinComponent implements OnInit {

  /**
   * Flag for http request
   */
  isRequesting = false;

  /**
   * Amount to burn ERC-20 token
   */
  amount:number;

  /**
   * Fungeble Token name , read from ERC-20 contract.
   */
  ftName:string;

  constructor(
    private toastr: ToastrService,
    private coinApiService: CoinApiService,
    private router: Router
  ) {
    
  }

  ngOnInit () {
    this.ftName = localStorage.getItem('ftName');
  }

  /**
   * Method to burn ERC-20 tokens.
   */
  burnPublicCoin() {
    this.isRequesting = true;
    this.coinApiService.burnPublicCoin(localStorage.getItem('address'), this.amount).subscribe(transaction => {
      this.isRequesting = false;
      this.toastr.success('Public Coin Burned Successfully.');     
      this.router.navigate(['/overview']);
    }, error => {
        this.isRequesting = false;
        this.toastr.error('Please try again', 'Error');      
    })
  }
  
}

