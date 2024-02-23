import {Component, Input, EventEmitter, Output, Type} from '@angular/core';
import { SharedFrameDynamicComponent } from '../shared-frame/shared-frame.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() sidebarItems: {name: String,icon: String, iconPath: String, type: Type<SharedFrameDynamicComponent>}[] = [];
  @Output() itemClick = new EventEmitter<Type<SharedFrameDynamicComponent>>();
  @Output() hideShowSideBar = new EventEmitter<String>;

  sideBarStylingClass: String = "Shown"
  insideContainer: String = "SidebarOpen"
  isHovered: boolean = false;

  getSidebarItems() {
    return this.sidebarItems;
  }
  sidebarItemClick(event: Type<SharedFrameDynamicComponent>) {
    console.log(event);
    this.itemClick.emit(event); // Emit the full event object for parent access.
  }

  getCSSClass() :string {
    return ""
  }

  onMouseEnter(item: any){
    this.isHovered = true
    item.iconPath = 'assets/Icons/' + item.icon + '_hover.png'
    console.log (item.iconPath)
    console.log (item.icon)
    

  }

  onMouseExit(item: any){
    console
    this.isHovered = false
    console.log(item.iconPath)
    item.iconPath = 'assets/Icons/' + item.icon + '.png'
    console.log (item.iconPath)
    console.log (item.icon)

  }

  hideShowSidebar(){
    if (this.sideBarStylingClass === "Shown"){
      this.sideBarStylingClass = "Hidden"
    }
    else this.sideBarStylingClass = "Shown"
    this.hideShowSideBar.emit(this.sideBarStylingClass)
  }

}