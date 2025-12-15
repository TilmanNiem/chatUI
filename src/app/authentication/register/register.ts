import { Component, DestroyRef, inject, linkedSignal, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputText } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { FloatLabelModule } from 'primeng/floatlabel';
import { RouterModule } from '@angular/router';
import { email, form, required, Field, minLength } from '@angular/forms/signals';
import { Registration } from '../../models/registration';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthenticationClient } from '../authentication-client';

@Component({
  selector: 'app-register',
  imports: [
    ButtonModule,
    DividerModule,
    InputText,
    PanelModule,
    FloatLabelModule,
    RouterModule,
    Field,
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private readonly authClient = inject(AuthenticationClient);
  private readonly destroyRef = inject(DestroyRef);

  private readonly registration = signal<Registration>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  registrationForm = form(this.registration, (r) => {
    required(r.firstName);
    required(r.lastName);
    email(r.email, { message: 'Please enter a valid email address.' });
    required(r.password);

    minLength(r.password, 6, { message: 'Password must be at least 6 characters long.' });
    minLength(r.firstName, 1, { message: 'First name is required.' });
    minLength(r.lastName, 1, { message: 'Last name is required.' });
  });

  onSubmit() {
    const value = this.registrationForm().value();

    if (this.registrationForm().valid()) {
      this.authClient.registerUser(value).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
    }
  }
}
