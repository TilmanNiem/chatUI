import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputText } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-register',
  imports: [ButtonModule, DividerModule, InputText, PanelModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

}
