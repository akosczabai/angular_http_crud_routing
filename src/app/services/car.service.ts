import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CarModel } from "../models/car.model";

@Injectable({
  providedIn: "root",
})
export class CarService {
  private readonly CAR_URL: string = "http://localhost:3000/cars";

  constructor(private http: HttpClient) {}

  getCars(): Observable<CarModel[]> {
    return this.http.get<CarModel[]>(this.CAR_URL);
  }

  getCar(id: number): Observable<CarModel> {
    return this.http.get<CarModel>(`${this.CAR_URL}/${id}`);
  }

  saveCar(car: CarModel): Observable<CarModel> {
    return this.http.post<CarModel>(this.CAR_URL, car);
  }

  updateCar(car: CarModel): Observable<CarModel> {
    return this.http.put<CarModel>(`${this.CAR_URL}/${car.id}`, car);
  }

  deleteCar(id: number): Observable<Object> {
    return this.http.delete<Object>(`${this.CAR_URL}/${id}`);
  }
}
