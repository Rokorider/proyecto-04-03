import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-api-data',
  imports: [],
  templateUrl: './api-data.component.html',
  styleUrl: './api-data.component.scss'
})
export class ApiDataComponent implements OnInit {
  @Input() apiUrl : string = '';
  data: any[] = [];
  loading: boolean = true;
  error: any;
  columns: string[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
      this.fetchData();
  }

  fetchData() :void {
    this.loading = true;
    this.apiService.getData(this.apiUrl).subscribe({
      next: (response) => {
        this.data = response;
        this.columns = Object.keys(this.data[0] || {});
        this.loading = false;
      },
      error: (err) => {
        this.error = err;
        this.loading = false;
      }
    });
  }
}
