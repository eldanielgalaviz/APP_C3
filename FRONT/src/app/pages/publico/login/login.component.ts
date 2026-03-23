import { Component, OnInit, signal } from '@angular/core';
import { SHARED_IMPORTS } from '../../../shared/imports';
import { Router } from '@angular/router';
import { EncryptionService } from '../../../../service/EncryptionService.service';
import { LoginService } from '../services/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { authGuardService } from '../../../../service/authGuard.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SHARED_IMPORTS],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  visible = signal(false);
  typeSeverity: string = '';
  message: string = '';

  showMessage() {
      this.visible.set(true);

      setTimeout(() => {
          this.visible.set(false);
      }, 3500);
  }

  constructor(
    private router: Router,
    private loginService: LoginService,
    private encryptService: EncryptionService,
    private authGuardService: authGuardService,
    private fb: FormBuilder
  ) {}

  ngOnInit(){
    this.initFormulario();
  }

  initFormulario() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  
  login() {
    if (!this.loginForm.valid) {
      this.typeSeverity = "error";
      this.message = "Please, check all fields";
      return this.showMessage();
    }

    const credentials = {
      Email: this.loginForm.value.email,
      password: this.loginForm.value.password  
    };

    const encryptedData = this.encryptService.encryptObject(credentials);

    const payload = {
      userData: encryptedData 
    };

    this.loginService.iniciarSesion(payload).subscribe({
      next: (response) => {
        if (response.success || response.valido === 1) {
          
          this.authGuardService.setToken(response.accessToken);
          
          if (response.user) {
            this.authGuardService.setUser(response.user);
          }
          
          this.typeSeverity = "success";
          this.message = response.message || "Login successful";
          this.showMessage();
          
          setTimeout(() => {
            this.router.navigate(['/Inicio'], { replaceUrl: true });
          }, 1000);
        } else {
          this.typeSeverity = "error";
          this.message = response.message || "Login failed";
          this.showMessage();
        }
      },
      error: (error) => {
        console.error('Login error:', error);
        this.typeSeverity = "error";
        this.message = error.error?.message || "Please check your credentials. If the problem persists, contact the IT team.";
        this.showMessage();
      }
    });
  }
}