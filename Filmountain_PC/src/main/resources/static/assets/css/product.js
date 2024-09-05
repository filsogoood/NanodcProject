function handleClick(path) {
    const content = document.getElementById('content');

    switch (path) {
        case '/bucheon':
            content.innerHTML = `
                <section>
                    <div class='subpage-wrapper'>
                        <div class='title-box'>
                            <h1>서브페이지명</h1>
                            <p>이 페이지를 설명하는 부분입니다.</p>
                        </div>
                        <div class='contents'>
                            <img src='https://static.wixstatic.com/media/9a179e_6141dd0880d64cbf9783cce2a6884f99~mv2.jpg/v1/fill/w_370,h_494,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/image_edited.jpg' alt='이미지입니다.' />
                            <div class='text-box'>
                                <h2>이 페이지 컨텐츠 제목입니다.</h2>
                                <p>지식산업센터가 전국적으로 구축되었지만 사실 그 활용 면에서는 활용이 잘 안되고 있던 게 사실이었어요.</p>
                                <p>이렇게 어려운 시기에 배터리와 UPS시스템이 내장된 NANODC는 최소 3평 이상 공간만 있으면 설치할 수 있어 탈 중앙화 스토리지 전용 데이터센터로 운영 가능해요.</p>
                                <p>그래서 부천 옥길동에 위치한 지식산업센터에 2페타의 저장공간을 시작으로 최초로 구축이 되었어요!</p>
                                <p>이제 전국의 지식산업센터 오너들에게 희소식이 될 것으로 확신하면서 희망차게 운영을 시작했어요.</p>
                            </div>
                        </div>
                    </div>
                </section>
            `;
            break;
        case '/goyang':
            content.innerHTML = `                
                <section>
                    <div class='subpage-wrapper'>
                        <div class='title-box'>
                            <h1>서브페이지명</h1>
                            <p>이 페이지를 설명하는 부분입니다.</p>
                        </div>
                        <div class='contents'>
                            <img src='https://static.wixstatic.com/media/9a179e_6141dd0880d64cbf9783cce2a6884f99~mv2.jpg/v1/fill/w_370,h_494,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/image_edited.jpg' alt='이미지입니다.' />
                            <div class='text-box'>
                                <h2>이 페이지 컨텐츠 제목입니다.</h2>
                                <p>지식산업센터가 전국적으로 구축되었지만 사실 그 활용 면에서는 활용이 잘 안되고 있던 게 사실이었어요.</p>
                                <p>이렇게 어려운 시기에 배터리와 UPS시스템이 내장된 NANODC는 최소 3평 이상 공간만 있으면 설치할 수 있어 탈 중앙화 스토리지 전용 데이터센터로 운영 가능해요.</p>
                                <p>그래서 부천 옥길동에 위치한 지식산업센터에 2페타의 저장공간을 시작으로 최초로 구축이 되었어요!</p>
                                <p>이제 전국의 지식산업센터 오너들에게 희소식이 될 것으로 확신하면서 희망차게 운영을 시작했어요.</p>
                            </div>
                        </div>
                    </div>
                </section>
            `;
            break;
            case '/gwangju':
                content.innerHTML = `                
                    <section>
                        <div class='subpage-wrapper'>
                            <div class='title-box'>
                                <h1>서브페이지명</h1>
                                <p>이 페이지를 설명하는 부분입니다.</p>
                            </div>
                            <div class='contents'>
                                <img src='https://static.wixstatic.com/media/9a179e_6141dd0880d64cbf9783cce2a6884f99~mv2.jpg/v1/fill/w_370,h_494,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/image_edited.jpg' alt='이미지입니다.' />
                                <div class='text-box'>
                                    <h2>이 페이지 컨텐츠 제목입니다.</h2>
                                    <p>지식산업센터가 전국적으로 구축되었지만 사실 그 활용 면에서는 활용이 잘 안되고 있던 게 사실이었어요.</p>
                                    <p>이렇게 어려운 시기에 배터리와 UPS시스템이 내장된 NANODC는 최소 3평 이상 공간만 있으면 설치할 수 있어 탈 중앙화 스토리지 전용 데이터센터로 운영 가능해요.</p>
                                    <p>그래서 부천 옥길동에 위치한 지식산업센터에 2페타의 저장공간을 시작으로 최초로 구축이 되었어요!</p>
                                    <p>이제 전국의 지식산업센터 오너들에게 희소식이 될 것으로 확신하면서 희망차게 운영을 시작했어요.</p>
                                </div>
                            </div>
                        </div>
                    </section>
                `;
                break;
        default:
            content.innerHTML = `
                <section class="product-intro">
                    <div class="product-intro-wrapper">
                        <h3>신규 SP상품</h3>
                        <div class="products-wrapper">
                            <div class="product-wrapper" onclick="handleClick('/bucheon')">
                                <div class="label"><strong>2</strong>PiB</div>
                                <img class="nanodc-img" src="https://static.wixstatic.com/media/9a179e_6269fc1f2e034c8da0f7eb6ed92d626b~mv2.png/v1/crop/x_93,y_0,w_814,h_1000/fill/w_310,h_381,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Frame%2012.png" alt="상품이미지">
                                <img class="nanodc-logo" src="images/zetacube-logo.png" alt="상품이미지">
                                <p>RAW 2PiB<br>QAP 20PiB</p>
                                <h4>2억 원<small>(부가세 별도)</small></h4>
                            </div>
                            <div class="product-wrapper" onclick="handleClick('/goyang')">
                                <div class="label"><strong>4</strong>PiB</div>
                                <img class="nanodc-img" src="https://static.wixstatic.com/media/9a179e_e764b01fb80048d88163ae55c6d64602~mv2.png/v1/crop/x_93,y_0,w_814,h_1000/fill/w_310,h_381,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Frame%2015.png" alt="상품이미지">
                                <img class="nanodc-logo" src="images/zetacube-logo.png" alt="상품이미지">
                                <p>RAW 4PiB<br>QAP 40PiB</p>
                                <h4>3억 원<small>(부가세 별도)</small></h4>
                            </div>
                            <div class="product-wrapper" onclick="handleClick('/bucheon')">
                                <div class="label"><strong>5</strong>PiB</div>
                                <img class="nanodc-img" src="https://static.wixstatic.com/media/9a179e_ab6e9e73460b411da6a15dbedfbad134~mv2.png/v1/crop/x_93,y_0,w_814,h_1000/fill/w_310,h_381,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Frame%2011.png" alt="상품이미지">
                                <img class="nanodc-logo" src="images/zetacube-logo.png" alt="상품이미지">
                                <p>RAW 5PiB<br>QAP 50PiB</p>
                                <h4>5억 원<small>(부가세 별도)</small></h4>
                            </div>
                        </div>
                        <div class="products01-contact">
                            <h4>구매문의</h4>
                            <p>02-567-2227</p>
                            <p>allen@zetacube.net</p>
                        </div>
                    </div>        
                </section>
            `;
    }
}