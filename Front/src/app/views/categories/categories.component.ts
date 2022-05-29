import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogActions } from '@angular/material/dialog';
import { CategorySearchValues } from 'src/app/data/dao/search/SearchObjects';
import { EditCategoryDialogComponent } from 'src/app/dialog/edit-category-dialog/edit-category-dialog.component';
import { operType } from 'src/app/dialog/operType';
import { Category } from 'src/app/model/category';
import {DialogAction} from 'src/app/object/DialogResult'

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {


  categories!: Category[];

  filterTitle!: string;
  filterChanged!: boolean;
  uncompletedCountForCategoryAll!: number;

  categorySearchValues!: CategorySearchValues;
  

  @Input('categorySearchValues')
    set setCategorySearchValues(categorySearchValues: CategorySearchValues) {
        this.categorySearchValues = categorySearchValues;
    }

  @Input('uncompletedCountForCategoryAll')
  set uncompletedCount(uncompletedCountForCategoryAll: number) {
      this.uncompletedCountForCategoryAll = uncompletedCountForCategoryAll;
  }

  @Input('categories')
  set setCategories(categories: Category[]){
    this.categories=categories;
  }

  @Input('selectedCategory')
  set setCategory(selectedCategory: Category) {
      this.selectedCategory = selectedCategory;
  }



  @Output()
  selectCategory = new EventEmitter<Category>();

  @Output()
  deleteCategory = new EventEmitter<Category>();

  @Output()
  updateCategory = new EventEmitter<Category>();

  @Output()
  addCategory = new EventEmitter<Category>();

  @Output()
  searchCategory = new EventEmitter<CategorySearchValues>();


  selectedCategory: any;


  indexMouseMove!: number;
  searchCategoryTitle!: string;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  showCategory(category: Category){

    if(this.selectedCategory===category){
      return;
    }

    this.selectedCategory=category;
    this.selectCategory.emit(this.selectedCategory);
  
  }

  openEditDialog(category: Category){
    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
      data: [new Category(category.id, category.title), 'Editing category'],
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(res=>{
      if(!res){
        return;
      }

      if(res.action === DialogAction.DELETE){
        this.deleteCategory.emit(category);
        return;
      }

      if(res.action === DialogAction.SAVE){
        this.updateCategory.emit(res.obj as Category);
        return;
      }

    })

  }

  openAddDialog(){
      const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
        data: [new Category(null!, ''), 'Adding category'],
        width: '400px'
      });

      dialogRef.afterClosed().subscribe(res=>{
        if(!res){
          return;
        }

        if(res.action===DialogAction.SAVE){
          this.addCategory.emit(res.obj as Category);
        }
      });
  }

  search(){
     this.filterChanged=false;

     if(!this.categorySearchValues){
       return;
     }

     this.categorySearchValues.title=this.filterTitle;
     this.searchCategory.emit(this.categorySearchValues);
  }

  showEditIcon(index: number) {
      this.indexMouseMove = index;
  }

  clearAndSearch(){
    this.filterTitle =null!;
    this.search();
  }

  checkFilterChanged(){
    this.filterChanged = false;

    if (this.filterTitle !== this.categorySearchValues.title){
        this.filterChanged = true;
    }

    return this.filterChanged;

  }

}
