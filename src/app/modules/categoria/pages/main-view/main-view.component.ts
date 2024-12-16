import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, ViewChild } from '@angular/core';
import { MatDrawerMode, MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute } from '@angular/router';
import { ModuloService } from '@core/services/modulo.service';
import { RouterStateService } from '@core/services/router-state.service';
import { SideNavService } from '@core/services/sidenav.service';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent {

  @ViewChild('sidenav') public sidenav!: MatSidenav;

  public isMenuOpen: boolean = false;
  navMode: MatDrawerMode = 'over';
  hasBackdrop: boolean = false;

  constructor(private responsive: BreakpointObserver, private sideNavService: SideNavService, private activatedRoute: ActivatedRoute, private routerState: RouterStateService, private moduliService: ModuloService) {
    this.routerState.url$ = this.activatedRoute.parent?.url;
    this.activatedRoute.parent?.url.subscribe(url => {
      let idModulo = url[1].path;
      if (!sessionStorage.getItem('config')) {
        this.moduliService.getModuloById(idModulo).subscribe(b => this.routerState.setConfig(b, true))
      }
    });
    //TODO gestione responsive sidenav
    this.isMenuOpen = true;
    this.hasBackdrop = false;
    this.navMode = 'side';
  }

  ngOnInit(): void {
    this.sideNavService.sideNavToggle$.subscribe(() => {
      this.sidenav.toggle();
    });
  }

  onActivate(event: any) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

}
