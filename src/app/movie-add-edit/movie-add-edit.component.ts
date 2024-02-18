import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ServiceCrud} from "../../services/serviceCrud";
import {MovieClass} from "../../class/movie";

@Component({
  selector: 'app-movie-add-edit',
  templateUrl: './movie-add-edit.component.html',
  styleUrls: ['./movie-add-edit.component.scss'],
})
export class MovieAddEditComponent implements OnInit {
  empForm: FormGroup;
  private urlPattern = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
  private anioPattern="[0-9]+" 

  constructor(
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<MovieAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private serviceCrud: ServiceCrud,
  ) {
    this.empForm = this._fb.group({
      title: ['', [Validators.required]],
      year: ['', [Validators.required, Validators.pattern(this.anioPattern)]],
      url: ['', [Validators.required, Validators.pattern(this.urlPattern)]]
    });
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this.updateMovie(this.empForm);
      } else {
        this.addMovie(this.empForm);
      }
    } else {
      this.serviceCrud.openSnackBar('Campos Requeridos!', 'Ok');
    }
  }

  get urlControl() {
    return this.empForm.get('url');
  }

  addMovie(empForm: FormGroup) {
    const title = empForm.get('title')?.value
    const year = empForm.get('year')?.value
    const url = empForm.get('url')?.value
    const movie = new MovieClass(title, year, url);
    this.serviceCrud.setMovie(movie);
    this.serviceCrud.openSnackBar('Pelicula Agregada!', 'Ok');
    this._dialogRef.close();
  }

  updateMovie(empForm: FormGroup) {
    const movie = this.serviceCrud.getMovie(this.data.id);
    movie.title = empForm.get('title')?.value;
    movie.year = empForm.get('year')?.value;
    movie.url = empForm.get('url')?.value;
    this.serviceCrud.updateMovie(movie);
    this.serviceCrud.openSnackBar('Datos Actualizados!', 'Ok');
    this._dialogRef.close();
  }
}
