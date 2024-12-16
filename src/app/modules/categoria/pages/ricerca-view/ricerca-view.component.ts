import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '@core/services/loading.service';
import { RouterStateService } from '@core/services/router-state.service';
import { FieldConfig } from '@shared/filtri-ricerca/interfaces/field.interface';
import { DatoStruttura, Modulo } from '@shared/models/modulo';
import DatoUtils from '@shared/utils/dato-utils';

enum LoadingIndicator {
  MODULO_CONFIG
}

@Component({
  selector: 'app-ricerca-view',
  templateUrl: './ricerca-view.component.html',
  styleUrls: ['./ricerca-view.component.scss']
})
export class RicercaViewComponent {

  LoadingIndicator = LoadingIndicator;

  idModulo: string = '';
  categoria: string = '';
  moduloInfo: Modulo | undefined;
  filtri: FieldConfig[] = [];
  mapFilterValue: Map<string, string> | undefined;

  constructor(private router: Router, private routerState: RouterStateService, private activatedRoute: ActivatedRoute, public loadingService: LoadingService) {
    this.routerState.url$?.subscribe(url => {
      this.categoria = url[0].path;
      this.idModulo = url[1].path;
    });
    this.routerState.query$ = this.activatedRoute.paramMap;
  }

  ngOnInit(): void {
    this.routerState.query$?.subscribe(param => {
      if (param && param.get('req') != null) {
        let req = param.get('req');
        let filtriRicerca = JSON.parse(atob(req!));
        this.mapFilterValue = new Map(Object.entries(filtriRicerca));
      }
    });

    this.loadData();
  }

  loadData() {
    this.routerState.getConfig().subscribe(data => {
      if (data) {
        this.moduloInfo = data;
        this.createFilters(data.strutturaDati);
      }
    });
  }

  //creo configurazioni per widget del form dinamico
  createFilters(dati: Array<DatoStruttura>) {
    dati.filter(d => d.ricercabile).forEach(d => {
      let f = DatoUtils.mapDatoToField(d, true);
      if (this.mapFilterValue && this.mapFilterValue.get(f.name) !== null) {
        f.value = this.mapFilterValue.get(f.name);
      }
      f.advanced = false;
      this.filtri.push(f);
    });
  }

  doSearch(filters: any) {
    let r = Object.fromEntries(Object.entries(filters).filter(([_, v]) => v != null));
    console.log(r)
  }

}

