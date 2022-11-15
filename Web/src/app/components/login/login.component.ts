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
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends subscribedContainerMixin() implements OnInit {

  public loginForm: FormGroup;

  constructor(private authService: AuthService,private formBuilder: FormBuilder,private router: Router) {
    super();
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  login(): void {
    if (this.loginForm.valid){
      const user = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      }
      const mapperUser = plainToClass(User,user);
      this.authService.login(user).pipe(takeUntil(this.destroyed$))
      .subscribe((res)=>{
        this.router.navigate(['home']);
      })
    }
  }


}
