import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'galley',
  templateUrl: './galley.component.html',
  styles: [],
})
export class GalleyComponent implements OnInit {
  selectedImage: string;

  @Input() images: string[] | undefined;

  ngOnInit(): void {
    if (this.images?.length) {
      this.selectedImage = this.images[0];
    }
  }

  changeSelectedImage(imageUrl: string) {
    this.selectedImage = imageUrl;
  }

  get hasImages() {
    return this.images?.length > 0;
  }
}
