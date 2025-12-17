import { Component, input } from '@angular/core';
import { ChatPreviewModel } from '../../models/chat-preview-model';
import { CardModule } from 'primeng/card'

@Component({
  selector: 'app-chat-preview',
  imports: [CardModule],
  templateUrl: './chat-preview.html',
  styleUrl: './chat-preview.css',
})
export class ChatPreview {
  readonly preview = input<ChatPreviewModel>();
}
