import { Component } from '@angular/core';
import { Product } from '../../../../domain/product';
import { CORE_IMPORTS, PRIMENG_FORM, PRIMENG_DATA, PRIMENG_OVERLAY, PRIMENG_NAVIGATION, PRIMENG_LAYOUT } from '../../../shared/imports';
import { usersService } from '../../../../service/tools/users/users.service';
import { User, SetUserPayload } from '../../../interfaces/tools/user.interface';
import { Respuesta } from '../../../interfaces/apiResponse.interface';
import { authGuardService } from '../../../../service/authGuard.service';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { usersCatalogsService } from '../../../../service/tools/users/usersCatalogs.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { forkJoin } from 'rxjs';


interface state {
  name: string;
}

@Component({
  selector: 'app-users-tls',
  imports: [...CORE_IMPORTS, ...PRIMENG_FORM, ...PRIMENG_DATA, ...PRIMENG_OVERLAY, ...PRIMENG_NAVIGATION, ...PRIMENG_LAYOUT],
  providers: [MessageService, ConfirmationService],
  standalone: true,
  templateUrl: './users-tls.component.html',
  styleUrl: './users-tls.component.scss'
})
export class UsersTlsComponent {

  token: any;

  visible2: boolean = false;
  products!: Product[];
  state: any[] | undefined;

  users!: User[];
  userSelected!: User;
  form!: FormGroup;
  departments: any[] = [];
  positions: any[] = [];

  constructor(
    private _usersService: usersService,
    private _userCatalogService: usersCatalogsService,
    private _messageService: MessageService,
    private _authGuardService: authGuardService,
    private _fb: FormBuilder,
    private _confirmationService: ConfirmationService,
    
  ) {
    this.token = this._authGuardService.getToken();

   }

  ngOnInit() {
    this.initForm();

    this.state = [
      { name: 'Mileston1' },
      { name: 'Mileston2' },
      { name: 'Mileston3' },
    ];
    this.loadCatalogsAndData();
  }

  initForm(){
    this.form = this._fb.group({
      Name: ['',[Validators.required]],
      AP: ['',[Validators.required]],
      AM: ['',[Validators.required]],
      Email: ['',[Validators.required, Validators.email]],
      PasswordHash: [''],
      confirmPassword: [''],
      puesto: ['',[Validators.required]],
      puesto2: ['',[Validators.required]],
      departamento: ['',[Validators.required]],
    },
    {
      validators: passwordMatchValidator('PasswordHash', 'confirmPassword')
    }
  );
  }

  isInvalid(field: string): boolean {
    const control = this.form.get(field);
    return !!(control?.invalid && control?.touched);
  }

  loadCatalogsAndData(){
    forkJoin({
      departments: this._userCatalogService.getDepartments(this.token),
      positions: this._userCatalogService.getPositions(this.token),
    }).subscribe({
      next: (res: any) => {
        this.departments = res.departments.result;
        this.positions = res.positions.result;
        this.loadData();
      },
      error: (err) => console.error('Error cargando catálogos:', err)
    });
  }

  loadData(){
    this._usersService.getUsers(this.token).subscribe({
        next: (res: Respuesta) => {
        if(res.valido && res.result.length > 0){
          this.users = res.result;
        }
        },
        error: (err) => console.error('Error cargando data:', err)
    });
  }

  onRowSelected(user: User){
    this.userSelected = user;
    this.form.patchValue({
      Name: this.userSelected.Name,
      AP: this.userSelected.AP,
      AM: this.userSelected.AM,
      Email: this.userSelected.Email,
      // PasswordHash: this.userSelected.PasswordHash,
      puesto: this.userSelected.Idpositionuser,
      puesto2: this.userSelected.puesto,
      departamento: this.userSelected.department_id
    });
    this.visible2 = true;
  }

  onHide(){
    this.initForm();
    this.visible2 = false;
    this.userSelected = {} as User;
  }

  save(){
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const data = {
      Iduser: this.userSelected?.Iduser ?? 0,
      Name: this.form.value.Name,
      AP: this.form.value.AP,
      AM: this.form.value.AM,
      Email: this.form.value.Email,
      PasswordHash: this.form.value.PasswordHash,
      puesto: this.form.value.puesto2,
      departamento: this.form.value.departamento,
      Idlocationkey: null,
      Idstatususer: this.userSelected?.Idstatususer ?? 1,
      Idpositionuser: this.form.value.puesto,
    }

    this._usersService.setUsers(data, this.token).subscribe({
      next: (res: Respuesta) => {
        if(res.valido === 1){
          this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Saved successfully' });
          this.loadCatalogsAndData();
          this.onHide();
        }
      },
      error: (err) => {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to save user' });
        console.error('Error saving user:', err);
      }
    })

  }

  toggleUserStatus(): void {
    if (!this.userSelected?.Iduser) return;

    const newStatus = this.userSelected.Idstatususer === 1 ? 2 : 1;
    const action    = newStatus === 2 ? 'deactivate' : 'activate';
    const userName  = `${this.userSelected.Name} ${this.userSelected.AP}`;

    this._confirmationService.confirm({
      message: `Are you sure you want to ${action} "${userName}"?`,
      header:  `Confirm ${action.charAt(0).toUpperCase() + action.slice(1)}`,
      icon:    'pi pi-exclamation-triangle',
      accept:  () => this.callToggleStatus(newStatus)
    });
  }

  private callToggleStatus(newStatus: number): void {
    const label = newStatus === 2 ? 'Deactivate' : 'Activate';

    const payload: SetUserPayload = {
      Iduser:         this.userSelected.Iduser,
      Name:           this.userSelected.Name,
      AP:             this.userSelected.AP,
      AM:             this.userSelected.AM,
      Email:          this.userSelected.Email,
      PasswordHash:   '',
      puesto:         this.userSelected.puesto        ?? '',
      departamento:   this.userSelected.department_id ?? null,
      Idlocationkey:  this.userSelected.Idlocationkey ?? null,
      Idstatususer:   newStatus,
      Idpositionuser: this.userSelected.Idpositionuser ?? null,
    };

    this._usersService.setUsers(payload, this.token).subscribe({
      next: (res: Respuesta) => {
        if (res.valido === 1) {
          this._messageService.add({
            severity: newStatus === 2 ? 'warn' : 'success',
            summary:  label,
            detail:   `User ${newStatus === 2 ? 'deactivated' : 'activated'} successfully`
          });
          this.loadCatalogsAndData();
          this.onHide();
        }
      },
      error: (err) => {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: `Failed to ${label.toLowerCase()} user` });
        console.error(`Error on ${label}:`, err);
      }
    });
  }

}

export function passwordMatchValidator(
  passwordField: string,
  confirmPasswordField: string
): ValidatorFn {
  return (form: AbstractControl): ValidationErrors | null => {
    const password = form.get(passwordField)?.value;
    const confirmPassword = form.get(confirmPasswordField)?.value;

    /** valida que ambos campos si tengan algo */
    if (!password || !confirmPassword) {
      return null;
    }

    /** si no coincide, error */
    if (password !== confirmPassword) {
      form.get(confirmPasswordField)?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }

    /** limpia errores cuando ya coinciden */
    const errors = form.get(confirmPasswordField)?.errors;
    if (errors) {
      delete errors['passwordMismatch'];
      if (Object.keys(errors).length === 0) {
        form.get(confirmPasswordField)?.setErrors(null);
      } else {
        form.get(confirmPasswordField)?.setErrors(errors);
      }
    }

    return null;
  };
}
