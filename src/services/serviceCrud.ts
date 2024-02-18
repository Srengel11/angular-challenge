import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, map} from 'rxjs';
import {Movie} from "../models/movie";
import {MovieClass} from "../class/movie";
import {LocalStorageService} from "./local-storage.service";
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ServiceCrud {

  constructor(private http: HttpClient,
              private localStorageService: LocalStorageService,
              private snackBar: MatSnackBar) {
  }

  getMoviesFromService(): Observable<Movie[]> {
    const endpoint: string = 'https://moviesdatabase.p.rapidapi.com/titles?page=1';
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'c96b4dd76fmsh7dd3e404f547d2cp17968fjsnac33d59fd03b',
        'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
      }
    };
    return this.http.get<any>(endpoint, options).pipe(
      map((response: any) =>
        response["results"].map((item: {
          id: any;
          primaryImage: { url: any; };
          titleText: { text: any; };
          releaseYear: { year: any; };
        }) => ({
          id: item.id,
          url: item.primaryImage?.url== null ? 'https://fastly.picsum.photos/id/385/200/300.jpg?hmac=IG8cHDliDmlgbSYX1yquX_5cAHcuS_O378oPs5rZGrU': item.primaryImage?.url,
          title: item.titleText?.text,
          year: item.releaseYear?.year,
        }))
      )
    )
  }

  getMovies(key: string = "movies"): Movie[] {
    return this.localStorageService.getItem(key);
  }

  setMovies(key: string = "movies", movie: any): void {
    this.localStorageService.setItem(key, movie);
  }

  deleteMovies(key: string = "movies"): void {
    this.localStorageService.deleteItem(key);
  }

  getMovie(itemId: string, key: string = "movies"): Movie {
    return this.localStorageService.getItemToStoredArray(key, itemId);
  }

  setMovie(movie: MovieClass, key: string = "movies"): void {
    this.localStorageService.setItemToStoredArray(key, movie);
  }

  deleteMovie(movie: Movie, key: string = "movies"): void {
    const itemId: string = movie.id;
    this.localStorageService.deleteItemToStoredArray(key, itemId);
  }

  updateMovie(movie: Movie, key: string = "movies"): void {
    this.localStorageService.updateItemToStoredArrayById(key, movie);
  }

  openSnackBar(message: string, action: string = 'ok') {
    this.snackBar.open(message, action, {
      duration: 1000,
      verticalPosition: 'top',
    });
  }

}
