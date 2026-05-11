import { Directive, ElementRef, Input } from "@angular/core";
import { Router } from "@angular/router";
import { authGuardService } from "../../service/authGuard.service";

@Directive({
  selector: '[appPermission]'
})
export class PermissionDirective {

  @Input() appPermission!: string;

  constructor(
    private el: ElementRef,
    private authService: authGuardService,
    private router: Router
  ) {}

  ngOnInit() {
    const url = this.router.url;
    const hasAccess = this.authService.hasPermission(url, this.appPermission);

    if (!hasAccess) {
      this.el.nativeElement.style.display = 'none';
    }
  }
}