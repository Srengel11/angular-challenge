// movie.class.ts
import {Movie} from "../models/movie";

export class MovieClass implements Movie {
  id: string;
  title: string;
  url: string;
  year: number;

  constructor(
    title: string,
    year: number,
    url: string,
  ) {
    this.id = this.generateRandomId();
    this.title = title;
    this.url = url;
    this.year = year;
  }


  private generateRandomId(): string {
    const alphanumericChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';

    for (let i = 0; i < 9; i++) {
      const randomIndex = Math.floor(Math.random() * alphanumericChars.length);
      randomString += alphanumericChars.charAt(randomIndex);
    }

    return randomString;
  }

}
