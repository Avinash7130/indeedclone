import { observable } from 'rxjs';
import { Router } from '@angular/router';
import { CompanyService } from './../company.service';

import { Component } from '@angular/core';
import { Company } from '../company';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent {
 
  newCompany:Company=new Company();
  editCompany:Company=new Company();
 
  
  constructor( private companyService:CompanyService,private router:Router){}


  saveClick(){
    this.companyService.saveCompany(this.newCompany).subscribe(
      (response)=>{
        alert('data saved');
        this.router.navigateByUrl("/home");
      },
      (error)=>{
        console.log(error);   
      }
    )
  }
  deleteClick(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this data!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.companyService.deleteCompany(id).subscribe(
          (response) => {
            Swal.fire(
              'Deleted!',
              'Data has been deleted.',
              'success'
            );
        
          },
          (error) => {
            console.log(error);
          }
        );
      }
    });

}
}

