export interface Modulo {
    id: string;
    nome: string;
    categoria: string;
    dataInizio: Date;
    dataFine: Date;
    strutturaDati: Array<DatoStruttura>;
}

export interface DatoStruttura {
    idDato: string;
    descrizione: string;
    tipoDato: "INTERO" | "NUMERICO" | "TESTO" | "CODICE_FISCALE";
    valoreMultiplo: boolean;
    solaLettura: boolean;
    obbligatorio: boolean;
    nascosto: boolean;
    ricercabile: boolean;
    ordinabile: boolean;
    valoriAmmessi: Array<any>;
}