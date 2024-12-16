import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { Modulo } from '@shared/models/modulo';

const baseUrl: string = environment.baseUrl;

@Injectable({
    providedIn: 'root'
})
export class ModuloService {

    constructor(private http: HttpClient) { }

    getModuli() {
        let url = `${baseUrl}/moduli`;
        return this.http.get<Modulo[]>(url);
    }

    getModuloById(id: string) {
        let url = `${baseUrl}/moduli/${id}`;
        return this.http.get<Modulo>(url);
    }

}
