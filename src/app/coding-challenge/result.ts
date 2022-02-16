/**
 * @author ALEXANDRE GIMENEZ (cookingstartupsCOM@gmail.com)
 * ! FILE MODIFIED FOR THE CODING CHALLENGE
 * NOTE: The API Endpoints does not seem to return a successful response, but the implementation
 * from a FrontEnd perspective it's correct and has hard-typing everywhere
 * TODO: - the dashboard id is not being added to the final Url when requesting widget for certain dashboard
 */

import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { catchError, debounceTime, takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

/* API responses MODELS */
export interface Dashboard {}
export interface DashboardWidget {}
export interface Datasource {}
export interface DatasourceTable {}

const REQ_DEBOUNCE_TIME = 800;

// Error handler function
// const handleApiRequestError = (err: Error) => {
//   console.error(err);
// };

@Injectable({ providedIn: 'root' })
export abstract class BaseService<T, R> {
  // This properties helps to build dynamically the finalUrl
  protected apiResource: string = '';
  protected childResource: string = '';

  constructor(private http: HttpClient) {}

  get finalUrl(): string {
    let url: string = `${environment.baseAPIURL}/${this.apiResource}/api/${this.apiResource}s`;
    if (this.childResource && this.childResource.length > 0)
      url += `/${this.childResource}`;
    return url;
  }

  getAllEntries(): Observable<T[]> {
    console.log(`Retrieving all resources from ${this.finalUrl}`);
    return this.http.get<T[]>(this.finalUrl);
  }

  getEntryById(id: R): Observable<T> {
    console.log(
      `Retrieving resource by Id from ${this.finalUrl}/${id}`,
      'The type of the id is',
      typeof id
    );
    return this.http.get<T>(this.finalUrl + '/' + id);
  }
}

@Injectable({ providedIn: 'root' })
export class DashboardService extends BaseService<Dashboard, string> {
  override apiResource: string = 'dashboard';

  constructor(http: HttpClient) {
    super(http);
  }
}

@Injectable({ providedIn: 'root' })
export class DashboardWidgetService extends BaseService<
  DashboardWidget,
  string
> {
  override apiResource: string = 'dashboard';
  override childResource: string = 'widgets'; // nested resource

  constructor(http: HttpClient) {
    super(http);
  }
}

@Injectable({ providedIn: 'root' })
export class DatasourceService extends BaseService<Datasource, number> {
  override apiResource: string = 'datasource';

  constructor(http: HttpClient) {
    super(http);
  }
}

@Injectable({ providedIn: 'root' })
export class DatasourceTableService extends BaseService<
  DatasourceTable,
  number
> {
  override apiResource: string = 'datasource';
  override childResource: string = 'tables'; // nested resource

  constructor(http: HttpClient) {
    super(http);
  }
}

@Component({
  selector: 'app-url-test',
  template: ``,
})
export class UrlTestComponent implements OnInit, OnDestroy {
  private destroyed$: Subject<void> = new Subject();

  constructor(
    private dashboardService: DashboardService,
    private dashboardWidgetService: DashboardWidgetService,
    private datasourceService: DatasourceService,
    private datasourceTableService: DatasourceTableService
  ) {}

  ngOnInit(): void {
    console.log('Calling all the methods for demo purposes');
    this.getAllDashboards();
    this.getDashboardById('dashboard-id-here');
    this.getAllDashboardWidgets();
    this.getDashboardWidgetById('dashboard_widget-id-here');
    this.getAllDatasources();
    this.getDatasourcesById(11);
    this.getAllDatasourceTables();
    this.getDatasourceTableById(22);
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  getAllDashboards(): void {
    const allDashboards$ = this.dashboardService.getAllEntries().pipe(
      // It unsubscribes automatically If the component gets destroyed (to avoid memory leaks)
      takeUntil(this.destroyed$),
      // Avoid subsequent request if they are made within the debounce time specified
      debounceTime(REQ_DEBOUNCE_TIME)
    );

    allDashboards$.subscribe(
      //.picatchError(x, err =>{} )) Success
      (dashboards: Dashboard[]) => {
        console.log('[getAllDashboards]', dashboards);
      }
    );
  }

  getDashboardById(id: string): void {
    const item$ = this.dashboardService.getEntryById(id).pipe(
      // It unsubscribes automatically If the component gets destroyed (to avoid memory leaks)
      takeUntil(this.destroyed$),
      // Avoid subsequent request if they are made within the debounce time specified
      debounceTime(REQ_DEBOUNCE_TIME)
    );

    item$.subscribe(
      //.picatchError(x, err =>{} )) Success
      (item: Dashboard) => {
        console.log('[getDashboardById]', item);
      }
    );
  }

  getAllDashboardWidgets(): void {
    const allWidgets$ = this.dashboardWidgetService.getAllEntries().pipe(
      // It unsubscribes automatically If the component gets destroyed (to avoid memory leaks)
      takeUntil(this.destroyed$),
      // Avoid subsequent request if they are made within the debounce time specified
      debounceTime(REQ_DEBOUNCE_TIME)
    );

    allWidgets$.subscribe(
      //.picatchError(x, err =>{} )) Success
      (widgets: DashboardWidget[]) => {
        console.log('[getAllDashboardWidgets]', widgets);
      }
    );
  }

  getDashboardWidgetById(id: string): void {
    const item$ = this.dashboardWidgetService.getEntryById(id).pipe(
      // It unsubscribes automatically If the component gets destroyed (to avoid memory leaks)
      takeUntil(this.destroyed$),
      // Avoid subsequent request if they are made within the debounce time specified
      debounceTime(REQ_DEBOUNCE_TIME)
    );

    item$.subscribe(
      //.picatchError(x, err =>{} )) Success
      (item: DashboardWidget) => {
        console.log('[getDashboardWidgetById]', item);
      }
    );
  }

  getAllDatasources(): void {
    const allDatasources$ = this.datasourceService.getAllEntries().pipe(
      // It unsubscribes automatically If the component gets destroyed (to avoid memory leaks)
      takeUntil(this.destroyed$),
      // Avoid subsequent request if they are made within the debounce time specified
      debounceTime(REQ_DEBOUNCE_TIME)
      /*
      .pipe(
        catchError((err, caught) => {
          handleApiRequestError(err);
          return caught;
        })
      )
      */
    );

    allDatasources$.subscribe(
      // Success
      (datasources: DashboardWidget[]) => {
        console.log('[getAllDatasources]', datasources);
      }
    );
  }

  getDatasourcesById(id: number): void {
    const item$ = this.datasourceService.getEntryById(id).pipe(
      // It unsubscribes automatically If the component gets destroyed (to avoid memory leaks)
      takeUntil(this.destroyed$),
      // Avoid subsequent request if they are made within the debounce time specified
      debounceTime(REQ_DEBOUNCE_TIME)
      /*
      .pipe(
        catchError((err, caught) => {
          handleApiRequestError(err);
          return caught;
        })
      )
      */
    );

    item$.subscribe(
      // Success
      (item: Datasource) => {
        console.log('[getDatasourcesById]', item);
      }
    );
  }

  getAllDatasourceTables() {
    const allDatasourceTables$ = this.datasourceTableService
      .getAllEntries()
      .pipe(
        // It unsubscribes automatically If the component gets destroyed (to avoid memory leaks)
        takeUntil(this.destroyed$),
        // Avoid subsequent request if they are made within the debounce time specified
        debounceTime(REQ_DEBOUNCE_TIME)
        /*
        .pipe(
        catchError((err, caught) => {
          handleApiRequestError(err);
          return caught;
        })
      )
      */
      );

    allDatasourceTables$.subscribe(
      // Success
      (dsTables: DashboardWidget[]) => {
        console.log('[getAllDatasources]', dsTables);
      }
    );
  }

  getDatasourceTableById(id: number) {
    const item$ = this.datasourceTableService.getEntryById(id).pipe(
      // It unsubscribes automatically If the component gets destroyed (to avoid memory leaks)
      takeUntil(this.destroyed$),
      // Avoid subsequent request if they are made within the debounce time specified
      debounceTime(REQ_DEBOUNCE_TIME)
      /*
      .pipe(
        catchError((err, caught) => {
          handleApiRequestError(err);
          return caught;
        })
      )
      */
    );

    item$.subscribe(
      // Success
      (item: DatasourceTable) => {
        console.log('[getDatasourceTableById]', item);
      }
    );
  }
}
