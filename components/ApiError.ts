export class ApiError extends Error{    //it is a class not component,reusable across cmpnts
    status:number;
    constructor(message:string,status:number){
        super(message);
        this.name="ApiError";
        this.status=status;
    }
}