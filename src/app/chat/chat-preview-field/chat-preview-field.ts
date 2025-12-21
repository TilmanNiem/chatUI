import { Component, input } from '@angular/core';
import { ChatPreview } from '../models/chat-models';
import { CardModule } from 'primeng/card'
import {Avatar} from 'primeng/avatar';

@Component({
  selector: 'app-chat-preview-field',
  imports: [CardModule, Avatar],
  templateUrl: './chat-preview-field.html',
  styleUrl: './chat-preview-field.css',
})
export class ChatPreviewField {
  readonly preview = input<ChatPreview>();
}
