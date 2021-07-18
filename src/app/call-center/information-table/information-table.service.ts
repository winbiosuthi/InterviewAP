import { INFORNATIONS, Information } from '../customer-table/model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, map, switchMap, tap } from 'rxjs/operators';

interface SearchResult {
  informationRequest: Information[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  customerId: number;
}

@Injectable({
  providedIn: 'root'
})
export class InformationTableService {

  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _informationRequest$ = new BehaviorSubject<Information[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 5,
    customerId: 0
  };

  constructor() {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._informationRequest$.next(result.informationRequest);
      this._total$.next(result.total);
    });
  }

  get customerRequest$() { return this._informationRequest$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get customerId() { return this._state.customerId; }

  set page(page: number) { this._set({ page }); }
  set customerId(customerId: number) { this._set({ customerId }); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const { pageSize, page, customerId } = this._state;

    return this.getInformationRequestList(customerId).pipe(
      map(requests => {
        let totalData: number = requests.length;
        requests = requests.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
        return { informationRequest: requests, total: totalData }
      })
    );
  }

  getInformationRequestList(customerId: number) {
    return of(INFORNATIONS).pipe(
      map(requests => {
        return requests.filter(request => request.customerId == customerId);
      })
    );
  }
}
