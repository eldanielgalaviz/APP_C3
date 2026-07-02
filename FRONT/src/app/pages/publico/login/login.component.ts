import { Component, OnInit, signal } from '@angular/core';
import { CORE_IMPORTS, PRIMENG_FORM, PRIMENG_DATA, PRIMENG_OVERLAY, PRIMENG_LAYOUT } from '../../../shared/imports';
import { Router } from '@angular/router';
import { EncryptionService } from '../../../../service/EncryptionService.service';
import { LoginService } from '../services/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { authGuardService } from '../../../../service/authGuard.service';
import { buildMenuMap } from '../../../../utils/menu.utils';
import { MenuModule } from '../../../interfaces/menu/Menu.interface';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [...CORE_IMPORTS, ...PRIMENG_FORM, ...PRIMENG_DATA, ...PRIMENG_OVERLAY, ...PRIMENG_LAYOUT],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  visible = signal(false);
  typeSeverity: string = '';
  message: string = '';

  menuProjects:  MenuItem[] = [];  
  menuCorporate: MenuItem[] = [];
  menuTools: MenuItem[] = [];
  isSaving: boolean = false;


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
  ) {

  }

  ngOnInit(){
    this.initFormulario();
  }

  initFormulario() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  private buildRawMenusForStorage(permissions: any[]): any[] {
    const result: any[] = [];
    for (const perm of permissions) {
      for (const mainMenu of perm.main_menus ?? []) {
        result.push({
          label: mainMenu.main_menu.short_name,
          items: (mainMenu.submenus ?? []).map((sub: any) => ({
            label:      sub.short_name,
            routerLink: sub.router_link,
            Idsubmenu:  sub.Idsubmenu
          }))
        });
      }
    }
    return result;
  }
  
  login() {
    if (!this.loginForm.valid) {
      this.typeSeverity = "error";
      this.message = "Please, check all fields";
      return this.showMessage();
    }

    if (this.isSaving) return;
    this.isSaving = true;

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
        this.isSaving = false;
        if (response.valido === 1) {
          
          this.authGuardService.setToken(response.token); 
          
          if (response.result?.user_context?.user) {
            this.authGuardService.setUser(response.result.user_context.user);
          }
          
          if (response.result?.user_context?.permissions) {
            this.authGuardService.setPermissions(response.result.user_context.permissions);
              // Guardar ruta y idmenu para getSubmenuIdByRoute
            const rawMenus = this.buildRawMenusForStorage(response.result.user_context.permissions);
            this.authGuardService.setUserMenu(rawMenus);

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
        this.isSaving = false;
        this.typeSeverity = "error";
        this.message = error.error?.message || "Please check your credentials. If the problem persists, contact the IT team.";
        this.showMessage();
      }
    });
  }
}