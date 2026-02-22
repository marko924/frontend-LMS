export interface Page<T> {
    
    content: T[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number; // Trenutna stranica (Spring kreće od 0)
    first: boolean;
    last: boolean;
    empty: boolean;
}
