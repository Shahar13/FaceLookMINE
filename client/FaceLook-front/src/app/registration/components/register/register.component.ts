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

  data: any = {
    userPicture: ''
  };
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
    const formData: FormData = new FormData();
    // formData.append('userPicture', this.uploadedFile);
    //collection of ALL other fields BUT the uploaded file field.
    ///////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////
    // formData.append('userData', JSON.stringify(this.userService.userData));
    formData.append('userData', this.userService.userData);
    ///////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////

    //api call
    this.api.register(formData).subscribe(
      res => {
        //give client message
        this.toastr.success(res["message"], "Success")
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
      this.data.userPicture = this.uploadedFile;
    }
  }

}
