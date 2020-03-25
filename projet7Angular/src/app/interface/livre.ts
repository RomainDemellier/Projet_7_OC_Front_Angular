import { Auteur } from "./auteur";

export interface Livre {
    id: number;
    titre:String;
    auteur: Auteur;
    genre: String;
    nbreExemplaires: number;
}
