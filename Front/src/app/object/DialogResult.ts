

export class DialogResult{
    action!: DialogAction;
    obj!:any;

    constructor(action: DialogAction, obj?: any){
        this.action = action;
        this.obj=obj;
    }
}


export enum DialogAction{
    SETTINGS_CHANGE=0,
    SAVE = 1,
    OK=2,
    CANCEL=3,
    DELETE=4,
    COMPLETE=5,
    ACTIVATE=6
}