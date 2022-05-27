import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from "@angular/material/table"
import {MatSortModule} from "@angular/material/sort"
import {MatPaginatorModule} from "@angular/material/paginator"
import {MatDialogModule} from "@angular/material/dialog"
import { MatInputModule} from "@angular/material/input"
import {MatIconModule} from "@angular/material/icon"
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker'
import{MatCheckboxModule} from '@angular/material/checkbox'

import { AppComponent } from './app.component';
import { CategoriesComponent } from './views/categories/categories.component';
import { TasksComponent } from './views/tasks/tasks.component';
import { EditTaskDialogComponent } from './dialog/edit-task-dialog/edit-task-dialog.component';
import { ConfirmDialogComponent } from './dialog/confirm-dialog/confirm-dialog.component';
import { EditCategoryDialogComponent } from './dialog/edit-category-dialog/edit-category-dialog.component';
import { FooterComponent } from './views/footer/footer.component';
import { HeaderComponent } from './views/header/header.component';
import { StatComponent } from './views/stat/stat.component';
import { StatCardComponent } from './views/stat/stat-card/stat-card.component'
import { ColorPickerModule } from 'ngx-color-picker';
import { PrioritiesComponent } from './views/priorities/priorities.component';
import { SettingsDialogComponent } from './dialog/settings-dialog/settings-dialog.component';
import { EditPriorityDialogComponent } from './dialog/edit-priority-dialog/edit-priority-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    TasksComponent,
    EditTaskDialogComponent,
    ConfirmDialogComponent,
    EditCategoryDialogComponent,
    FooterComponent,
    HeaderComponent,
    StatComponent,
    StatCardComponent,
    PrioritiesComponent,
    SettingsDialogComponent,
    EditPriorityDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule, 
    ColorPickerModule
  ],
  providers: [],
  entryComponents: [EditTaskDialogComponent,ConfirmDialogComponent, EditCategoryDialogComponent, SettingsDialogComponent, EditPriorityDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
