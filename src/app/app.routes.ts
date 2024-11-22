import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.component').then((m) => m.default),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then((m) => m.default),
    children: [
      {
        path: 'alerta-gubernamental',
        title: 'Alerta Gubernamental',
        loadComponent: () =>
          import('./dashboard/alerta-gubernamental/perfil.component').then(
            (m) => m.default
          ),
      },
      {
        path: 'alerta-social',
        title: 'Alerta Social',
        loadComponent: () =>
          import('./dashboard/alerta-social/alerta-social.component').then(
            (m) => m.default
          ),
      },
      {
        path: 'infoAlertaSocial',
        title: 'Informe Alerta Social',
        loadComponent: () =>
          import('./dashboard/informe/informe.component').then(
            (m) => m.default
          ),
      },
    ],
  },
  {
    path: 'dashboard/alerta-gubernamental',
    redirectTo: 'dashboard/alerta-gubernamental',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'dashboard/alerta-gubernamental',
  },
];
