import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-gallery',
  standalone: true,
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent implements OnInit {
  artworks: any[] = []; 

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchArtworks();
  }

  fetchArtworks(): void {
    this.http.get<any[]>('https://louie-bowl-backend-production.up.railway.app/api/artworks') 
      .subscribe({
        next: (data) => {
          this.artworks = data;
          console.log('Artworks fetched:', this.artworks);
        },
        error: (error) => {
          console.error('Error fetching artworks:', error);
        },
      });
  }
}
