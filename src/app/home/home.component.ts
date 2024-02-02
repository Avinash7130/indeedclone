import { Component } from '@angular/core';
import { Company } from '../company';
import { CompanyService } from '../company.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  companyList: Company[] = [];
  newCompany:Company=new Company();
  editCompany:Company=new Company();
  selectedCompany: Company | null = null;
  searchTerm: string = '';
  filteredCompanyList: any[] = [];
  location!: string; 
  searchTermControl = new FormControl('');
  constructor( private companyService:CompanyService,private router:Router){}

  ngOnInit() {
    debugger
  
   this.getAll();
   this.setupSearchListener();
 
  }


  getAll(){
    debugger
   
    this.companyService.getAllCompany().subscribe(
      (response)=>{
        this.companyList=response;
        this.filterCompanies();
      },
    (error)=>{
      console.log(error);
    }
    )
  }
  showMoreInfo(company: Company): void {
    this.selectedCompany = company;
  }

  hideMoreInfo(): void {
    this.selectedCompany = null;
  }
  search() {
    debugger
    const searchTerm = this.searchTermControl.value;
  
    if (searchTerm !== null) {
      this.filterCompanies();
    } else {
      this.searchTerm = '';
      this.filterCompanies();
    }
  }
  
  filterCompanies(): void {
    debugger
    const searchTerm = (this.searchTermControl.value || '').toLowerCase().trim();

    this.filteredCompanyList = this.companyList.filter(company =>
      company.jobProfile.toLowerCase().includes(searchTerm) ||
      company.name.toLowerCase().includes(searchTerm)
    );
  }
  private setupSearchListener(): void {
    this.searchTermControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      if (searchTerm !== null) {
        debugger
        this.companyService.searchCompanies(searchTerm).subscribe(
          (response) => {
            this.filteredCompanyList = response;
          },
          (error) => {
            console.log(error);
          }
        );
      }
    });
  }

    
    applyNow() {
      const isLoggedIn = sessionStorage.getItem('currentuser') !== null;
      if (!isLoggedIn) {
        this.router.navigate(['/login']); 
      } else {
       
        if (this.selectedCompany) { 
          this.router.navigate(['/apply'], {
            queryParams: {
              companyId: this.selectedCompany.id,
              companyName: this.selectedCompany.name,
      }
    });
  }
 }
}
}
    


