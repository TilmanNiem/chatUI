import { Component, DestroyRef, inject, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputText } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationClient } from '../authentication-client';
import { LoginCredentials } from '../models/user_models';
import { Field, form, required } from '@angular/forms/signals';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import {ChatStore} from '../../chat/chat-store';

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
  private readonly chatStore = inject(ChatStore);

  private readonly credentials = signal<LoginCredentials>({
    username: '',
    password: '',
  });

  loginForm = form(this.credentials, (r) => {
    required(r.username);
    required(r.password);
  });

  onSubmit(): void {
    const value = this.loginForm().value();

    if (this.loginForm().valid()) {
      this.authClient
        .loginUser(value)
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          tap((res) => {
            console.log(res)
            if (res.token) {
              localStorage.setItem('token', res.token)
              this.chatStore.setUserId(res.id)
              this.router.navigate(['/chat']);
            }
          })
        )
        .subscribe();
    }
  }
}
