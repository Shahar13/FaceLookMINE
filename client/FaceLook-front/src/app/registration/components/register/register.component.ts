import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm, NgModel } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { registrationApiService } from "../../service/api-service.service";
import { UserService } from "../../models/user-service.service";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  urlTemp = null;
  uploadedFile: File = null;
  isRegisered = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: registrationApiService,
    public userService: UserService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.userService.resetData();
  }

  register() {
    ///////////////////////////////////////////////////////////////////
    // data is collected DRECTLY FROM FOM IN THE HTML 
    // only this.uploadedFile is taken by the onSelectFile function
    ///////////////////////////////////////////////////////////////////
    const formData: FormData = new FormData();

    formData.append('userPicture', this.uploadedFile);
    //collection of ALL other fields BUT the uploaded file field.
    formData.append('name', this.userService.userData.name);
    formData.append('email', this.userService.userData.email);
    formData.append('password', this.userService.userData.password);
    
    //api call
    this.api.register(formData).subscribe(
      res => {
        //give client message
        this.toastr.success(res["message"], "Success");
        this.isRegisered = true;
      },
      error => {
        this.toastr.error(error.error.message, "Error in register");
      }
    )
  }

  //stand alone routine - user selects a file, it will be shown in the form
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      // change image preview in the fork
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event: any) => {
        this.urlTemp = event.target.result;
      };

      this.uploadedFile = <File>event.target.files[0];
    }
  }

}
