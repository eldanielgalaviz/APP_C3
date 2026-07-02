import { Component, inject } from '@angular/core';
import { CORE_IMPORTS, PRIMENG_FORM, PRIMENG_DATA, PRIMENG_OVERLAY } from '../../../../../../shared/imports';
import { Product } from '../../../../../../../domain/product';
import * as XLSX from 'xlsx';
import { ObservableService } from '../../../../../../../service/observable/Observable.service';
import { authGuardService } from '../../../../../../../service/authGuard.service';
import { MessageService } from 'primeng/api';
import { FormGroup } from '@angular/forms';
import { TechnicalDueDiligence } from '../../../../../../../service/Origination/origination-technical-due-diligence.service';
import { Respuesta } from '../../../../../../interfaces/apiResponse.interface';
import { CbaImports } from '../../../../../../interfaces/origination/cba/cba.interface';
import { PermissionUser } from '../../../../../../../utils/permission-user.service';


@Component({
  selector: 'tdd-cba',
  imports: [...CORE_IMPORTS, ...PRIMENG_FORM, ...PRIMENG_DATA, ...PRIMENG_OVERLAY],
  standalone: true,
  providers: [MessageService],
  templateUrl: './tdd-cba.component.html',
})
export class TddCbaComponent {
  private _permissionUser     = inject(PermissionUser);
  permissions: Record<string, boolean> = {};


  token: any;
  idProject: number = 0;
  isSaving: boolean = false;


  importdoc: boolean = false;
  position!: 'bottom';
  visible: boolean = false;
  products!: Product[];
  mostrarImage: boolean = true; 
  // Document Upload
  Uploading: boolean = false;
  Uploaded: boolean = false;
  File: File | null = null;
  form!: FormGroup;


  importDoc(position: 'bottom') {
    this.position = position;
    this.importdoc = true;
  }

  hideImport(){
    this.importdoc = false;
    this.ersFromRestoration = []
    this.columnsRestorationTable = []
    this.initialInvestment = []
    this.columnsIITable = []
    this.projectCosts = []
    this.columnsPCTable = []

    this.cbatables = {
      ersFromRestoration: { raw: [], tabla: [], columnas: [] },
      initialInvestment: { raw: [], tabla: [], columnas: [] },
      projectCosts: { raw: [], tabla: [], columnas: [] }
    }
  }

  ersFromRestoration: any[] = [];
  columnsRestorationTable: any[] = [];
  
  initialInvestment: any[] = [];
  columnsIITable: any[] = [];

  projectCosts: any[] = [];
  columnsPCTable: any[] = [];

  sheetsConfig: any = {
    ersRestoration: {
      label: 'ERs From Restoration',
      key: 'ersFromRestoration'
    },
    initialInvestment: {
      label: 'Initial Investment',
      key: 'initialInvestment'
    },
    projectCosts: {
      label: 'Project Costs',
      key: 'projectCosts',
    }
  };

  cbatables: any = {
    ersFromRestoration: { raw: [], tabla: [], columnas: [] },
    initialInvestment: { raw: [], tabla: [], columnas: [] },
    projectCosts: { raw: [], tabla: [], columnas: [] }
  };

  visibleHeader: boolean = true;

  constructor(
    private _observableService: ObservableService,
    private _authGuardService: authGuardService,
    private _messageService: MessageService,
    private _originaciontechnicalDueDiligenceService: TechnicalDueDiligence
  ) {
    this.token = this._authGuardService.getToken();

 
  }

  ngOnInit() {
    this.loadPermissions();
    this._observableService.selectedProject$.subscribe(project => {
        if (project?.Id_projects) {
          this.idProject = project.Id_projects;
          this.hideImport();
          this.loadData();
        }
      });
  } 

  loadData(){
    this._originaciontechnicalDueDiligenceService.getCbaData(this.idProject, this.token).subscribe({
       next: (res: Respuesta) => {
        if(res.valido && res.result.length > 0){
          this.loadTables(res.result.filter((item: CbaImports) => item.type === 'ers_from_restoration'),this.sheetsConfig.ersRestoration.key)
          this.loadTables(res.result.filter((item: CbaImports) => item.type === 'initial_investment'),this.sheetsConfig.initialInvestment.key)
          this.loadTables(res.result.filter((item: CbaImports) => item.type === 'project_cost'),this.sheetsConfig.projectCosts.key)
          this.mostrarImage = false;
          this.visibleHeader = false;
        } else {
          this.mostrarImage = true;
          this.visibleHeader = true;
        }
       },
       error: (err) => console.error('Error cargando data:', err)
    });
  }

  loadTables(data: any[], nombreHoja: string) {
    const columnas = this.getColumns(data);
    const tabla = this.transformDataTable(data);
    const totales = this.calcularTotales(tabla, columnas);

    this.cbatables[nombreHoja] = {
      raw: data,
      tabla,
      columnas,
      totales
    };
  }

