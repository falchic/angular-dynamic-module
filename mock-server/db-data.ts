export const MODULI: any = [
    {
        "nome": "Modulo 1",
        "dataInizio": { "$date": "2022-01-31T23:00:00.000Z" },
        "dataFine": { "$date": "2022-04-30T23:00:00.000Z" },
        "stato": "APERTO",
        "strutturaDati": [{
            "idDato": "nome",
            "descrizione": "Nome",
            "tipoDato": "TESTO",
            "valoreMultiplo": false,
            "solaLettura": true,
            "obbligatorio": true,
            "nascosto": false,
            "ricercabile": true,
            "ordinabile": false
        },
        {
            "idDato": "cognome",
            "descrizione": "Cognome",
            "tipoDato": "TESTO",
            "valoreMultiplo": false,
            "solaLettura": true,
            "obbligatorio": true,
            "nascosto": false,
            "ricercabile": true,
            "ordinabile": false
        },
        {
            "idDato": "codice_fiscale",
            "descrizione": "Codice Fiscale",
            "tipoDato": "CODICE_FISCALE",
            "valoreMultiplo": false,
            "solaLettura": true,
            "obbligatorio": true,
            "nascosto": false,
            "ricercabile": true,
            "ordinabile": false
        },
        {
            "idDato": "lista_multipla",
            "descrizione": "Lista multipla",
            "tipoDato": "TESTO",
            "valoreMultiplo": false,
            "solaLettura": true,
            "obbligatorio": true,
            "nascosto": false,
            "ricercabile": true,
            "ordinabile": false,
            "valoriAmmessi": ["Valore 1", "Valore 2"]
        }],
        "id": "modulo1",
        "categoria": "categoria",
        "versione": 1
    }
]
