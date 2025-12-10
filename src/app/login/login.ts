import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputText } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-login',
  imports: [ButtonModule, DividerModule, InputText, PanelModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

}
