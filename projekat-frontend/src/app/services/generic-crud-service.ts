import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from '../models/page';


export class GenericCrudService<T, ID> { //Ovoje moj genricki servis koji ima da parametra jedan je T, a drugi ID
                                         //Pri nasledjivanju za podatak T se unosi naziv modela, a za ID tip primarnog kljuca

  //Posto sam ja ovaj servis zamislio kao baznu klasu onda sam za njegov konstruktor napisao protected
  protected constructor(
    protected http: HttpClient,
    protected baseUrl: string
  ) {}

  // GET /{id}
  getOne(id: ID): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${id}`);
  }

  // GET (sa paginacijom)
  // Vracam objekat tipa Page koji cu koristiti za moju genericku tabelu
  getAll(pageParams?: any): Observable<Page<T>> {
    let params = new HttpParams();
    if (pageParams) {
      Object.keys(pageParams).forEach(key => {
        params = params.append(key, pageParams[key]);
      });
    }
    return this.http.get<Page<T>>(this.baseUrl, { params });
  }

  // GET /all
  getAllWithoutPagination(): Observable<T[]> {
    return this.http.get<T[]>(`${this.baseUrl}/all`);
  }

  // POST
  create(dto: T): Observable<T> {
    return this.http.post<T>(this.baseUrl, dto);
  }

  // PUT /{id}
  update(id: ID, dto: T): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${id}`, dto);
  }

  // DELETE /{id}
  delete(id: ID): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}