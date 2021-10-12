import { Injectable, Injector } from "@angular/core";
import {
    HttpEvent, HttpInterceptor, HttpHandler,
    HttpRequest, HttpErrorResponse
} from "@angular/common/http";
import { throwError, Observable, BehaviorSubject } from "rxjs";
import { catchError, filter, take, switchMap, finalize } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { UserSessionService } from '../services/user-session/user-session.service';

@Injectable({
    providedIn: 'root'
})
export class AuthorizeInterceptor implements HttpInterceptor {

    private userSessionService: UserSessionService;
    private AUTH_HEADER = "Authorization";
    private refreshTokenInProgress = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(private injector: Injector) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.userSessionService = this.injector.get(UserSessionService);

        if (req.url === environment.checkIpApiEndpoint)
            return next.handle(req);

        req = this.addAuthenticationToken(req);

        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error && error.status === 401) {
                    if (this.refreshTokenInProgress) {
                        return this.refreshTokenSubject.pipe(
                            filter(result => {
                                return result !== null
                            }),
                            take(1),
                            switchMap(() => next.handle(this.addAuthenticationToken(req)))
                        );
                    } 
                    else {
                        this.refreshTokenInProgress = true;
                        this.refreshTokenSubject.next(null);
                        return this.refreshAccessToken().pipe(
                            switchMap((response) => {
                                this.refreshTokenSubject.next(response);
                                return next.handle(this.addAuthenticationToken(req));
                            }),
                            catchError((error: HttpErrorResponse) => {
                                return throwError(error);
                            }),
                            finalize(() => {
                                this.refreshTokenInProgress = false
                            })
                        );
                    }
                }
                else {
                    return throwError(error);
                }
            })
        );
    }

    private refreshAccessToken(): Observable<any> {
        return this.userSessionService.refreshProfile();
    }

    private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
        if (this.userSessionService.AuthorizationHeader)
            return request.clone({
                headers: request.headers.set(this.AUTH_HEADER, this.userSessionService.AuthorizationHeader)
            });
        return request;
    }
}
