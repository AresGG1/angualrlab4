import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {UsersComponent} from "./components/users/users.component";
import {UserFormComponent} from "./components/user-form/user-form.component";
import {AboutComponent} from "./components/about/about.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";

const routes: Routes = [
  { path: '', component: UsersComponent },
  { path: 'add', component: UserFormComponent },
  { path: 'edit/:uuid', component: UserFormComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', pathMatch: 'full',
    component: NotFoundComponent  }
];

@NgModule({
  declarations: [


  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
