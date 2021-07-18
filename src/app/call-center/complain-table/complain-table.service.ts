import { Complain, Information, INFORNATIONS, COMPLAINS } from './../customer-table/model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable, of } from 'rxjs';
import { tap, debounceTime, switchMap, delay, map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComplainComponent } from '../complain/complain.component';

interface SearchResult {
  complainRequests: Complain[];
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
export class ComplainTableService {

  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _complaintRequest$ = new BehaviorSubject<Complain[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 5,
    customerId: 0
  };

  constructor(private ngbModal: NgbModal) {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._complaintRequest$.next(result.complainRequests);
      this._total$.next(result.total);
    });
  }

  get complaintRequest$() { return this._complaintRequest$.asObservable(); }
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

    return this.getComplainRequestList(customerId).pipe(
      map(requests => {
        let totalData: number = requests.length;
        requests = requests.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
        return { complainRequests: requests, total: totalData }
      })
    );
  }

  getComplainRequestList(customerId: number) {
    return of(COMPLAINS).pipe(
      map(requests => {
        return requests.filter(request => request.customerId == customerId);
      })
    );
  }

  reload() {
    this._search$.next();
  }

  openModal(complain: Complain | null = null, customerId: number) {
    const modalRef = this.ngbModal.open(ComplainComponent, {
      backdrop: true,
      size: 'lg'
    });

    modalRef.componentInstance.complain = complain;
    modalRef.componentInstance.customerId = customerId;
    return modalRef.result;
  }
}
