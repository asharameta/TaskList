export class CategorySearchValues{
    title!: string;
}

export class TaskSearchValues{
    title='';
    completed!: number;
    priorityId!: number;
    categoryId!: number;
    pageNumber = 0;
    pageSize = 5;

    sortColumn = 'title';
    sortDirection='asc';
}

export class PrioritySearchValues{
    title!: string;
}