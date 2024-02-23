import {Component, ViewChild, ViewContainerRef, ChangeDetectorRef, AfterViewInit, Type} from '@angular/core'
import {DynamicContentAreaDirective } from '../shared-frame/dynamic-content-area.directive'
import {SharedFrameDynamicComponent} from '../shared-frame/shared-frame.component'

@Component({
    selector: 'dynamic-section',
    template: '',

})
export abstract class DynamicSection implements AfterViewInit{

  menuItems: { name: string, icon: String, iconPath: String, type: Type<SharedFrameDynamicComponent> }[] =[]
  sideBarGap: String = "Shown"
    
  @ViewChild(DynamicContentAreaDirective, { static: false }) private dynamicContentArea!: DynamicContentAreaDirective;

  constructor(private viewContainerRef: ViewContainerRef, private cdr: ChangeDetectorRef) {}

  

  ngAfterViewInit(): void {
    this.cdr.detectChanges(); // Manually trigger change detection
    let initialView = this.menuItems[0].type;
    this.loadComponent(initialView);
  }

  loadComponent(component: Type<SharedFrameDynamicComponent>) {
    if (this.dynamicContentArea && this.dynamicContentArea.viewContainerRef) {
      const viewContainerRef = this.dynamicContentArea.viewContainerRef;
      viewContainerRef.clear();

      const componentRef = viewContainerRef.createComponent<SharedFrameDynamicComponent>(component);
    } else {
      console.error('View container reference is undefined.');
      // Handle the case where viewContainerRef is undefined
    }
  }

  changeView(view: Type<SharedFrameDynamicComponent>) {
    console.log("Change the VIEW");
    this.loadComponent(view);
  }

  hideShowSideBar(sideBarVisibility: String){
    this.sideBarGap = sideBarVisibility   

  }

}