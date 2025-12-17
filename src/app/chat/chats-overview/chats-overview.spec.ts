import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatsOverview } from './chats-overview';

describe('ChatsOverview', () => {
  let component: ChatsOverview;
  let fixture: ComponentFixture<ChatsOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatsOverview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatsOverview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
