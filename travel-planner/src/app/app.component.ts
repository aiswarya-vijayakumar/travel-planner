import { Component } from '@angular/core';
import { DashboardComponent } from "./features/dashboard/dashboard.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [DashboardComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
