import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FragranceDetail } from './fragrance-detail';

describe('FragranceDetail', () => {
  let component: FragranceDetail;
  let fixture: ComponentFixture<FragranceDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FragranceDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FragranceDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
