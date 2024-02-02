import { data } from "jquery";

export class CompanyReview {
    id: number;
    companyId: number;
   
    rating: number;
    comment: string;
    createdAt: Date;
    
    constructor(){
        this.id=0;
        this.companyId=0;
     
        this.rating=0;
        this.comment="";
        this.createdAt=new Date();
    }
}
