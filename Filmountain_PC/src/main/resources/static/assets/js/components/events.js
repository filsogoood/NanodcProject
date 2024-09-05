document.addEventListener('DOMContentLoaded', () => {
    const slides = [
        {
            imgSrc: "assets/img/news/event06.png",
            title: "한국 스토리지 공급사업자 교육프로그램 KESPA (Cohort 0) Pre-summit 개최",
            description: "2024.4"
        },
        {
            imgSrc: "assets/img/news/event05.png",
            title: "World IT Show 참가",
            description: "2024.04"
        },
        {
            imgSrc: "assets/img/news/event04.jpg",
            title: "Filecoin DSPA – Asia Bootcamp in Hong Kong 수료",
            description: "2023.06"
        },
        {
            imgSrc: "assets/img/news/event03.jpg",
            title: "Enterprise Storage Provider Accelerator in Las Vegas 수료",
            description: "2023.01"
        },
        {
            imgSrc: "assets/img/news/event02.png",
            title: "Filecoin network day in Seoul 개최",
            description: "2022.12"
        },
        {
            imgSrc: "assets/img/news/event01.jpg",
            title: "IPFS&Filecoin storage provider meetup in Singapore VIP초청",
            description: "2022.09"
        }
    ];

    const carousel = document.getElementById('carousel2');
    const modal = document.getElementById('modal2');
    const modalImg = document.getElementById('modal-img2');
    const modalTitle = document.getElementById('modal-title2');
    const modalDescription = document.getElementById('modal-description2');
    const closeButton = document.getElementById('close-button2');

    slides.forEach((slide) => {
        const slideElement = document.createElement('div');
        slideElement.classList.add('carousel-cell2');
        slideElement.innerHTML = `
            <img src="${slide.imgSrc}" alt="${slide.title}">
            <h4>${slide.title}</h4>
            <p>${slide.description}</p>
        `;
        slideElement.addEventListener('click', () => openModal(slide));
        carousel.appendChild(slideElement);
    });

    const flkty = new Flickity(carousel, {
        wrapAround: true,
        contain: true
    });

    const openModal = (slide) => {
        modalImg.src = slide.imgSrc;
        modalTitle.textContent = slide.title;
        modalDescription.textContent = slide.description;
        modal.style.display = 'flex';
    };

    const closeModal = () => {
        modal.style.display = 'none';
    };

    closeButton.addEventListener('click', closeModal);
});
