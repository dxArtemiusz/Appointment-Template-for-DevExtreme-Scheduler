import { Component, ViewChild } from '@angular/core';
import { DxSchedulerComponent } from 'devextreme-angular';
import DataSource from 'devextreme/data/data_source';
import { Service } from './app.service';

import { ClickEvent } from 'devextreme/ui/button';
import { dxSchedulerAppointment } from 'devextreme/ui/scheduler';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [Service],
})
export class AppComponent {
  @ViewChild('targetScheduler', { static: true })
  scheduler: DxSchedulerComponent;
  dataSource = new DataSource({
    store: this.service.getData(),
 });

  currentDate: Date = new Date(2021, 5, 2, 11, 30);

  resourcesDataSource = this.service.getEmployees();

  constructor(private service: Service) {
  }

  onDeleteButtonClick = (e: ClickEvent, appointmentData: dxSchedulerAppointment): void => {
    const schedulerInstance = this.scheduler.instance;
    schedulerInstance.deleteAppointment(appointmentData);
    e.event.stopPropagation();
    schedulerInstance.hideAppointmentTooltip();
  }

  isDeleteButtonExist = ({ appointmentData }: { appointmentData: dxSchedulerAppointment}): boolean => {
      const schedulerInstance = this.scheduler.instance;
      const isAppointmentDisabled = appointmentData.disabled;
      const isDeleteAllowed = (schedulerInstance.option('editing') && schedulerInstance.option('editing.allowDeleting') === true)
          || schedulerInstance.option('editing') === true;

      return !isAppointmentDisabled && isDeleteAllowed;
  }

  markWeekEnd = (cellData: any): Record<string, boolean> => {
    return {
      [`employee-${cellData.groups.employeeID}`]: true,
      [`employee-weekend-${cellData.groups.employeeID}`]: this.isWeekEnd(cellData.startDate),
    };
  };

  markTraining = (cellData: any): Record<string, boolean> => {
    const classObject = {
      'day-cell': true,
    };

    classObject[this.getCurrentTrainingClass(cellData.startDate.getDate(), cellData.groups.employeeID)] = true;
    return classObject;
  };

  getColor = (id: number): string => this.resourcesDataSource.find((employee) => 
        employee.id === id
      ).color;
      
      
  private getCurrentTrainingClass = (date: number, employeeID: number): string => {
    const result = (date + employeeID) % 3;
    const currentTraining = `training-background-${result}`;

    return currentTraining;
  }

  private isWeekEnd = (date: Date): boolean => {
    const day = date.getDay();
    return day === 0 || day === 6;
  }
}


