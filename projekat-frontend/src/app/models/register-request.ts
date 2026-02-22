export interface RegisterRequest {

    korisnickoIme: string;
    lozinka: string;       
    email: string;
    uloga: string;
    ime?: string;
    prezime?: string;
    jmbg?: string;
    biografija?: string;
}
