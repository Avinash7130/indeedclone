import { CompanyReview } from "./company-review";

export class Company {
    id: number;
    name: string;
    jobProfile:string;
    address: string;
    contactNo: number;
    location: string;
   description:string;
   salary:number;
   
   industry:string;
    companyRating: number;
    email: string;
    postedDate:Date;
    schedule:string;
    reviews: CompanyReview[]; 
    showReviews?: boolean;
    showCompany: boolean = true; 
    constructor(){
        this.id=0;
        this.name="";
        this.jobProfile="";
        this.address="";
        this.contactNo=0;
        this.location="";
        this.description="";
        this.salary=0;
        this.postedDate = new Date();
        this.companyRating=0;
        this.email="";
        this.schedule="";
        this.industry="";
        this.reviews=[];
        this.showReviews = false; 

    }

}
