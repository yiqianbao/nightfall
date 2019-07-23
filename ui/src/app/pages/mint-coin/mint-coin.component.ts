import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountsApiService } from '../../services/accounts/accounts-api.service';
import { CoinApiService } from '../../services/coins/coin-api.service';
import { UtilService } from '../../services/utils/util.service';
/**
 *  Mint coin component, which is used for rendering the page of Mint ERC-20 token commitment.
 */
@Component({
  selector: 'app-mint-coin',
  templateUrl: './mint-coin.component.html',
  providers: [CoinApiService, AccountsApiService, UtilService],
  styleUrls: ['./mint-coin.component.css']
})
export class MintCoinsComponent implements OnInit {

  /**
   * Flag for http request
   */
  isRequesting = false;
  /**
   * To store the random hex string.
   */
  serialNumber = "";
  /**
   * Form object to collect mint details. 
   */
  mintCoinForm: FormGroup;
  /**
   * To store the ERC-20 token count.
   */
  coinCount;
  /**
   * Fungeble Token name , read from ERC-20 contract.
   */
  ftName:string;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private coinApiService: CoinApiService,
    private accountService: AccountsApiService,
    private utilService: UtilService,
    private router: Router
  ) { }


  ngOnInit() {
    this.ftName = localStorage.getItem('ftName');
    this.createForm();
    this.getCoins();
  }

  /**
   * Method to list down all ERC-20 tokens.
   */
  getCoins(){
    this.accountService.getCoins().subscribe(
      data => {
        this.coinCount = data['data']['balance']
      },
      error => {
        console.log("error in user get", error)
      }
    )
  }

  /**
   * Method to create Mint form
   */
  createForm() {
    this.mintCoinForm = this.fb.group({
      A : ['', Validators.required]
    });
  }

  /**
   * Method to Mint ERC-20 token commitemnt.
   */
  mintCoin() {
    this.isRequesting = true;
    var hexValue = (this.mintCoinForm.controls['A'].value).toString(16);
    var hexString = '0x' + hexValue.padStart(32,"0");
    console.log('Hexstring::',hexString);
    this.coinApiService.mintCoin(hexString, localStorage.getItem('publickey')).subscribe(tokenDetails => {
      this.isRequesting = false;
      this.toastr.success('Coin Minted is ' + tokenDetails['data']['coin']);
      this.router.navigate(['/coin/list']);
    }, error => {
        this.isRequesting = false;
        this.toastr.error('Please try again', 'Error');
    })
  }

}
