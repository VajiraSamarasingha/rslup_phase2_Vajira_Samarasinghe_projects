import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private builder:FormBuilder, private toastr:ToastrService,
    private service:AuthService,private router:Router){

  }
  userdata:any

  loginForm = this.builder.group({
    username:this.builder.control('',Validators.required),
    password:this.builder.control('',Validators.required),
  });

  proceedlogin(){
    if(this.loginForm.valid){
    //   this.service.Proceedregister(this.registerForm.value).subscribe(res=>{
    //     this.toastr.success("Please Contact Admin for enable access",'User Register Successfully');
    //     this.router.navigate(['/login']);
    //   })
    // }else{
    //   this.toastr.error('Please Enter Valide Data');
    // }
    this.service.Getbycode(this.loginForm.value.username).subscribe(res=>{
      this.userdata=res;
      console.log(this.userdata);
      if(this.userdata.password==this.loginForm.value.password){
        if(this.userdata.isactive==true){
          sessionStorage.setItem('username',this.userdata.id);
          sessionStorage.setItem('role',this.userdata.role);
          this.router.navigate(['']);
        }else{
          this.toastr.error('Please Contact Admin for enable access',"In Active User");
        }
      }else{
        this.toastr.error('Invalid Credentials');
      }
    })
    }
  }
}


