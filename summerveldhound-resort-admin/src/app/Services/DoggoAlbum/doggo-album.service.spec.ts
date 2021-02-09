import { TestBed } from '@angular/core/testing';

import { DoggoAlbumService } from './doggo-album.service';

describe('DoggoAlbumService', () => {
  let service: DoggoAlbumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoggoAlbumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
