import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import FtCommitmentService from '../../services/ft-commitment.service';
import { UtilService } from '../../services/utils/util.service';

/**
 * Component for listing all ERC-20 commitments
 */
@Component({
  selector: 'ft-commitment-list',
  templateUrl: './index.html',
  styleUrls: ['./index.css'],
  providers: [FtCommitmentService, UtilService]
})
export default class FtCommitmentListComponent implements OnInit {
/**
 *  Transaction list
 */
  transactions: any;
  /**
   * Flag for http request
   */
  isRequesting = false;
  /**
   * If no coins are available, set this property as false;
   */
  noCoin = false;
  /**
   * Fungeble Token name , read from ERC-20 contract.
   */
  ftName: string;

  constructor(
    private toastr: ToastrService,
    private ftCommitmentService: FtCommitmentService,
    private utilService: UtilService,
  ) { }

  ngOnInit() {
    this.ftName = localStorage.getItem('ftName');
    this.getFTCommitments();
  }


  /**
   * Method list down all ERC-20 commitments.
   */
  getFTCommitments() {
    this.transactions = null;
    this.isRequesting = true;
    this.ftCommitmentService.getFTCommitments()
      .subscribe( data => {
        this.isRequesting = false;
        if (data &&
          data['data']) {
          this.transactions = data['data'].map((tx, indx) => {
            tx.selected = false;
            tx.id = indx;
            return tx;
          });
        } else {
          this.noCoin = true;
          // this.toastr.error('No Coin found.');
        }
      }, error => {
        this.isRequesting = false;
      });
  }


}
