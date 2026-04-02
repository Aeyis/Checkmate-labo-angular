import { Component, input } from '@angular/core';

@Component({
  selector: 'app-message-display',
  imports: [],
  templateUrl: './message-display.html',
  styleUrl: './message-display.css',
})
export class MessageDisplay {
  error = input<string>('');
  success = input<string>('');
}