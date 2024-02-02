import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../user-profile.service';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent{
  userProfile: any;
  resumeData: string | null = null;
  appliedJobs:string|null=null;

  constructor(private userProfileService: UserProfileService,private employeeService:EmployeeService) {}

  ngOnInit(): void {
    debugger
    this.userProfile = this.userProfileService.getUserProfile();
    
 
    const currentEmployeeData = sessionStorage.getItem('currentemployee');
    const parsedData = currentEmployeeData ? JSON.parse(currentEmployeeData) : null;

    this.resumeData = parsedData?.resume;

    if (!this.resumeData) {
        console.error('Resume data not found in currentemployee session data');
    }

    this.userProfile = this.userProfileService.getUserProfile();
}
  
    
  
  
  getInitials(userName: string): string {
    return userName ? userName[0].toUpperCase() : '';
  }
  downloadResume() {
    debugger
    if (this.resumeData) {
      const blob = this.base64ToBlob(this.resumeData);
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'resume.pdf'; 
      link.click();
    }
  }
  
  loadAppliedJobs() {
    debugger
    const employeeId = this.userProfile?.id;
    if (employeeId) {
      this.employeeService.getAppliedJobs(employeeId).subscribe(
        (data) => {
          this.appliedJobs = data;
          console.log('Applied Jobs:', this.appliedJobs);
        },
        (error) => {
          console.error('Error fetching applied jobs:', error);
        }
      );
    }
  }


  

  base64ToBlob(base64Data: string): Blob {
    
    const byteCharacters = atob(base64Data);
    const byteArrays: Uint8Array[] = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: 'application/pdf' });
  }
}


