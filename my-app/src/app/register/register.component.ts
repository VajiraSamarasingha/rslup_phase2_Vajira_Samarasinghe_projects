import { Component } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(private builder:FormBuilder, private toastr:ToastrService,
    private service:AuthService,private router:Router){

  }

  registerForm = this.builder.group({
    id:this.builder.control('',Validators.compose([Validators.required,Validators.minLength(5)])),
    name:this.builder.control('',Validators.required),
    password:this.builder.control('',Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z0-9]{6,10}$')])),
    email:this.builder.control('',Validators.compose([Validators.required,Validators.email])),
    gender:this.builder.control('male'),
    role:this.builder.control(''),
    isactive:this.builder.control(false),
  });


  proceedregisteration(){
    if(this.registerForm.valid){
      this.service.Proceedregister(this.registerForm.value).subscribe(res=>{
        this.toastr.success("Please Contact Admin for enable access",'User Register Successfully');
        this.router.navigate(['/login']);
      })
    }else{
      this.toastr.error('Please Enter Valide Data');
    }
  }

}
