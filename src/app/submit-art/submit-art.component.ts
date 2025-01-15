import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms'; 
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-submit-art',
  standalone: true,
  imports: [FormsModule, CommonModule], 
  templateUrl: './submit-art.component.html',
  styleUrls: ['./submit-art.component.css'],
})
export class SubmitArtComponent {
  artSubmission = {
    artistName: '',
    title: '',
    email: '',
    phone: '',
  };

  selectedFile: File | null = null;

  @ViewChild('artForm') artForm!: NgForm;

  constructor(private http: HttpClient) {}

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput?.files?.length) {
      this.selectedFile = fileInput.files[0];
    }
  }

  markAllFieldsAsTouched(): void {
    if (this.artForm && this.artForm.controls) {
      Object.keys(this.artForm.controls).forEach(field => {
        const control = this.artForm.controls[field];
        control.markAsTouched({ onlySelf: true }); 
      });
    }
  }
  
  onSubmit() {
    if (this.artForm.invalid) {
      this.markAllFieldsAsTouched();
      alert('Please fix the errors in the form before submitting.');
      return;
    }

    if (!this.selectedFile) {
      alert('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('artistName', this.artSubmission.artistName);
    formData.append('title', this.artSubmission.title);
    formData.append('email', this.artSubmission.email);
    formData.append('phone', this.artSubmission.phone);
    formData.append('file', this.selectedFile);

    this.http.post('https://louie-bowl-backend-production.up.railway.app/api/submit-art', formData).subscribe({
      next: (response) => {
        console.log('Submission successful:', response);
        alert('Submission successful!');
        this.artForm.resetForm(); 
      },
      error: (error) => {
        console.error('Error submitting artwork:', error);
        alert('An error occurred. Please try again.');
      },
    });
  }
}
