import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainViewComponent } from "./pages/main-view/main-view.component";
import { RicercaViewComponent } from "./pages/ricerca-view/ricerca-view.component";

const routes: Routes = [
    {
        path: '',
        component: MainViewComponent,
        children: [
            {
                path: 'ricerca',
                component: RicercaViewComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CategoriaRoutingModule { }