import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { HttpClient } from '@angular/common/http'; 
import { firstValueFrom } from 'rxjs'; 

declare const paypal: any; 

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule], 
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registration = {
    name: '',
    teammate: '',
    email: '',
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.initializePayPalButton();
  }

  initializePayPalButton(): void {
    paypal.Buttons({
      style: {
        layout: 'vertical',
        color: 'blue',
        shape: 'pill',
        label: 'checkout',
      },
      createOrder: (data: Record<string, unknown>, actions: any) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: '60.00', 
              },
            },
          ],
        });
      },
      onApprove: (data: Record<string, unknown>, actions: any) => {
        return actions.order.capture().then((details: any) => {
          alert(`Payment successful! Thank you, ${details.payer.name.given_name}.`);
          console.log('Payment details:', details);

          this.saveRegistration();
        });
      },
      onError: (err: any) => {
        console.error('PayPal error:', err);
        alert('Payment failed. Please try again.');
      },
    }).render('#paypal-button-container');
  }

  saveRegistration(): void {
    firstValueFrom(
      this.http.post('https://louie-bowl-backend-production.up.railway.app/api/register', this.registration)
    )
      .then((response) => {
        console.log('Registration saved successfully:', response);
        alert(`Registration successful for ${this.registration.name}!`);
      })
      .catch((error) => {
        console.error('Error saving registration:', error);
        alert('Failed to save registration. Please try again.');
      });
  }
}
