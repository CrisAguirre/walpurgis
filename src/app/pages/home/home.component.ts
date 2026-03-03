import { Component, OnInit, OnDestroy } from '@angular/core';
import { PRODUCTS } from '../../data/products.data';
import { Product, Category } from '../../core/models/product.model';

interface Slide {
  type: 'video' | 'image';
  src: string;
  title: string;
  subtitle: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  slides: Slide[] = [
    {
      type: 'video',
      src: 'assets/videos slider/wv_0.mp4',
      title: 'La Noche Tiene Su Propio Lenguaje',
      subtitle: 'Nueva Colección',
    },
    {
      type: 'video',
      src: 'assets/videos slider/wv_1.mp4',
      title: 'Porta el Símbolo, Siente el Poder',
      subtitle: 'Joyería Oscura',
    },
    {
      type: 'image',
      src: 'assets/slider home/theme_1.jpg',
      title: 'Tu Esencia No Necesita Permiso',
      subtitle: 'Accesorios Únicos',
    },
    {
      type: 'image',
      src: 'assets/slider home/theme_2.jpg',
      title: 'Cada Pieza Cuenta una Historia',
      subtitle: 'Walpurgis Store',
    },
    {
      type: 'video',
      src: 'assets/videos slider/wv_2.mp4',
      title: 'Forjado en las Sombras, Hecho Para Ti',
      subtitle: 'Diseño Exclusivo',
    },
    {
      type: 'image',
      src: 'assets/slider home/theme_3.jpg',
      title: 'Lo Oscuro También Es Bello',
      subtitle: 'Colección Gótica',
    },
  ];

  categories: Category[] = ['Todos', 'Collares', 'Pendientes', 'Gargantillas'];
  selectedCategory: Category = 'Todos';
  filteredProducts: Product[] = [];
  allProducts = PRODUCTS;

  activeSlide = 0;
  prevSlide = -1;
  private slideInterval: any;

  ngOnInit(): void {
    this.filterProducts();
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    clearInterval(this.slideInterval);
  }

  startAutoPlay(): void {
    this.slideInterval = setInterval(() => this.nextSlideBtn(), 5500);
  }

  nextSlideBtn(): void {
    this.prevSlide = this.activeSlide;
    this.activeSlide = (this.activeSlide + 1) % this.slides.length;
  }

  prevSlideBtn(): void {
    this.prevSlide = this.activeSlide;
    this.activeSlide = (this.activeSlide - 1 + this.slides.length) % this.slides.length;
  }

  goToSlide(i: number): void {
    this.prevSlide = this.activeSlide;
    this.activeSlide = i;
    clearInterval(this.slideInterval);
    this.startAutoPlay();
  }

  selectCategory(cat: Category): void {
    this.selectedCategory = cat;
    this.filterProducts();
  }

  filterProducts(): void {
    this.filteredProducts = this.selectedCategory === 'Todos'
      ? this.allProducts
      : this.allProducts.filter(p => p.category === this.selectedCategory);
  }
}
