// scripts.js

let currentSlide = 1;
let isTransitioning = false;
const slides = document.querySelectorAll('.slide01');
const dots = document.querySelectorAll('.dot01');
const slider = document.querySelector('.slider01');
const totalSlides = slides.length - 2; // 복제된 슬라이드를 제외한 실제 슬라이드 수

const updateSlides = () => {
    slider.style.transition = 'transform 0.5s ease';
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;

    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide - 1);
    });
};

const nextSlide = () => {
    if (isTransitioning) return;
    isTransitioning = true;

    currentSlide++;
    updateSlides();

    if (currentSlide === totalSlides + 1) {
        setTimeout(() => {
            slider.style.transition = 'none';
            currentSlide = 1;
            slider.style.transform = `translateX(-${currentSlide * 100}%)`;
            isTransitioning = false;
        }, 500);
    } else {
        setTimeout(() => isTransitioning = false, 500);
    }
};

const prevSlide = () => {
    if (isTransitioning) return;
    isTransitioning = true;

    currentSlide--;
    updateSlides();

    if (currentSlide === 0) {
        setTimeout(() => {
            slider.style.transition = 'none';
            currentSlide = totalSlides;
            slider.style.transform = `translateX(-${currentSlide * 100}%)`;
            isTransitioning = false;
        }, 500);
    } else {
        setTimeout(() => isTransitioning = false, 500);
    }
};

const setCurrentSlide = (index) => {
    currentSlide = index + 1;
    updateSlides();
};

document.addEventListener('DOMContentLoaded', () => {
    updateSlides();
    setInterval(nextSlide, 3000); // 3초마다 슬라이드 변경
});
