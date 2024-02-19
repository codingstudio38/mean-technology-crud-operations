import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildFnConComponent } from './child-fn-con.component';

describe('ChildFnConComponent', () => {
  let component: ChildFnConComponent;
  let fixture: ComponentFixture<ChildFnConComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildFnConComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildFnConComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
