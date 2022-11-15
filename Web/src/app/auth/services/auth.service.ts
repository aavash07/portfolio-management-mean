import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from 'src/app/Shared/models/api-response.model';
import { Observable } from 'rxjs';
import { User } from 'src/app/Shared/models/user.model';
import { ToastrService } from 'ngx-toastr';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.apiURL;
  invitationUrl = environment.apiURL + '/invitations/accept';

  constructor(
    private http: HttpClient,
    private toastrService: ToastrService,
    private jwtHelperService: JwtHelperService
  ) {}

  login(user: User): Observable<ApiResponse<any>> {
    return this.http
      .post<ApiResponse<any>>(this.baseUrl + '/auth/login', { user })
      .pipe(
        tap((res: ApiResponse<any>) =>
          localStorage.setItem('access_token', res.data.token)
        ),
        tap(() =>
          this.toastrService.success('Logged in successfully', 'Login success')
        )
      );
  }

  getLoggedInUser() {
    const decodedToken = this.jwtHelperService.decodeToken();
    return decodedToken.user;
  }
}
