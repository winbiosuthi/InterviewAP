import { Complain, COMPLAINS, Repairing, REPAIRINGS } from './../customer-table/model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable, of } from 'rxjs';
import { tap, debounceTime, switchMap, delay, map } from 'rxjs/operators';

interface SearchResult {
  repairRequests: Repairing[];
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
export class RepairTableService {

  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _repairRequest$ = new BehaviorSubject<Repairing[]>([]);
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
      this._repairRequest$.next(result.repairRequests);
      this._total$.next(result.total);
    });
  }

  get repairRequest$() { return this._repairRequest$.asObservable(); }
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

    return this.getRepairRequestList(customerId).pipe(
      map(requests => {
        let totalData: number = requests.length;
        requests = requests.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
        return { repairRequests: requests, total: totalData }
      })
    );
  }

  getRepairRequestList(customerId: number) {
    return of(REPAIRINGS).pipe(
      map(requests => {
        return requests.filter(request => request.customerId == customerId);
      })
    );
  }
}
