import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatPreviewField } from './chat-preview-field';

describe('ChatPreviewField', () => {
  let component: ChatPreviewField;
  let fixture: ComponentFixture<ChatPreviewField>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatPreviewField]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatPreviewField);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
