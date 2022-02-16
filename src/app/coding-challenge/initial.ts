import {Component, Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

// [OUR DOMAIN]/dashboard/api/dashboards
// [OUR DOMAIN]/dashboard/api/dashboards/{id: string}

// [OUR DOMAIN]/dashboard/api/dashboards/{id: string}/widgets
// [OUR DOMAIN]/dashboard/api/dashboards/{id: string}/widgets/{id: string}


// [OUR DOMAIN]/datasource/api/datasources
// [OUR DOMAIN]/datasource/api/datasources/{id: number}

// [OUR DOMAIN]/datasource/api/datasources/{id: number}/tables
// [OUR DOMAIN]/datasource/api/datasources/{id: number}/tables/{id: number}


@Injectable({
  providedIn: 'root'
})
export class BaseService {


  constructor(private http: HttpClient) {

  }

  get finalUrl(): string {
    return '';
  }

  getAllEntries() {
    return this.http.get(this.finalUrl);
  }

  getEntryById(id) {
    return this.http.get(this.finalUrl + '/' + id);
  }

}

@Injectable({
  providedIn: 'root'
})
export class DashboardService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

}

@Injectable({
  providedIn: 'root'
})
export class DashboardWidgetService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }
}

@Injectable({
  providedIn: 'root'
})
export class DatasourceService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }
}

@Injectable({
  providedIn: 'root'
})
export class DatasourceTableService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }
}


@Component({
  selector: 'app-url-text',
  template: ``
})
export class UrlTestComponent implements OnInit {

  constructor(private dashboardService: DashboardService,
              private dashboardWidgetService: DashboardWidgetService,
              private datasourceService: DatasourceService,
              private datasourceTableService: DatasourceTableService) {
  }

  ngOnInit(): void {

  }

  getAllDashoards() {
    this.dashboardService.getAllEntries().subscribe();
  }

  getDashboardById(id: any) { // please fix any
    this.dashboardService.getEntryById(id).subscribe();
  }

  getAllDashoardWidgets() {

  }

  getDashoardWidgetById(id: any) { // please fix any

  }

  getAllDatasources() {

  }

  getDatasourcesById(id: any) { // please fix any

  }

  getAllDatasourceTables() {

  }

  getDatasourceTableById(id: any) { // please fix any

  }

}