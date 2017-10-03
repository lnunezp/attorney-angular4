import { Component, ElementRef, HostListener, OnInit, AfterViewInit } from '@angular/core';
import { GlobalState } from '../../../global.state';
import { layoutSizes } from '../../../theme';

@Component({
  selector: 'ba-sidebar',
  templateUrl: './baSidebar.html',
  styleUrls: ['./baSidebar.scss'],
})
export class BaSidebar implements OnInit, AfterViewInit {
  menuHeight: number;
  isMenuCollapsed: boolean = false;
  isMenuShouldCollapsed: boolean = false;

  constructor(private _elementRef: ElementRef, private _state: GlobalState) {

    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
  }

  ngOnInit(): void {
    if (this._shouldMenuCollapse()) {
      this.menuCollapse();
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.updateSidebarHeight());
  }

  @HostListener('window:resize')
  onWindowResize(): void {

    const isMenuShouldCollapsed = this._shouldMenuCollapse();

    if (this.isMenuShouldCollapsed !== isMenuShouldCollapsed) {
      this.menuCollapseStateChange(isMenuShouldCollapsed);
    }
    this.isMenuShouldCollapsed = isMenuShouldCollapsed;
    this.updateSidebarHeight();
  }

  menuExpand(): void {
    this.menuCollapseStateChange(false);
  }

  menuCollapse(): void {
    this.menuCollapseStateChange(true);
  }

  menuCollapseStateChange(isCollapsed: boolean): void {
    this.isMenuCollapsed = isCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
  }

  updateSidebarHeight(): void {
    // TODO: get rid of magic 84 constant
    this.menuHeight = this._elementRef.nativeElement.childNodes[0].clientHeight - 84;
  }

  _shouldMenuCollapse(): boolean {
    return window.innerWidth <= layoutSizes.resWidthCollapseSidebar;
  }
}
