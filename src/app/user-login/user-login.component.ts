import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent  {
  logInForm;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.logInForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  onSubmit(): void {
    if (this.logInForm && this.logInForm.valid) {
      const username = this.logInForm.get('email')?.value;
      const password = this.logInForm.get('password')?.value;
  
      // Check if username and password are not null or undefined
      if (username !== null && username !== undefined && password !== null && password !== undefined) {
        // Convert username and password to strings
        const usernameString: string = username.toString();
        const passwordString: string = password.toString();
  
        // Proceed with login
        this.authService.logIn(usernameString, passwordString).subscribe({
          next: (data) => {
            console.log(data);
            this.router.navigate(["/"])
            // Handle successful login
          },
          error: (error) => {
            // Handle login error
          }
        });
      } else {
        console.log('Username or password is null or undefined');
      }
    } else {
      console.log('Form is invalid');
    }
  }
}