  onFileChange(event: any) {
  const file = event.files[0];
  if (!file) return;

    const reader = new FileReader();

    reader.onload = (e: any) => {
      const workbook = XLSX.read(e.target.result, { type: 'binary' });


      /** esto es para las tablas de html */
      workbook.SheetNames.forEach(name => {
        const sheet = workbook.Sheets[name];

        const key = this.normalizarNombre(name);

        this.procesarHoja(key, sheet);
      });


      /** esto es para la estructura que mandaré a backend para guardado */

      const baseersFromRestoration = this.parseSheet(workbook.Sheets[this.sheetsConfig.ersRestoration.label]);
      this.ersFromRestoration = this.transformAllData(baseersFromRestoration);
      
      const baseinitialInvestment = this.parseSheet(workbook.Sheets[this.sheetsConfig.initialInvestment.label]);
      this.initialInvestment = this.transformAllData(baseinitialInvestment);
      
      const baseprojectCosts = this.parseSheet(workbook.Sheets[this.sheetsConfig.projectCosts.label]);
      this.projectCosts = this.transformAllData(baseprojectCosts);
    };

    reader.readAsBinaryString(file);
    this.mostrarImage = false;
  }

  parseSheet(worksheet: XLSX.WorkSheet): any[] {
    return XLSX.utils.sheet_to_json(worksheet, {
      range: 1,
      defval: null
    });
  }

  transformAllData(data: any[]): any[] {
    return data.map((row: any) => {
      const keys = Object.keys(row);

      /** Estas son las columnas fijas para cada fila */
      const accountKey = keys[0];

      /** cacheo de las columnas dinámicas (por rp, el valor que tiene) */
      const dinamicas = keys.slice(2);

      let total = 0;

      const rps = dinamicas
        .filter(col => row[col] !== null && row[col] !== '')
        .map((col, index) => {
          const value = Number(row[col]) || 0;

          total += value;

          return {
            rp_id: index + 1,
            budget: value
          };
        });

      return {
        projects_id: this.idProject,
        account: row[accountKey],
        total_amount: total,
        rps
      };
    });
  }
  
  transformDataTable(data: any[]): any[] {
    return data.map(item => {
      const row: any = {
        account: item.account,
        total_amount: item.total_amount
      };

      item.rps.forEach((rp: any) => {
        row[`rp_${rp.rp_id}`] = rp.budget;
      });

      return row;
    });
  }

  getColumns(data: any[]) {

    const rpSet = new Set<number>();

    data.forEach(item => {
      item.rps.forEach((rp: any) => {
        rpSet.add(rp.rp_id);
      });
    });
 
    const rpColumns = Array.from(rpSet)
      .sort((a, b) => a - b)
      .map(id => ({
        field: `rp_${id}`,
        header: `RP ${id}`
      }));

    return [
      { field: 'total_amount', header: 'TOTAL' },
      ...rpColumns,
    ];
  }

  procesarHoja(nombreHoja: string, worksheet: XLSX.WorkSheet) {
    const raw = this.parseSheet(worksheet);

    const estructurada = this.transformAllData(raw);

    const columnas = this.getColumns(estructurada);

    const tabla = this.transformDataTable(estructurada);

    const totales = this.calcularTotales(tabla, columnas);

    this.cbatables[nombreHoja] = {
      raw: estructurada,
      tabla,
      columnas,
      totales,
    };

    this.visibleHeader = false;
  }

  normalizarNombre(texto: string): string {
      return texto
        .normalize('NFD')                   // quita acentos
        .replace(/[\u0300-\u036f]/g, '')    // limpia acentos
        .replace(/[^a-zA-Z0-9 ]/g, '')      // quita caracteres raros
        .trim()
        .split(/\s+/)
        .map((palabra, index) => {
          if (index === 0) return palabra.toLowerCase();
          return palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase();
      })
      .join('');
  }

  calcularTotales(data: any[], columnas: any[]): any {
    const totales: any = {};

    columnas.forEach(col => {
      if (col.field === 'projects_id' || col.field === 'account') {
        totales[col.field] = 'Total';
        return;
      }

      totales[col.field] = data.reduce((acc, row) => {
        const value = Number(row[col.field]) || 0;
        return acc + value;
      }, 0);
    });

    return totales;
  }

  save(){
    if(this.cbatables.ersFromRestoration.raw.length === 0 || this.cbatables.initialInvestment.raw.length === 0 || this.cbatables.projectCosts.raw.length === 0){
      this._messageService.add({severity:'error', summary: 'Error', detail: 'Please upload all required tables.'});
      return;
    }

    if (this.isSaving) return;
    this.isSaving = true;

    const data = {
      p_ers_from_restoration: JSON.stringify(this.ersFromRestoration),
      p_initial_investment: JSON.stringify(this.initialInvestment),
      p_project_cost: JSON.stringify(this.projectCosts),
    }

    this._originaciontechnicalDueDiligenceService.setCBAimport(data, this.token).subscribe({
      next: (res: Respuesta) => {
        this.isSaving = false;
        if(res.valido === 1){
          this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Saved successfully' });
          this.loadData();
          this.importdoc = false;
        }
      },
      error: (err) => {
        this.isSaving = false;
        this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to save CDR Estimation' });
        console.error('Error saving CDR Estimation:', err);
      }
    })
  }

  private loadPermissions(): void {
    this._permissionUser.formatData().subscribe({
      next: (permisos: Record<string, boolean>) => {
        this.permissions = permisos;
        if (!permisos['CREATE-ORIGINATION'] && !permisos['EDIT-ORIGINATION']) {
          this.form.disable();
        }
      }
    });
  }
}
