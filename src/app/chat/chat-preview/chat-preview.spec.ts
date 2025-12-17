import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatPreview } from './chat-preview';

describe('ChatPreview', () => {
  let component: ChatPreview;
  let fixture: ComponentFixture<ChatPreview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatPreview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatPreview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
