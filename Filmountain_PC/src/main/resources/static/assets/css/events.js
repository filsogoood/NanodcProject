document.addEventListener('DOMContentLoaded', () => {
    const slides = [
        {
            imgSrc: "https://static.wixstatic.com/media/9a179e_1f28bfdfb5c749cdbf5c8b2a6b34ff27~mv2.png",
            title: "한국 스토리지 공급사업자 교육프로그램 KESPA (Cohort 0) Pre-summit 개최",
            description: "2024.4"
        },
        {
            imgSrc: "https://static.wixstatic.com/media/9a179e_95f8a73a2cfe4c4f8be1c9428a44547d~mv2.png",
            title: "World IT Show 참가",
            description: "2024.04"
        },
        {
            imgSrc: "https://static.wixstatic.com/media/9a179e_324be8ee519a4b33b3ccae2ea7d8bcd0~mv2.jpg",
            title: "Filecoin DSPA – Asia Bootcamp in Hong Kong 수료",
            description: "2023.06"
        },
        {
            imgSrc: "https://static.wixstatic.com/media/9a179e_326f10cd2531434397581a3734277cca~mv2.jpg/v1/fit/w_847,h_476,q_90/9a179e_326f10cd2531434397581a3734277cca~mv2.jpg",
            title: "Enterprise Storage Provider Accelerator in Las Vegas 수료",
            description: "2023.01"
        },
        {
            imgSrc: "https://static.wixstatic.com/media/9a179e_241847dc6e5a4456947ff14cd463acf9~mv2.png/v1/fit/w_620,h_762,q_90/9a179e_241847dc6e5a4456947ff14cd463acf9~mv2.png",
            title: "Filecoin network day in Seoul 개최",
            description: "2022.12"
        },
        {
            imgSrc: "https://static.wixstatic.com/media/9a179e_975ea252e6d44464acf64c4b62fed3c3~mv2.jpg/v1/fit/w_429,h_763,q_90/9a179e_975ea252e6d44464acf64c4b62fed3c3~mv2.jpg",
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
