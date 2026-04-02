import { Component, input } from '@angular/core';

@Component({
  selector: 'app-form-card',
  imports: [],
  templateUrl: './form-card.html',
  styleUrl: './form-card.css',
})
export class FormCard {
  title = input.required<string>();
}