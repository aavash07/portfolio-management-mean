import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { plainToClass } from 'class-transformer';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/Shared/models/user.model';
import { subscribedContainerMixin } from 'src/app/Shared/subscribedContainer.mixin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent
  extends subscribedContainerMixin()
  implements OnInit
{
  public loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    super();
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()){
      this.router.navigate(['/']);
    }
  }

  login(): void {
    if (this.loginForm.valid) {
      const user = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };
      const mapperUser = plainToClass(User, user);
      this.authService
        .login(mapperUser)
        .pipe(takeUntil(this.destroyed$))
        .subscribe((res) => {
          if (res && res.data.token) {
            this.router.navigate(['home']);
          }
        });
    }
  }

  gotToRegister(): void {
    this.router.navigate(['register']);
  }
}
