import {Component, ViewChild} from '@angular/core';
import { ServiceCrud } from '../services/serviceCrud';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MovieAddEditComponent} from './movie-add-edit/movie-add-edit.component';
import {MatDialog} from '@angular/material/dialog';
import {Movie} from "../models/movie";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  displayedColumns: string[] = [
    'title',
    'year',
    'url',
    'action'
  ];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private serviceCrud: ServiceCrud,
              private _dialog: MatDialog,
  ) {
    this.serviceCrud.deleteMovies();
  }

  ngOnInit(): void {
    this.getMovies();
  }


  getMovies() {
    this.serviceCrud.getMoviesFromService().subscribe({
      next: (res: Movie[]) => {
        this.serviceCrud.setMovies("movies", res);
        this.getMoviesLocal();
      },
      error: console.log,
    });
  }

  getMoviesLocal(): void {
    const moviesLocal = this.serviceCrud.getMovies();
    this.dataSource = new MatTableDataSource(moviesLocal);
    this.dataSource.paginator = this.paginator;
  }


  deleteMovie(itemId: string) {
    const movie = this.serviceCrud.getMovie(itemId);
    this.serviceCrud.deleteMovie(movie);

    this.serviceCrud.openSnackBar('Pelicula eliminada!', 'Ok');
    this.getMoviesLocal();
  }

  openEditForm(data?: any) {
    const dialogRef = this._dialog.open(MovieAddEditComponent, {
      data
    });

    dialogRef.afterClosed().subscribe({
      next: () => {
        this.getMoviesLocal();
      },
    });
  }
}
