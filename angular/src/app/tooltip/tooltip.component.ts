import {
  Component, Input, Output, EventEmitter,
} from '@angular/core';
import { ClickEvent } from 'devextreme/ui/button';
import { Appointment } from 'devextreme/ui/scheduler';

@Component({
  selector: 'Tooltip',
  templateUrl: './tooltip.component.html',
})
export class TooltipComponent {
  @Input()
    appointmentData!: Appointment;

  @Input() markerColor!: string;

  @Input() isDeleteButtonExist!: boolean;

  @Output() onDeleteButtonClick = new EventEmitter<ClickEvent>();
}
