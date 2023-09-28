import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { map, debounceTime } from 'rxjs/operators';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  search = new FormControl();
  results: any[] = [];

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.search.valueChanges
    .pipe(
      debounceTime(300)
    )
    .subscribe(value => {
      this.getData(value)
    });
  }

  private getData(query: string) {
    const API = '1mXcbwB4RDhQopBMazIj9cx9iKLY1BH8';
    this.http.get(`https://api.giphy.com/v1/gifs/search?q=${query}&api_key=${API}&limit=12`)
    .pipe(
      map((response: any) => {
        return response.data.map(e => e.images.downsized);
      })
    )
    .subscribe(data => {
      console.log(data);
      this.results = data;
    });
  }
}
