import { CommonModule, NgFor } from '@angular/common';
import { Component, Input, SimpleChange, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-carousel',
  imports: [NgFor, CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent {
 
  currentIndex = 0;
  autoSlideInterval: any;
  @Input() images: any;
  destinations: any;

  ngOnInit(): void {
    this.startAutoSlide();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('changes', this.images);
    if (this.images) {
      this.destinations = this.images.map((item: any) => {
        return { imageUrl: item.urls.full, title: "", description: item.description || item.alt_description }
      })
    }
  }

  ngOnDestroy(): void {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  startAutoSlide(): void {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000); // Change slide every 5 seconds
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.destinations.length;
  }

  prevSlide(): void {
    this.currentIndex =
      (this.currentIndex - 1 + this.destinations.length) % this.destinations.length;
  }

}
