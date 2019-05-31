import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccountsComponent } from './create-accounts.component';

describe('CreateAccountsComponent', () => {
  let component: CreateAccountsComponent;
  let fixture: ComponentFixture<CreateAccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
