import { Component, OnInit } from '@angular/core';
import { LoadingService } from '@core/services/loading.service';
import { ModuloService } from '@core/services/modulo.service';
import { Modulo } from '@shared/models/modulo';

enum LoadingIndicator {
  MODULI_LIST
}

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss']
})
export class HomeViewComponent implements OnInit {

  LoadingIndicator = LoadingIndicator;
  selectedValue: Modulo | undefined;

  moduli: Modulo[] = [];

  constructor(private moduloService: ModuloService, public loadingService: LoadingService) { }

  ngOnInit(): void {
    this.loadModuli();
  }

  private loadModuli() {
    this.loadingService.doLoading(
      this.moduloService.getModuli(),
      this,
      LoadingIndicator.MODULI_LIST
    ).subscribe((data: Modulo[]) => {
      this.moduli = data;
    });
  }

}
