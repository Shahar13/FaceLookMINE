import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UsersService } from './users.service';

fdescribe('UsersService', () => {
  let service: UsersService;
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersService]
    });
    injector = getTestBed();
    service = injector.get(UsersService);
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

   service.getAllUsers().subscribe((users:any) => {
      expect(users.length).toBe(2);
      expect(users).toEqual(dummyUsers);
    });

    const req = httpMock.expectOne('http://localhost:3000/users/getUsers');
    expect(req.request.method).toBe("GET");
    req.flush(dummyUsers);
  });
  

});

