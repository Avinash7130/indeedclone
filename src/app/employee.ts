

export class Employee {
    id: number;
  name: string;
  address: string;
  pinCode: string;
  department: string;
  designation: string;
  
  image:File|null;
  salary: number;
  email: string;
  resume:File|null;
  applicationStatus:string;
  companyId:number;
  phoneNumber:string;
 
  
  cityId: number;

  city:{
    id:number;
    name:string;
    state:{
      id:number;
      name:string;
      country:{
        id:number;
        name:string
      }
    }

  }

  constructor() {
    this.id = 0;
    this.name = "";
    this.address = "";
    this.pinCode = "";
    this.department = "";
    this.designation = "";
    this.image = null;
    this.salary = 0;
    this.email = "";
    this.resume=null;
    this.applicationStatus='';
    this.companyId=0;
  
    this.cityId = 0;
    this.city=<any>"";
    this.phoneNumber="";
    }
}
