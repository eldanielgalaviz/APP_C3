// ─────────────────────────────────────────────────────────────────────────────
// ANGULAR CORE
// ─────────────────────────────────────────────────────────────────────────────
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule, NgClass, NgIf, NgFor } from '@angular/common';

// ─────────────────────────────────────────────────────────────────────────────
// PRIMENG — FORMS
// Input controls, selects, date pickers, file upload, passwords, masks
// ─────────────────────────────────────────────────────────────────────────────
import { ButtonModule }          from 'primeng/button';
import { InputTextModule }       from 'primeng/inputtext';
import { TextareaModule }        from 'primeng/textarea';
import { InputNumberModule }     from 'primeng/inputnumber';
import { InputGroupModule }      from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputMaskModule }       from 'primeng/inputmask';
import { SelectModule }          from 'primeng/select';
import { MultiSelectModule }     from 'primeng/multiselect';
import { DatePickerModule }      from 'primeng/datepicker';
import { CheckboxModule }        from 'primeng/checkbox';
import { RadioButtonModule }     from 'primeng/radiobutton';
import { ToggleSwitchModule }    from 'primeng/toggleswitch';
import { PasswordModule }        from 'primeng/password';
import { FileUploadModule }      from 'primeng/fileupload';
import { FloatLabelModule }      from 'primeng/floatlabel';
import { IconFieldModule }       from 'primeng/iconfield';
import { InputIconModule }       from 'primeng/inputicon';
import { AutoCompleteModule }    from 'primeng/autocomplete';
import { ChipModule }            from 'primeng/chip';
import { SelectButtonModule }    from 'primeng/selectbutton';

// ─────────────────────────────────────────────────────────────────────────────
// PRIMENG — DATA
// Tables, paginators, tags, messages, charts, skeleton
// ─────────────────────────────────────────────────────────────────────────────
import { TableModule }           from 'primeng/table';
import { PaginatorModule }       from 'primeng/paginator';
import { TagModule }             from 'primeng/tag';
import { MessageModule }         from 'primeng/message';
import { ChartModule }           from 'primeng/chart';
import { SkeletonModule }        from 'primeng/skeleton';
import { ProgressBarModule }     from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ScrollPanelModule }     from 'primeng/scrollpanel';
import { MessagesModule }        from 'primeng/messages';
import { PickListModule } from 'primeng/picklist';

// ─────────────────────────────────────────────────────────────────────────────
// PRIMENG — OVERLAY
// Dialogs, drawers, toasts, confirmations, tooltips, popovers
// ─────────────────────────────────────────────────────────────────────────────
import { DialogModule }          from 'primeng/dialog';
import { DynamicDialogModule }   from 'primeng/dynamicdialog';
import { DrawerModule }          from 'primeng/drawer';
import { ToastModule }           from 'primeng/toast';
import { ConfirmDialogModule }   from 'primeng/confirmdialog';
import { ConfirmPopupModule }    from 'primeng/confirmpopup';
import { TooltipModule }         from 'primeng/tooltip';
import { PopoverModule }         from 'primeng/popover';

// ─────────────────────────────────────────────────────────────────────────────
// PRIMENG — NAVIGATION
// Menus, breadcrumbs, tabs, steppers
// ─────────────────────────────────────────────────────────────────────────────
import { MenubarModule }         from 'primeng/menubar';
import { MenuModule }            from 'primeng/menu';
import { Breadcrumb, BreadcrumbModule } from 'primeng/breadcrumb';
import { TabsModule }            from 'primeng/tabs';
import { StepperModule }         from 'primeng/stepper';
import { SplitButtonModule }     from 'primeng/splitbutton';

// ─────────────────────────────────────────────────────────────────────────────
// PRIMENG — LAYOUT
// Cards, panels, dividers, avatars, toolbars
// ─────────────────────────────────────────────────────────────────────────────
import { CardModule }            from 'primeng/card';
import { DividerModule }         from 'primeng/divider';
import { AvatarModule }          from 'primeng/avatar';
import { AvatarGroupModule }     from 'primeng/avatargroup';
import { ToolbarModule }         from 'primeng/toolbar';
import { PanelModule }           from 'primeng/panel';

// ─────────────────────────────────────────────────────────────────────────────
// PRIMENG — MISC
// Ripple, style utils
// ─────────────────────────────────────────────────────────────────────────────
import { RippleModule }          from 'primeng/ripple';
import { StyleClassModule }      from 'primeng/styleclass';

// ─────────────────────────────────────────────────────────────────────────────
// APP DIRECTIVES
// ─────────────────────────────────────────────────────────────────────────────
import { PermissionDirective } from '../directives/PermissionDirective.directive';

// ─────────────────────────────────────────────────────────────────────────────
// CATEGORY EXPORTS — import only what each feature module needs
// ─────────────────────────────────────────────────────────────────────────────

/** Angular base: forms + routing */
export const CORE_IMPORTS = [
    CommonModule,
    NgClass,
    NgIf,
    NgFor,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
] as const;

/** PrimeNG form controls */
export const PRIMENG_FORM = [
    ButtonModule,
    InputTextModule,
    TextareaModule,
    InputNumberModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputMaskModule,
    SelectModule,
    MultiSelectModule,
    DatePickerModule,
    CheckboxModule,
    RadioButtonModule,
    ToggleSwitchModule,
    PasswordModule,
    FileUploadModule,
    FloatLabelModule,
    IconFieldModule,
    InputIconModule,
    AutoCompleteModule,
    ChipModule,
    SelectButtonModule,
] as const;

/** PrimeNG data display */
export const PRIMENG_DATA = [
    TableModule,
    PaginatorModule,
    TagModule,
    MessageModule,
    ChartModule,
    SkeletonModule,
    ProgressBarModule,
    ProgressSpinnerModule,
    ScrollPanelModule,
    MessagesModule,
    PickListModule,
] as const;

/** PrimeNG overlays & feedback */
export const PRIMENG_OVERLAY = [
    DialogModule,
    DynamicDialogModule,
    DrawerModule,
    ToastModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
    TooltipModule,
    PopoverModule,
] as const;

/** PrimeNG navigation */
export const PRIMENG_NAVIGATION = [
    MenubarModule,
    MenuModule,
    Breadcrumb,
    BreadcrumbModule,
    TabsModule,
    StepperModule,
    SplitButtonModule,
] as const;

/** PrimeNG layout & structure */
export const PRIMENG_LAYOUT = [
    CardModule,
    DividerModule,
    AvatarModule,
    AvatarGroupModule,
    ToolbarModule,
    PanelModule,
] as const;

/** PrimeNG utilities */
export const PRIMENG_MISC = [
    RippleModule,
    StyleClassModule,
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// SHARED_IMPORTS — backward-compatible flat array used in all components
// Contains only confirmed-used modules (54 vs original ~100)
// ─────────────────────────────────────────────────────────────────────────────
export const SHARED_IMPORTS = [
    ...CORE_IMPORTS,
    ...PRIMENG_FORM,
    ...PRIMENG_DATA,
    ...PRIMENG_OVERLAY,
    ...PRIMENG_NAVIGATION,
    ...PRIMENG_LAYOUT,
    ...PRIMENG_MISC,
    PermissionDirective,
] as const;


