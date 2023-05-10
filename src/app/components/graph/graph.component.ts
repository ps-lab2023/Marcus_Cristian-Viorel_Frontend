import { Component } from '@angular/core';
import {BookingService} from "../../service/booking.service";
import {Booking} from "../../model/Booking";
import {ValidatorService} from "../../service/validator.service";
import {Chart} from "chart.js/auto";

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent {
  chart: any;

  constructor(private bookingService: BookingService) {}

  ngOnInit() {
    this.bookingService.getBookings().subscribe(bookings => {
      const monthlyEarnings = this.getMonthlyEarnings(bookings);
      const yearlyEarnings = this.getYearlyEarnings(bookings);

      this.createMonthlyChart(monthlyEarnings);
      this.createYearlyChart(yearlyEarnings);
    });
  }

  private getMonthlyEarnings(bookings: Booking[]): Map<string, number> {
    const monthlyEarnings = new Map<string, number>();

    for (const booking of bookings) {
      const date = ValidatorService.parseDate(booking.checkInDate?.substr(0, 10) || booking.checkOutDate?.substr(0, 10));
      const month = date.toLocaleString('default', { month: 'long' });
      const year = date.getFullYear();
      const key = `${month} ${year}`;
      const value = monthlyEarnings.get(key) || 0;
      // @ts-ignore
      monthlyEarnings.set(key, value + booking.total);
    }

    return monthlyEarnings;
  }

  private getYearlyEarnings(bookings: Booking[]): Map<string, number> {
    const yearlyEarnings = new Map<string, number>();

    for (const booking of bookings) {
      const date = ValidatorService.parseDate(booking.checkInDate?.substr(0, 10) || booking.checkOutDate?.substr(0, 10));
      const year = date.getFullYear();
      const key = `${year}`;
      const value = yearlyEarnings.get(key) || 0;
      // @ts-ignore
      yearlyEarnings.set(key, value + booking.total);
    }

    return yearlyEarnings;
  }

  private createMonthlyChart(monthlyBookings: Map<string, number>) {
    let labels = Array.from(monthlyBookings.keys());
    let data = Array.from(monthlyBookings.values());

    this.chart = new Chart('bookings-line', {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          label: 'Earned in USD',
/*          backgroundColor: '#0074D9',*/
          borderWidth: 2,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
              callback: function(value, index, values) {
                return '$' + value;
              }
            }
          }
        },
        plugins: {
/*          title: {
            display: true,
            text: 'Earnings in bookings by month',
            font: {
              size: 20,
              weight: 'bold'
            }
          },*/
          legend: {
            position: 'bottom',
            labels: {
              font: {
                size: 20
              }
            }
          }
        }
      }
    });
  }

  private createYearlyChart(getYearlyEarnings: Map<string, number>) {
    let labels = Array.from(getYearlyEarnings.keys());
    let data = Array.from(getYearlyEarnings.values());

    this.chart = new Chart('bookings-pie', {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          label: 'Earned in USD',
          /*          backgroundColor: '#0074D9',*/
          borderWidth: 2,
          /*          fill: true*/
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          /*          title: {
                      display: true,
                      text: 'Earnings in bookings by year',
                      font: {
                        size: 20,
                        weight: 'bold'
                      }
                    },*/
          legend: {
            position: 'bottom',
            labels: {
              font: {
                size: 20
              }
            }
          }
        }
      }
    });
  }

  goBack() {
    window.history.back();
  }
}
