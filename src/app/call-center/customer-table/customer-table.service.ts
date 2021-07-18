import { Injectable, PipeTransform } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, filter, map, switchMap, tap } from 'rxjs/operators';
import { Customer, CUSTOMERS } from './model';

interface SearchResult {
  customers: Customer[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
}

@Injectable({
  providedIn: 'root'
})
export class CustomerTableService {

  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _customer$ = new BehaviorSubject<Customer[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 5,
    searchTerm: ''
  };

  constructor() {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._customer$.next(result.customers);
      this._total$.next(result.total);
    });
  }

  get customer$() { return this._customer$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({ page }); }
  set searchTerm(searchTerm: string) { this._set({ searchTerm }); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const { pageSize, page, searchTerm } = this._state;

    return this.getCustomerList(searchTerm).pipe(
      map(customers => {
        let totalData: number = customers.length;
        customers = customers.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
        return { customers: customers, total: totalData }
      })
    );
  }

  getCustomerList(searchTerm: string) {
    return of(CUSTOMERS).pipe(
      map(customers => {
        return customers.filter(customer => searchTerm ? this.matches(customer, searchTerm) : false);
      })
    );
  }

  private matches(customer: Customer, term: string) {
    return customer.firstName.toLowerCase().includes(term.toLowerCase())
      || customer.lastName.toLowerCase().includes(term.toLowerCase())
      || customer.phoneNumber.toLowerCase().includes(term.toLowerCase())
  }
}

