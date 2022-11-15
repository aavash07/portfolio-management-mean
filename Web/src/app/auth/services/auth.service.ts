import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from 'src/app/Shared/models/api-response.model';
import { Observable } from 'rxjs';
import { User } from 'src/app/Shared/models/user.model';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = `${environment.apiURL}/users`;

  constructor(private http: HttpClient, private toastrService: ToastrService) {}

  login(user: User): Observable<ApiResponse<any>> {
    return this.http
      .post<ApiResponse<any>>(this.baseUrl + '/login', { user })
      .pipe(
        tap((res: ApiResponse<any>) =>
          localStorage.setItem('access_token', res.data.token)
        ),
        tap(() =>
          this.toastrService.success('Logged in successfully', 'Login success')
        )
      );
  }

  public isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }
}
