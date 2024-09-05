document.addEventListener('DOMContentLoaded', () => {
    const slides = [
        {
            imgSrc: "assets/img/news/news08.jpg",
            title: "[나우가 간다] '월드 IT쇼 2024' 현장, 제타큐브",
            description: "산업 현장의 생생한 모습을 담아내는 '나우가 간다'는 한경웨비나우가 운영하는 영상 콘텐츠입니다. 다양한 산업 현장을 직접 방문해 혁신적인 활동들과 숨겨진 이야기를 전달하며, 기술, 제조, IT 등 산업계에서의 최신 트렌드와 혁신 사례를 소개합니다."
        },
        {
            imgSrc: "assets/img/news/news07.jpg",
            title: "제타큐브, 탈 중앙화 스토리지 공급자 교육 프로그램 'KESPA 프리서밋' 개최",
            description: "제타큐브는 최근 경기도 고양시 DMC 플렉스 데시앙에서 스토리지 사업자 교육 프로그램인 'KESPA(Korea Enterprise Storage Provider Accelerator)' 프리서밋(사전모임)을 진행했다고 3일 밝혔다."
        },
        {
            imgSrc: "assets/img/news/news06.jpg",
            title: "제타큐브, 일본 파일코인 오빗 쇼케이스 팀즈 웹3 참가",
            description: "초소형 탈중앙화 스토리지 데이터센터 NANODC(나노데이터센터) 전문기업 제타큐브는 지난 13일과 14일 일본 동경 토라노몬 힐즈에서 열린 일본 최대 웹3 AI블록체인 세미나 '팀즈 WEB3/AI 서밋 2024'에서 제품과 솔루션을 소개했다고 17일 밝혔다."
        },
        {
            imgSrc: "assets/img/news/news05.jpg",
            title: "제타큐브, '파일코인 홍콩 페스티벌' 참가…나노데이터센터 발표' 개최",
            description: "제타큐브는 지난 5일부터 8일까지 홍콩에서 열린 '파일코인 홍콩(FIL HK) 2024 웹3 페스티벌'에 초청 강사로 참여, '나노데이터센터'를 소개했다고 15일 밝혔다. FIL HK 2024는 탈중앙화 스토리지 네트워크 파일코인이 홍콩 웹3 페스티벌 기간 개최한 행사다. 조정형 제타큐브 대표가 파일코인 생태계 주요 파트너로 초청받아 참석했다."
        },
        {
            imgSrc: "assets/img/news/news04.png",
            title: "제타큐브, '나노데이터센터 오픈 설명회'…“비용 낮추고, 회수율 높였다”",
            description: "제타큐브가 최근 부동산 침체 직격탄을 맞은 지식산업센터 시장 살리기에 나섰다. 올해 자사 사업 모델인 '초소형 데이터 센터'를 통해 전체 60%에 육박한 업계 공실률을 수익 공간으로 전환하고 이를 통해 중소·중견 기업과 산업센터 시장에 활기를 불어넣겠다는 전략이다."
        },
        {
            imgSrc: "assets/img/news/news03.jpg",
            title: "제타큐브, 초소형 데이터센터 프랜차이즈 '나노데이터센터' 출시...“소자본·고소득 OK”",
            description: "탈중앙화 스토리지 솔루션 전문기업 제타큐브가 기존의 막대한 자금과 인력, 인프라 시설이 필요했던 데이터센터 구축 사업을 콤팩트하게 구성해 이목을 집중시킨다. 회사가 선보인 초소형 데이터센터 프랜차이즈 NANODC는 대용량 데이터센터를 첨단 기술로 압축, 단 한대의 장비 세트 설치 만으로 최대 12PiB(1만2000테라)까지 저장 가능한 혁신 모델이다. 비전공자를 포함한 누구나 쉽게 운영 관리가 가능하다."
        },
        {
            imgSrc: "assets/img/news/news02.jpg",
            title: "제타큐브, 미국서 초미니 데이터센터 기술 뽐냈다",
            description: "제타큐브(대표 조정현)가 최근 라스베이거스에서 열린 세계 최대 탈 중앙화 스토리지 콘퍼런스 'FIL VEGAS 2023'에 참가해 초미니 데이터센터 기술을 선보이며 업계 이목을 집중시켰다."
        },
        {
            imgSrc: "assets/img/news/news01.jpg",
            title: "제타큐브, '나노디씨'로 초미니 데이터센터 시대 연다",
            description: "제타큐브는 지난 6일 서울 장충동 앰베서더 아카데미에서 열린 파일코인 서울 밋업 2023(FIL SEOUL 2023) 행사에서 자사 초소형 탈중앙화 스토리지 데이터센터 구축 솔루션 '나노디씨(NANODC)를 선보였다고 11일 밝혔다."
        }
    ];

    const carousel = document.getElementById('carousel');
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal-content');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const closeButton = document.getElementById('close-button');

    slides.forEach((slide, index) => {
        const slideElement = document.createElement('div');
        slideElement.classList.add('carousel-cell');
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
