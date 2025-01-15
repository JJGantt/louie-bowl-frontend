import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-submit-art',
  standalone: true,
  imports: [FormsModule], // Include FormsModule
  templateUrl: './submit-art.component.html',
  styleUrls: ['./submit-art.component.css'],
})
export class SubmitArtComponent {
  artSubmission = {
    artistName: '',
    title: '',
    description: '',
    phone: '', 
    email: ''
  };

  selectedFile: File | null = null;

  constructor(private http: HttpClient) {}

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput?.files?.length) {
      this.selectedFile = fileInput.files[0];
    }
  }

  onSubmit() {
    if (!this.selectedFile) {
      alert('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('artistName', this.artSubmission.artistName);
    formData.append('title', this.artSubmission.title);
    formData.append('description', this.artSubmission.description);
    formData.append('file', this.selectedFile);

    this.http.post('https://louie-bowl-backend-production.up.railway.app/api/submit-art', formData).subscribe({
      next: (response) => {
        console.log('Submission successful:', response);
        alert('Submission successful!');
      },
      error: (error) => {
        console.error('Error submitting artwork:', error);
        alert('An error occurred. Please try again.');
      },
    });
  }
}

