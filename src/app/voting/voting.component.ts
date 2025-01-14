import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-voting',
  standalone: true,
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.css'],
})
export class VotingComponent implements OnInit {
  artworks: any[] = []; // Array to store artworks
  votedArtId: string | null = null; // Track if the user has already voted

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchArtworks();
  }

  fetchArtworks(): void {
    this.http.get<any[]>('https://louie-bowl-backend-production.up.railway.app/api/artworks') // Adjust the API URL if needed
      .subscribe({
        next: (data) => {
          this.artworks = data; // Populate artworks
          console.log('Artworks fetched:', this.artworks);
        },
        error: (error) => {
          console.error('Error fetching artworks:', error);
        },
      });
  }

  vote(artId: string): void {
    if (this.votedArtId) {
      alert('You have already voted!');
      return;
    }

    this.http.post('https://louie-bowl-backend-production.up.railway.app/api/vote', { artId }).subscribe({
      next: () => {
        alert('Thank you for voting!');
        this.votedArtId = artId; // Prevent further voting
      },
      error: (error) => {
        console.error('Error submitting vote:', error);
        alert('An error occurred while voting. Please try again.');
      },
    });
  }
}
