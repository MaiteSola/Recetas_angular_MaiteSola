import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsContent } from './cards-content';

describe('CardsContent', () => {
  let component: CardsContent;
  let fixture: ComponentFixture<CardsContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardsContent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardsContent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
