import { Routes } from '@angular/router';
import { LoginComponent } from './components/login-component/login-component';
import { RegisterComponent } from './components/register-component/register-component';
import { HomeComponent } from './components/home-component/home-component';
import { DashboardComponent } from './components/dashboard-component/dashboard-component';
import { RoleGuard } from './guard/role.guard';
import { ZahteviStudenata } from './components/zahtevi-studenata/zahtevi-studenata';
import { PrijaviIspitComponent } from './components/prijavi-ispit-component/prijavi-ispit-component';
import { ZakazivanjeIspita } from './components/zakazivanje-ispita/zakazivanje-ispita';
import { UnosOceneComponent } from './components/unos-ocene-component/unos-ocene-component';
import { IstorijaIspitaComponent } from './components/istorija-ispita-component/istorija-ispita-component';
import { AdministracijaComponent } from './components/administracija-component/administracija-component';
import { DodajOsobljeComponent } from './components/dodaj-osoblje-component/dodaj-osoblje-component';
import { DetaljiUniverzitetaComponent } from './components/detalji-univerziteta-component/detalji-univerziteta-component';
import { PocetnaStranicaComponent } from './components/pocetna-stranica-component/pocetna-stranica-component';
import { ListaFakultetaComponent } from './components/lista-fakulteta-component/lista-fakulteta-component';
import { DetaljiFakultetaComponent } from './components/detalji-fakulteta-component/detalji-fakulteta-component';
import { ListaStudijskihProgramaComponent } from './components/lista-studijskih-programa-component/lista-studijskih-programa-component';
import { DetaljiStudijskogProgramaComponent } from './components/detalji-studijskog-programa-component/detalji-studijskog-programa-component';
import { UpisNaGodinuComponent } from './components/upis-na-godinu-component/upis-na-godinu-component';
import { ProfilComponent } from './components/profil-component/profil-component';

export const routes: Routes = [
  // --- JAVNI DEO ---
  {
    path: '',
    component: HomeComponent, 
    children: [
      { path: '', component: PocetnaStranicaComponent },
      { path: 'univerzitet', component: DetaljiUniverzitetaComponent },
      { path: 'fakulteti', component: ListaFakultetaComponent },
      { path: 'fakulteti/:id', component: DetaljiFakultetaComponent },
      { path: 'programi', component: ListaStudijskihProgramaComponent},
      { path: 'programi/:id', component: DetaljiStudijskogProgramaComponent}
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
      {path: 'upis-na-godinu', component: UpisNaGodinuComponent},
      { path: 'listaZahteva', component: ZahteviStudenata },
      { path: 'zakazivanjeIspita', component: ZakazivanjeIspita},
      { path: 'unos-ocena', component: UnosOceneComponent},
      { path: 'istorija-ispita', component: IstorijaIspitaComponent},
      { path: 'administracija', component: AdministracijaComponent},
      { path: 'dodajOsoblje', component: DodajOsobljeComponent},
      { path: 'profil', component: ProfilComponent}
    ]
  },

  // Wildcard ruta za 404
  { path: '**', redirectTo: '' }
    
];
