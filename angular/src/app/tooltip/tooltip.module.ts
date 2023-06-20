import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { DxButtonModule } from 'devextreme-angular';
import { TooltipComponent } from './tooltip.component';

@NgModule({
    imports: [DxButtonModule, CommonModule],
            declarations: [TooltipComponent],
            exports: [TooltipComponent]
    })
export class TooltipModule { }
