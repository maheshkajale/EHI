import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUpdateComponent } from './contacts/create-update/create-update.component';
import { ListComponent } from './contacts/list/list.component';

const routes: Routes = [
  {path: '', component: ListComponent},
  {path: 'edit/:id', component: CreateUpdateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
