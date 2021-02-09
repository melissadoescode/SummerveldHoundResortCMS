import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoggoAlbumComponent } from './doggo-album.component';

describe('DoggoAlbumComponent', () => {
  let component: DoggoAlbumComponent;
  let fixture: ComponentFixture<DoggoAlbumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoggoAlbumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoggoAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
