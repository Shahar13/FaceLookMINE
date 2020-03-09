import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { FriendsService } from './friends.service';

fdescribe('FriendsService', () => {
  let service: FriendsService;
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FriendsService]
    });
    injector = getTestBed();
    service = injector.get(FriendsService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an Observable<User[]>', () => {
    const dummyUsers = [
      { login: 'John' },
      { login: 'Doe' }
    ];

   service.getAllfriends().subscribe((friends:any) => {
      expect(friends.length).toBe(2);
      expect(friends).toEqual(dummyUsers);
    });

    const req = httpMock.expectOne('http://localhost:3000/friends/getFriends');
    expect(req.request.method).toBe("GET");
    req.flush(dummyUsers);
  });
  

});

