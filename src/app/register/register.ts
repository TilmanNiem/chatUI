import { Component, linkedSignal, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputText } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { FloatLabelModule } from 'primeng/floatlabel';
import { RouterLink } from "@angular/router";
import { email, form, required, submit, Field } from '@angular/forms/signals';
import { Registration } from '../models/registration';

@Component({
  selector: 'app-register',
  imports: [ButtonModule, DividerModule, InputText, PanelModule, FloatLabelModule, RouterLink, Field],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  private readonly registration = signal<Registration>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  
  registrationForm = form(this.registration, (r) => {
    required(r.firstName);
    required(r.lastName);
    email(r.email, {message: 'Email is required'});
    required(r.password);

  });

  onSubmit() {
    const value = this.registrationForm().value();
    console.log('Registration submitted:', value);
  }


}
