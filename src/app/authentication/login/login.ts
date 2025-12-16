import { Component, DestroyRef, inject, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputText } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationClient } from '../authentication-client';
import { Credentials } from '../../models/credentials';
import { email, Field, form, required } from '@angular/forms/signals';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [
    ButtonModule,
    DividerModule,
    InputText,
    PanelModule,
    FloatLabelModule,
    RouterModule,
    Field,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly authClient = inject(AuthenticationClient);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);

  private readonly credentials = signal<Credentials>({
    email: '',
    password: '',
  });

  loginForm = form(this.credentials, (r) => {
    email(r.email, { message: 'Please enter a valid email address.' });
    required(r.password);
  });

  onSubmit() {
    const value = this.loginForm().value();

    if (this.loginForm().valid()) {
      this.authClient
        .loginUser(value)
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          tap((res) => {
            console.log(res)
            if (res.token) {
              this.router.navigate(['/register']);
              localStorage.setItem('token', res.token)
            }
          })
        )
        .subscribe();
    }
  }
}
