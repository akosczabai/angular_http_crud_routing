import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { CarsComponent } from "./components/cars/cars.component";
import { CarFormComponent } from "./components/car-form/car-form.component";

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "cars", component: CarsComponent },
  { path: "car-form", component: CarFormComponent },
  { path: "car-form/:id", component: CarFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
