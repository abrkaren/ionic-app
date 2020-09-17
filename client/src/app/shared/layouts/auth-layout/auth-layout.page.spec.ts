import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AuthLayoutPage } from './auth-layout.page';

describe('AuthLayoutPage', () => {
  let component: AuthLayoutPage;
  let fixture: ComponentFixture<AuthLayoutPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthLayoutPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthLayoutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
