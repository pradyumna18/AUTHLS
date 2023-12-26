import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm!:FormGroup
  constructor(private _http:HttpClient,private formBuilder:FormBuilder,private router:Router){}




  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:[''],
      password:['']
    })
  }
   

  log(){
    this._http.get<any>("http://localhost:3000/signup").subscribe(res=>{
      const user =res.find((a:any)=>{
        return a.email==this.loginForm.value.email && a.password==this.loginForm.value.password
      })
      if(user){
         alert("Login Successfully");
         this.loginForm.reset();
         this.router.navigate(['dashboard'])
      }else{
        alert("User Not Found")
      }
    },err=>{
      alert("Wrong")
    }
    )
  }
}
