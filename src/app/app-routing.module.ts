import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './security/auth.guard';
import { SignupComponent } from './signup/signup.component';
import { TransactionComponent } from './transaction/transaction.component';

const routes: Routes = [
{path:'',component:LoginComponent },
{path:'signup',component:SignupComponent},
{path:'account',component:AccountComponent,canActivate:[AuthGuard]},
{path:'transaction/:id',component:TransactionComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
