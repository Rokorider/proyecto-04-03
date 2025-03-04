import {
  Component,
  HostBinding,
  Input,
  OnChanges,
  Output,
  EventEmitter,
  ComponentFactoryResolver,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { NavItem } from './nav-item';
import { Router } from '@angular/router';
import { NavService } from '../../../../services/nav.service';
import { TranslateModule } from '@ngx-translate/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { ApiDataComponent } from '../../../../components/api-data/api-data.component'; // Importa el componente ApiDataComponent

@Component({
  selector: 'app-nav-item',
  imports: [TranslateModule, TablerIconsModule, MaterialModule, CommonModule],
  templateUrl: './nav-item.component.html',
  styleUrls: [],
})
export class AppNavItemComponent implements OnChanges {
  @Output() notify: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() item: NavItem | any;
  expanded: any = false;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() depth: any;
  @ViewChild('componentContainer', { read: ViewContainerRef, static: true }) componentContainer: ViewContainerRef; // Añade ViewChild

  constructor(
    public navService: NavService,
    public router: Router,
    private componentFactoryResolver: ComponentFactoryResolver // Añade ComponentFactoryResolver
  ) {}

  ngOnChanges() {
    const url = this.navService.currentUrl();
    if (this.item.route && url) {
      this.expanded = url.indexOf(`/${this.item.route}`) === 0;
      this.ariaExpanded = this.expanded;
    }
  }

  onItemSelected(item: NavItem) {
    if (item.component === 'ApiDataComponent') { // Comprueba si el ítem tiene un componente asociado
      this.componentContainer.clear(); // Limpia el contenedor
      const factory = this.componentFactoryResolver.resolveComponentFactory(ApiDataComponent); // Crea la fábrica del componente
      const componentRef = this.componentContainer.createComponent(factory); // Crea el componente
      componentRef.instance.apiUrl = 'https://jsonplaceholder.typicode.com/users'; // Pasa la URL de la API al componente
    } else if (!item.children || !item.children.length) {
      this.router.navigate([item.route]);
    }

    if (item.children && item.children.length) {
      this.expanded = !this.expanded;
    }

    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });

    if (!this.expanded) {
      if (window.innerWidth < 1024) {
        this.notify.emit();
      }
    }
  }

  openExternalLink(url: string): void {
    if (url) {
      window.open(url, '_blank');
    }
  }

  onSubItemSelected(item: NavItem) {
    if (!item.children || !item.children.length) {
      if (this.expanded && window.innerWidth < 1024) {
        this.notify.emit();
      }
    }
  }
}