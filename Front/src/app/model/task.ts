import { Category } from "./category";
import { Priority } from "./priority";
export class Task {
    id: number;
    title: string;
    completed: number;
    priority: Priority;
    category: Category;
    date?: Date;

    oldCategory: Category;

    constructor(id: number, title: string, completed: number, priority: Priority, category: Category, oldCategory?: Category, date?: Date){
        this.id=id;
        this.title=title;
        this.completed=completed;
        this.priority=priority;
        this.category=category;
        this.oldCategory = oldCategory!;
        this.date=date;
    }
}
