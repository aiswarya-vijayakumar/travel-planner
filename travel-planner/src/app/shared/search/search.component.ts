import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs';
import { Places } from '../../core/api.model';
import { ApiService } from '../../core/api.service';
import { CarouselComponent } from "../../features/dashboard/carousel/carousel/carousel.component";

@Component({
  selector: 'app-search',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatIconModule,
    NgIf,
    CarouselComponent,
    MatTabsModule
  ],

  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  searchControl = new FormControl();
  filteredOptions: string[] = [];
  showSearchResults: boolean = false;
  topPlaces: any = [];
  constructor(private apiService: ApiService) { }
  ngOnInit() {
    this.searchControl.valueChanges.pipe(
      debounceTime(500),               // Wait 500ms before making API call
      distinctUntilChanged(),          // Only proceed if the value changes
      switchMap(query => this.apiService.fetchPlaces(query)), // Call API
      tap(results => console.log(results)), // Debugging (optional)
      map(results => results.map((item: Places) => item['display_name'])) // Map results to display_name
    ).subscribe(filteredOptions => this.filteredOptions = filteredOptions);

  }

  search() {
    this.showSearchResults = true;
    this.apiService.getPhotos(this.searchControl.value).subscribe(result=>{
      this.topPlaces = result.results;
    })
  }
}
