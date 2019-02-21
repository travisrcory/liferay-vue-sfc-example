import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PageNotFoundComponent} from "./page-not-found.component";

const routes: Routes = [
  { path: '**',   component: PageNotFoundComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(
			routes,
			{useHash: true, enableTracing: false}
			)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [PageNotFoundComponent]
