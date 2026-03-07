import { Routes } from '@angular/router';
import { LoginComponent } from './components/login-component/login-component';
import { RegisterComponent } from './components/register-component/register-component';
import { HomeComponent } from './components/home-component/home-component';
import { DashboardComponent } from './components/dashboard-component/dashboard-component';
import { UpisNaGodinuComponent } from './components/upis-na-godinu-component/upis-na-godinu-component';
import { RoleGuard } from './guard/role.guard';
import { ZahteviStudenata } from './components/zahtevi-studenata/zahtevi-studenata';
import { PrijaviIspitComponent } from './components/prijavi-ispit-component/prijavi-ispit-component';
import { MojiPredmetiComponent } from './components/moji-predmeti-component/moji-predmeti-component';
import { ZakazivanjeIspita } from './components/zakazivanje-ispita/zakazivanje-ispita';
import { AdministracijaComponent } from './components/administracija-component/administracija-component';

export const routes: Routes = [
     // --- JAVNI DEO ---
  {
    path: '',
    component: HomeComponent, 
    children: [
      //{ path: '', component: pocetnaKomponenta },
      //{ path: 'univerzitet', component: DetaljiUniverzitetaComponent },
      //{ path: 'fakulteti', component: FacultyListComponent },
      //{ path: 'studije', component: someOtherComponent },
    ]
  },

  // --- AUTENTIFIKACIJA ---
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // --- ZAŠTIĆENI DEO (DASHBOARD) ---
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [RoleGuard],
    children: [
      {path: 'prijavi-ispit', component:PrijaviIspitComponent},
      { path: 'upis-na-godinu', component: UpisNaGodinuComponent },
      { path: 'listaZahteva', component: ZahteviStudenata },
      { path: 'zakazivanjeIspita', component: ZakazivanjeIspita},
      //{ path: 'home', component: DashboardWelcomeComponent }, 
      //{ path: 'administracija', component: AdminTableComponent },
      { path: 'moji-predmeti', component: MojiPredmetiComponent },
      { path: 'administracija', component: AdministracijaComponent}
      // ... ostale rute
    ]
  },

  // Wildcard ruta za 404
  { path: '**', redirectTo: '' }
    
];
