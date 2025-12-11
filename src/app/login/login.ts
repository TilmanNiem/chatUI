import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputText } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { FloatLabelModule } from 'primeng/floatlabel';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-login',
  imports: [ButtonModule, DividerModule, InputText, PanelModule, FloatLabelModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

}
