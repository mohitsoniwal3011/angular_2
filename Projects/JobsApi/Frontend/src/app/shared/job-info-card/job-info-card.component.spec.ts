import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobInfoCardComponent } from './job-info-card.component';

describe('JobInfoCardComponent', () => {
  let component: JobInfoCardComponent;
  let fixture: ComponentFixture<JobInfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobInfoCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
