import { Routes } from '@angular/router';
import { ListComponent } from './pages/list/list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ViewComponent } from './pages/view/view.component';
import { FormComponent } from './pages/form/form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: DashboardComponent, // 4200/home y en el html: navBar
    children: [
      
      { path: '', redirectTo: 'users', pathMatch: 'full' }, // 4200/home/users
      { path: 'users', component: ListComponent }, // 4200/home/users y en el html: cardComponent
      { path: 'user/:id', component: ViewComponent }, //
      { path: 'new-user', component: FormComponent }, //
      { path: 'update-user/:id', component: FormComponent }, //
    ],
  },
  { path: '**', redirectTo: 'home' },
];

/*
pages:
dashboard
list
view
form

+components:
navbar
card
*/
