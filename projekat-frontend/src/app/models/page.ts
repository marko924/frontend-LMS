export interface Page<T> { //ovaj interfejs sluzi da bi smo mogli da obradimo Page podatke koji dolaze sa backenda
                           //pomocu njega mogu da uvedem paginaciju u tabeli
    content: T[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number; // Trenutna stranica (Spring kreće od 0)
    first: boolean;
    last: boolean;
    empty: boolean;
}
