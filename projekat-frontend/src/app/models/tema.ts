export interface Tema {

    id: number;
    naslov: string;
    vremeKreiranja: Date | string;
    forumId: number;
    autorId: number;
    objaveId: number[];
}
