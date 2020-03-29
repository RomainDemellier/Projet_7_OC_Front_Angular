import { Auteur } from "./auteur";

export interface Livre {
    id: number;
    titre:string;
    auteur: Auteur;
    genre: String;
    nbreExemplaires: number;
}
