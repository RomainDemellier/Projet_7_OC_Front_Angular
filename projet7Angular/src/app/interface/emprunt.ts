import { Livre } from "./livre";
import { Usager } from "./usager";

export interface Emprunt {
    id: number;
    usager: Usager;
    livre: Livre;
    dateEmprunt: Date;
    dateRetour: Date;
    prolonge: boolean;
    actif: boolean;
}
