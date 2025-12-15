import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: 'login',
    loadComponent: () => import('./authentication/login/login').then((m) => m.Login),
  },
  {
    path: 'register',
    loadComponent: () => import('./authentication/register/register').then((m) => m.Register),
  },
    {
    path: '**',
    redirectTo: 'login', // TODO: change to landing page when auth guard is implemented
  },
  
];
