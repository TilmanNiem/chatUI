import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Chats } from './chats';

describe('Chats', () => {
  let component: Chats;
  let fixture: ComponentFixture<Chats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Chats]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Chats);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
