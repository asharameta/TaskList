import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditCategoryDialogComponent } from 'src/app/dialog/edit-category-dialog/edit-category-dialog.component';
import { operType } from 'src/app/dialog/operType';
import { Category } from 'src/app/model/category';
import { DataHandlerService } from 'src/app/service/data-handler.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  @Input()
  categories!: Category[];

  @Input()
  uncompletedTotal!: number;

  @Input('categoryMap')
  set setCategoryMap(categoryMap: Map<Category, number>){
    this.categoryMap=categoryMap;
  }

  @Output()
  selectCategory = new EventEmitter<Category>();

  @Output()
  deleteCategory = new EventEmitter<Category>();

  @Output()
  updateCategory = new EventEmitter<Category>();

  @Output()
  addCategory = new EventEmitter<string>();

  @Output()
  searchCategory = new EventEmitter<string>();

  @Input()
  selectedCategory!: Category;

  categoryMap!: Map<Category, number>;

  indexMouseMove!: number;
  searchCategoryTitle!: string;

  constructor(private dataHandler: DataHandlerService,  private dialog: MatDialog) { }

  ngOnInit(): void {
    //this.dataHandler.getAllCategories().subscribe(categories=>this.categories=categories);
  }

  showTaskByCategory(category: Category){
    if(this.selectedCategory === category){
      return;
    }

    this.selectedCategory = category;

    this.selectCategory.emit(this.selectedCategory);
  }

  showEditIcon(index: number){
    this.indexMouseMove=index;
  }

  openEditDialog(category: Category){
    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
      data: [category.title, 'Edit Category', operType.EDIT],
      width: '400px'
  });

  dialogRef.afterClosed().subscribe(result => {

      if (result === 'delete') {

          this.deleteCategory.emit(category);

          console.log(this.categoryMap);

          return;
      }

      if (result as string) {
          category.title = result as string;

          this.updateCategory.emit(category);
          return;
      }
  });
    }

    openAddDialog(){
      const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
        data: ['', 'Adding a task', operType.ADD],
        width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
        if (result) {
            this.addCategory.emit(result as string);
        }
    });
    }

    search(){
      if(this.searchCategoryTitle==null){
        return;
      }

      this.searchCategory.emit(this.searchCategoryTitle);
    }

}
