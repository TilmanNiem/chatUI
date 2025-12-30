import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatCreateDialog } from './chat-create-dialog';

describe('ChatCreateDialog', () => {
  let component: ChatCreateDialog;
  let fixture: ComponentFixture<ChatCreateDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatCreateDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatCreateDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
