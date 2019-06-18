import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProjetComponent } from './new-projet.component';

describe('NewProjetComponent', () => {
  let component: NewProjetComponent;
  let fixture: ComponentFixture<NewProjetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewProjetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
