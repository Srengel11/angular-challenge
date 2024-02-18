import {Injectable} from '@angular/core';
import {Movie} from "../models/movie";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() {
  }

  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string): any {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }


  deleteItem(key: string): void {
    localStorage.removeItem(key);
  }

  clearLocalStorage(): void {
    localStorage.clear();
  }

  getItemToStoredArray(key: string, itemId: string): any {
    const storedArray = this.getItem(key);
    let movie;
    storedArray.map((item: Movie) => {
      if (item.id === itemId) {
        movie = item;
      }
    });
    return movie;
  }

  setItemToStoredArray(key: string, item: any): void {
    const storedArray = this.getItem(key);
    storedArray.push(item);
    this.setItem(key, storedArray);
  }

  deleteItemToStoredArray(key: string, itemId: string): void {
    const storedArray = this.getItem(key);
    const updatedArray = storedArray.filter((item: { id: string; }) => item.id !== itemId);
    this.setItem(key, updatedArray);
  }


  updateItemToStoredArrayById(key: string, movie: Movie): void {
    const storedArray = this.getItem(key);
    const updatedArray = storedArray.map((item: { id: string; }) => {
      if (item.id === movie.id) {
        return {...item, ...movie};
      }
      return item;
    });
    this.setItem(key, updatedArray);
  }
}
