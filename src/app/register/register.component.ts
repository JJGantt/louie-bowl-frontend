import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms'; 
import { HttpClient } from '@angular/common/http'; 
import { firstValueFrom } from 'rxjs'; 
import { CommonModule } from '@angular/common';


declare const paypal: any; 

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule], 
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registration = {
    name: '',
    teammate: '',
    email: '',
  };

  @ViewChild('registrationForm') registrationForm!: NgForm;

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
      onClick: (data: Record<string, unknown>, actions: any) => {
        if (this.registrationForm.invalid) {
          this.markAllFieldsAsTouched();
          alert('Please fix the errors in the form before proceeding to payment.');
          return actions.reject(); 
        }
        return actions.resolve();
      },
      createOrder: (data: Record<string, unknown>, actions: any) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: '61.99', 
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

  markAllFieldsAsTouched(): void {
    Object.keys(this.registrationForm.controls).forEach(field => {
      const control = this.registrationForm.controls[field];
      control.markAsTouched({ onlySelf: true });
    });
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
