import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent {
  // selectedFile: File | null = null;

  // constructor(private employeeService: EmployeeService) {}

  // onFileSelected(event: any): void {
  //   this.selectedFile = event.target.files[0];
  // }

  // uploadImage(employeeId: number): void {
  //   if (!this.selectedFile) {
  //     alert('Please select an image.');
  //     return;
  //   }

  //   this.employeeService.uploadEmployeeImage(employeeId, this.selectedFile).subscribe(
  //     (response) => {
  //       alert('Image uploaded successfully!');
  //       // Handle the response from the server if needed
  //     },
  //     (error) => {
  //       alert('Image upload failed. Please try again later.');
  //       console.error(error);
  //     }
  //   );
  // }
}