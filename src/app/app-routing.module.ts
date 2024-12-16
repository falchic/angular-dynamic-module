import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NotFoundPageComponent } from "@core/components/not-found-page/not-found-page.component";

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: 'home', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) },
    { path: 'categoria/:idModulo', loadChildren: () => import('./modules/categoria/categoria.module').then(m => m.CategoriaModule) },
    {
        path: '**', pathMatch: 'full',
        component: NotFoundPageComponent
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }