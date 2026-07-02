import { Component } from '@angular/core';
import { CORE_IMPORTS, PRIMENG_DATA, PRIMENG_NAVIGATION, PRIMENG_LAYOUT } from '../../../shared/imports';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { buildMenuMap } from '../../../../utils/menu.utils';
import { MenuModule } from '../../../interfaces/menu/Menu.interface';
import { authGuardService } from '../../../../service/authGuard.service';

@Component({
  selector: 'app-tools',
  imports: [...CORE_IMPORTS, ...PRIMENG_DATA, ...PRIMENG_NAVIGATION, ...PRIMENG_LAYOUT, ScrollPanelModule],
  templateUrl: './tools.component.html',
  styleUrl: './tools.component.scss'
})
export class ToolsComponent {

  items!: MenuItem[];
  menuTools!: MenuItem[];

  constructor(
    private router: Router,
    private _authGuardService: authGuardService,    
  ) {}

  ngOnInit() {
      const userPermissions = this._authGuardService.getPermissions();
      const menuMap = buildMenuMap(userPermissions);
      
      this.menuTools = menuMap.get(MenuModule.TOOLS) ?? [];
  }
}