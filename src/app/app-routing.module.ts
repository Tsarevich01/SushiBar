import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { RegisterComponent } from './register/register.component';
import { ActivateGuard } from './activate-guard';
import { FilesComponent} from './files/files.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'goods', loadChildren: './goods/goods.module#GoodsModule'},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'admin', component: AdminComponent, canActivate: [ActivateGuard]},
  { path: 'files', component: FilesComponent},
  { path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
