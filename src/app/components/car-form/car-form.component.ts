import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { CarModel } from "src/app/models/car.model";
import { CarService } from "src/app/services/car.service";

@Component({
  selector: "app-car-form",
  templateUrl: "./car-form.component.html",
  styleUrls: ["./car-form.component.css"],
})
export class CarFormComponent implements OnInit, OnDestroy {
  carForm!: FormGroup;
  id?: number;
  car?: CarModel;
  subCar?: Subscription;
  subRoute?: Subscription;
  subSaveOrUpdate?: Subscription;

  constructor(
    private router: Router,
    private carService: CarService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.carForm = new FormGroup({
      brand: new FormControl("", [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(20),
      ]),
      model: new FormControl("", [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(20),
      ]),
      year: new FormControl("", [
        Validators.required,
        Validators.pattern(/^\d{4}$/),
      ]),
      country: new FormControl("", [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(20),
      ]),
      damage: new FormControl("", [
        Validators.required,
        Validators.pattern(/^[01]$/),
      ]),
      color: new FormControl("", [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(20),
      ]),
    });

    this.subRoute = this.activatedRoute.paramMap.subscribe((params) => {
      let readParam = params.get("id");
      if (readParam) {
        this.id = Number(readParam);
        this.subCar = this.carService.getCar(this.id).subscribe({
          next: (car: CarModel) => {
            this.car = car;
            this.carForm.patchValue(car);
          },
        });
      }
    });
  }

  get brand() {
    return this.carForm.get("brand");
  }

  get model() {
    return this.carForm.get("model");
  }

  get year() {
    return this.carForm.get("year");
  }

  get country() {
    return this.carForm.get("country");
  }

  get damage() {
    return this.carForm.get("damage");
  }
  get color() {
    return this.carForm.get("color");
  }

  saveCar() {
    if (!this.carForm.valid) {
      console.log("Not valid car");
      return;
    }
    const carToSave = this.carForm.value;
    const saveOrUpdate$ = this.id
      ? this.carService.updateCar({ ...carToSave, id: this.car?.id })
      : this.carService.saveCar(carToSave);

    this.subSaveOrUpdate = saveOrUpdate$.subscribe({
      next: (car: CarModel) => {
        console.log(car);
        this.carForm.reset();
        this.router.navigate(["cars"]);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log("Save car done");
      },
    });
  }

  ngOnDestroy(): void {
    this.subCar?.unsubscribe();
    this.subRoute?.unsubscribe();
    this.subSaveOrUpdate?.unsubscribe();
  }
}
