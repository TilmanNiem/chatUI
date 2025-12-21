import { Component, input } from '@angular/core';
import { ChatPreview } from '../models/chat-models';
import { CardModule } from 'primeng/card'

@Component({
  selector: 'app-chat-preview-field',
  imports: [CardModule],
  templateUrl: './chat-preview-field.html',
  styleUrl: './chat-preview-field.css',
})
export class ChatPreviewField {
  readonly preview = input<ChatPreview>();
}
