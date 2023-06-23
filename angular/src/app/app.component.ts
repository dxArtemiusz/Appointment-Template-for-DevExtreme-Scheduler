import { Component, ViewChild } from '@angular/core';
import { DxSchedulerComponent } from 'devextreme-angular';
import DataSource from 'devextreme/data/data_source';

import { ClickEvent } from 'devextreme/ui/button';
import { Appointment } from 'devextreme/ui/scheduler';
import { Service } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [Service],
})
export class AppComponent {
  @ViewChild('targetScheduler', { static: true })
    scheduler!: DxSchedulerComponent;

  dataSource = new DataSource({
    store: this.service.getData(),
  });

  currentDate: Date = new Date(2021, 5, 2, 11, 30);

  resourcesDataSource = this.service.getEmployees();

  // eslint-disable-next-line @typescript-eslint/no-parameter-properties
  constructor(private readonly service: Service) {
  }

  onDeleteButtonClick = (e: ClickEvent, appointmentData: Appointment): void => {
    const schedulerInstance = this.scheduler.instance;
    schedulerInstance.deleteAppointment(appointmentData);
    e.event?.stopPropagation();
    schedulerInstance.hideAppointmentTooltip();
  };

  isDeleteButtonExist = ({ appointmentData }: { appointmentData: Appointment }): boolean => {
    const schedulerInstance = this.scheduler.instance;
    const isAppointmentDisabled = appointmentData.disabled;
    const isDeleteAllowed = (schedulerInstance.option('editing') && schedulerInstance.option('editing.allowDeleting') === true)
          || schedulerInstance.option('editing') === true;

    return !isAppointmentDisabled && isDeleteAllowed;
  };

  markWeekEnd = (cellData: any): Record<string, boolean> => ({
    [`employee-${cellData.groups.employeeID}`]: true,
    [`employee-weekend-${cellData.groups.employeeID}`]: this.isWeekEnd(cellData.startDate),
  });

  markTraining = (cellData: any): Record<string, boolean> => {
    const classObject = {
      'day-cell': true,
    } as Record<string, boolean>;

    classObject[this.getCurrentTrainingClass(cellData.startDate.getDate(), cellData.groups.employeeID)] = true;
    return classObject;
  };

  getColor = (id: number): string | undefined => this.resourcesDataSource.find((employee) => employee.id === id)?.color;

  private readonly getCurrentTrainingClass = (date: number, employeeID: number): string => {
    const result = (date + employeeID) % 3;
    const currentTraining = `training-background-${result}`;

    return currentTraining;
  };

  private readonly isWeekEnd = (date: Date): boolean => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };
}
