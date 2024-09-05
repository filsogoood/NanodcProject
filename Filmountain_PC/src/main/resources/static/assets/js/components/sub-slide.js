document.addEventListener('DOMContentLoaded', () => {
    let currentSlide = 1;
    let isTransitioning = false;
    const slides = document.querySelectorAll('.slide02');
    const dots = document.querySelectorAll('.dot');
    const slider = document.getElementById('slider');
    const totalSlides = slides.length - 2; // 복제된 슬라이드를 제외한 실제 슬라이드 수

    const updateSlides = () => {
        slider.style.transition = 'transform 0.5s ease';
        slider.style.transform = `translateX(-${currentSlide * 100}vw)`; // 슬라이드를 뷰포트 단위로 이동

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === (currentSlide - 1) % totalSlides);
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
                slider.style.transform = `translateX(-${currentSlide * 100}vw)`;
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
                slider.style.transform = `translateX(-${currentSlide * 100}vw)`;
                isTransitioning = false;
            }, 500);
        } else {
            setTimeout(() => isTransitioning = false, 500);
        }
    };

    const setCurrentSlide = (index) => {
        if (isTransitioning) return;
        currentSlide = index + 1;
        updateSlides();
    };

    document.getElementById('nextArrow').addEventListener('click', nextSlide);
    document.getElementById('previousArrow').addEventListener('click', prevSlide);
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => setCurrentSlide(index));
    });

    setInterval(nextSlide, 3000); // 3초마다 슬라이드 변경
});
