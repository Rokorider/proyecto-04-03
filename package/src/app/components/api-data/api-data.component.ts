import { Component } from '@angular/core';

@Component({
  selector: 'app-api-data',
  imports: [],  // Este campo no se necesita en versiones recientes de Angular
  templateUrl: './api-data.component.html',
  styleUrls: ['./api-data.component.scss']  // Cambié styleUrl a styleUrls
})
export class ApiDataComponent {
  loading = false;
  error = null;
  data = [];
  columns = ['column1', 'column2', 'column3'];  // Aquí defines las columnas para la tabla
}

