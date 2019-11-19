import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishBattleComponent } from './finish-battle.component';

describe('FinishBattleComponent', () => {
  let component: FinishBattleComponent;
  let fixture: ComponentFixture<FinishBattleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinishBattleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishBattleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
