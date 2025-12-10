import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./login/login').then(m => m.Login),
        children: [
            {
                path: 'register',
                loadComponent: () => import('./login/register/register').then(m => m.Register)
            }
        ],

    }
];
