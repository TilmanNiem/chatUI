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
    path: 'chat',
    loadComponent: () => import('./chat/chats/chats').then((m) => m.Chats),
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
