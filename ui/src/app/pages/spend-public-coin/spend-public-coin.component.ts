import { Component, OnInit} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CoinApiService } from '../../services/coins/coin-api.service';
import { AccountsApiService } from '../../services/accounts/accounts-api.service';
import { Router } from '@angular/router';
import { UtilService } from '../../services/utils/util.service';

/**
 *  Spend public coin component, which is used for rendering the page of transfer ERC-20 token to the selected receipent.
 */
@Component({
  selector: 'app-spend-public-coin',
  templateUrl: './spend-public-coin.component.html',
  providers: [CoinApiService, AccountsApiService, UtilService],
  styleUrls: ['./spend-public-coin.component.css']
})
export class SpendPublicCoinComponent implements OnInit {

  /**
   * Flag for http request
   */
  isRequesting = false;

  /**
   * Amount to transfer
   */
  amount:number;

  /**
   * To store all users 
   */
  users:any = [];

  /**
   * Name of the transferee
   */
  receiverName: string;

  /**
   * Fungeble Token name , read from ERC-20 contract.
   */
  ftName:string;


  constructor(
    private toastr: ToastrService,
    private coinApiService: CoinApiService,
    private accountApiService: AccountsApiService,
    private utilService: UtilService,
    private router: Router
  ) {
    
  }

  ngOnInit () {
    this.getUsers();
    this.ftName = localStorage.getItem('ftName');
  }

  /**
   * Method to transfer two ERC-20 tokens to selected user.
   */
  transferPublicCoin() {
    this.isRequesting = true;
    this.coinApiService.transferPublicCoin(this.amount,localStorage.getItem('address'), this.receiverName).subscribe(transaction => {
      this.isRequesting = false;
      this.toastr.success('Public Coin transferred Successfully.');     
      this.router.navigate(['/overview']);
    }, error => {
        this.isRequesting = false;
        this.toastr.error('Please try again', 'Error');      
    })
  }

  /**
   * Method to retrive all users.
   * 
   */
  getUsers () {
    this.isRequesting = true;
    this.accountApiService.getUsers().subscribe(
      data => {
        this.isRequesting = false;
        this.users = data['data'].filter(user => user !=='auditor');
      }, error => {
        this.isRequesting = false;
        this.toastr.error('Please try again.', "Error");
      })
  }
  
}

