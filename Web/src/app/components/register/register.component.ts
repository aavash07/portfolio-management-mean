import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { plainToClass } from 'class-transformer';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ConfirmPasswordValidator } from 'src/app/auth/validators/confirm-password.validator';
import { User } from 'src/app/Shared/models/user.model';
import { subscribedContainerMixin } from 'src/app/Shared/subscribedContainer.mixin';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent
  extends subscribedContainerMixin()
  implements OnInit
{
  public registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastrService: ToastrService
  ) {
    super();
    this.registerForm = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      },
      {
        validator: ConfirmPasswordValidator.passwordMatchValidator,
      }
    );
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  register(): void {
    if (this.registerForm.valid) {
      const user = {
        name: this.registerForm.value.name,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
      };
      const mapperUser = plainToClass(User, user);
      this.authService
        .register(mapperUser)
        .pipe(takeUntil(this.destroyed$))
        .subscribe((res) => {
          if (res && res.data) {
            this.toastrService.success(
              'User Registered Successfully',
              'Please login again'
            );
            this.router.navigate(['login']);
          }
        });
    }
  }

  gotToLogin(): void {
    this.router.navigate(['login']);
  }

  public getEmailErrorMsg(): string {
    if (this.registerForm.controls.email.errors.required) {
      return 'Email is required.';
    } else {
      return 'Email must be a valid email address.';
    }
  }

  public getPasswordErrorMsg(): string {
    if (this.registerForm.controls.password.errors.required) {
      return 'Password is required.  ';
    } else {
      return 'Password must be longer than 7 characters.';
    }
  }

  public getFullNameErrorMsg(): string {
    if (this.registerForm.controls.name.errors.required) {
      return 'Name is required.';
    } else {
      return '';
    }
  }
}
