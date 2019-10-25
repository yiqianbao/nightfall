
import { Routes } from '@angular/router';
import LoginComponent from '../pages/login';
import CreateAccountsComponent from '../pages/create-accounts';
import OverviewComponent from '../pages/overview';
import { AuthService } from '../services/auth/auth.service';
import { UserSettingsComponent } from '../pages/user-settings/user-settings.component';
import { UserProfileComponent } from '../pages/user-profile/user-profile.component';
import { UserAccountsComponent } from '../pages/user-accounts/user-accounts.component';

import NftMintComponent from '../pages/nft-mint';
import NftTransferComponent from '../pages/nft-transfer';
import NftBurnComponent from '../pages/nft-burn';
import NftListComponent from '../pages/nft-list';

import NftCommitmentMintComponent from '../pages/nft-commitment-mint';
import NftCommitmentTransferComponent from '../pages/nft-commitment-transfer';
import NftCommitmentBurnComponent from '../pages/nft-commitment-burn';
import NftCommitmentListComponent from '../pages/nft-commitment-list';

import FtMintComponent from '../pages/ft-mint';
import FtBurnComponent from '../pages/ft-burn';
import FtTransferComponent from '../pages/ft-transfer';

import FtCommitmentMintComponent from '../pages/ft-commitment-mint';
import FtCommitmentTrasnferComponent from '../pages/ft-commitment-transfer';
import FtCommitmentBurnComponent from '../pages/ft-commitment-burn';
import FtCommitmentListComponent from '../pages/ft-commitment-list';

export const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'createAccount', component: CreateAccountsComponent },
  { path: 'settings',
    component: UserSettingsComponent,
    children: [
      {path: '', redirectTo: 'profile', pathMatch: 'full'},
      {path: 'profile', component: UserProfileComponent},
      {path: 'accounts', component: UserAccountsComponent}
    ],
    canActivate: [AuthService]
  },
  { path: 'overview', component: OverviewComponent, canActivate: [AuthService] },
  { path: 'token/mint', component: NftCommitmentMintComponent , canActivate: [AuthService]},
  { path: 'token/public/mint', component: NftMintComponent , canActivate: [AuthService]},
  { path: 'token/public/transfer', component: NftTransferComponent , canActivate: [AuthService]},
  { path: 'token/burn', component: NftCommitmentBurnComponent , canActivate: [AuthService]},
  { path: 'token/public/burn', component: NftBurnComponent , canActivate: [AuthService]},
  { path: 'token/public/list', component: NftListComponent , canActivate: [AuthService]},
  { path: 'token/list', component: NftCommitmentListComponent , canActivate: [AuthService]},
  { path: 'coin/list' , component: FtCommitmentListComponent, canActivate: [AuthService] },
  { path: 'coin/mint' , component: FtCommitmentMintComponent, canActivate: [AuthService] },
  { path: 'token/transfer', component: NftCommitmentTransferComponent, canActivate: [AuthService] },
  { path: 'coin/transfer', component: FtCommitmentTrasnferComponent, canActivate: [AuthService] },
  { path: 'coin/burn', component: FtCommitmentBurnComponent, canActivate: [AuthService] },
  { path: 'coin/public/mint', component: FtMintComponent, canActivate: [AuthService] },
  { path: 'coin/public/transfer', component: FtTransferComponent, canActivate: [AuthService] },
  { path: 'coin/public/burn', component: FtBurnComponent, canActivate: [AuthService] },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
