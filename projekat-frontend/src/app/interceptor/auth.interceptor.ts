import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  //HttpInterceptor - klasa koja hvata svaki http poziv i u zaglavlju salje token

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('token'); //prvo gldam da li token uopste postoji (da li ga je backend posla pri prijavi)
    if (token) {
      //Pravim kopiju originalnog zahteva i dodeljujem mu novo zaglavlje
      const cloned = req.clone({ 
        //Dodajem standradni naziv zaglavlja za bezbednost i kazem da nosliac ovog tokena ima dozvolu
        headers: req.headers.set('Authorization', 'Bearer ' + token)
      });
      return next.handle(cloned); //na kraju saljem zahtev na backend
    }
    return next.handle(req); //ako tokena nema salje se prazan zahtev
  }

  //Ovaj ceo proces mi omogucava bezbednu komunikaciju sa backendom
}