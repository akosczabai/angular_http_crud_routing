import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { Subscription } from "rxjs";
import { CarModel, Damage } from "src/app/models/car.model";
import { CarService } from "src/app/services/car.service";

@Component({
  selector: "app-cars",
  templateUrl: "./cars.component.html",
  styleUrls: ["./cars.component.css"],
})
export class CarsComponent implements OnInit, OnDestroy {
  constructor(private carService: CarService, private router: Router) {}

  carList: CarModel[] = [];
  subCar?: Subscription;
  damageEnum = Damage;
  subDeleteCar?: Subscription;
  id?: number;

  ngOnInit(): void {}

  getCars() {
    this.subCar = this.carService.getCars().subscribe({
      next: (cars: CarModel[]) => {
        this.carList = cars;
        console.log(cars);
      },
      error: (err) => console.log(err),
      complete: () => {
        console.log("Car request is done");
      },
    });
  }

  createCar() {
    this.router.navigate(["car-form"]);
  }

  editCar(id?: number) {
    this.router.navigate(["car-form", id]);
  }

  confirmDelete(id?: number) {
    if (confirm("Are you sure?")) {
      if (!id) {
        id = Number(prompt("Kérlek adj meg egy ID-t a törléshez!"));
      }
      this.subDeleteCar = this.carService.deleteCar(Number(id)).subscribe({
        complete: () => {
          console.log("Delete complete!");
          this.getCars();
        },
      });
    }
  }

  goToCarDetails(id?: number): void {
    this.router.navigate(["car-form", id]);
  }

  ngOnDestroy(): void {
    this.subCar?.unsubscribe();
    this.subDeleteCar?.unsubscribe();
  }
}
