import { Validators } from "@angular/forms";
import { FieldConfig, Widget } from "@shared/filtri-ricerca/interfaces/field.interface";

const mapType = new Map([
    ["TESTO", "text"],
    ["INTERO", "number"],
    ["NUMERICO", "number"],
    ["CODICE_FISCALE", "text"]
]);

const mapValidation = new Map([
    ["CODICE_FISCALE", { name: "pattern", validator: Validators.pattern('^([A-Z]{6}[0-9LMNPQRSTUV]{2}[ABCDEHLMPRST]{1}[0-9LMNPQRSTUV]{2}[A-Z]{1}[0-9LMNPQRSTUV]{3}[A-Z]{1})$|([0-9]{11})$'), message: "Codice fiscale non valido" }],
    ['INDIRIZZO_MAIL', { name: "pattern", validator: Validators.email, message: "Email non valida" }],
    ['VALUTA', { name: "pattern", validator: Validators.pattern('^[0-9]\\d*(\\,\\d{1,2})?$'), message: "Importo non valido, inserire un valore positivo con massimo 2 cifre decimali" }]
]);

export default class DatoUtils {

    static mapDatoToField(d: any, isRicerca: boolean) {
        let tipoWidget = "input";
        if (d.tipoDato == "DATA_YMD" || d.tipoDato == "DATA_YMD_HMS") {
            tipoWidget = "date";
        } else if (d.valoriAmmessi && d.valoriAmmessi.length > 0) {
            tipoWidget = "select";
        }
        let f: FieldConfig = {
            type: tipoWidget as Widget,
            label: d.descrizione,
            name: d.idDato,
            showOnCondition: false
        }
        if (!isRicerca) {
            f.readonly = d.solaLettura;
            f.value = d.valore;
            f.required = d.obbligatorio;
        }
        if (f.type == "input") {
            f.inputType = mapType.get(d.tipoDato);
        } else if (f.type == "select") {
            f.options = d.valoriAmmessi;
        }
        if (mapValidation.has(d.tipoDato)) {
            f.validations = [mapValidation.get(d.tipoDato)!]
        }

        return f;
    }

}