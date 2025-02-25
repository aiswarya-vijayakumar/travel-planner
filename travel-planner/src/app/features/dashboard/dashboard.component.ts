import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { SearchComponent } from '../../shared/search/search.component';

@Component({
  selector: 'app-dashboard',
  imports: [HeaderComponent, SearchComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
