$(document).ready(function() {
	var user_name;
	var user_id;
    $(".contractor-name").each(function() {
         user_name = $(this).text();

        // 이름에 띄어쓰기를 추가하는 함수
        function addSpacesToName(name) {
            return name.split("").join(" ");
        }

        const formattedName = addSpacesToName(user_name);
        $(this).text(formattedName);
        
         // 현재 날짜와 6년 후의 날짜 계산하여 계약 기간에 표시하는 코드
            function addYearsToDate(date, years) {
                const newDate = new Date(date);
                newDate.setFullYear(newDate.getFullYear() + years);
                return newDate;
            }

            function formatDate(date) {
                const year = date.getFullYear();
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const day = date.getDate().toString().padStart(2, '0');
                return `${year} 년 ${month} 월 ${day} 일`;
            }

            const formattedDate = $("#start-date").text().trim();
            const currentDate = new Date(formattedDate.replace(/년|월|일/g, '').replace(/\s/g, '-'));
            const futureDate = addYearsToDate(currentDate, 6);

            const endDate = formatDate(futureDate);
            $("#end-date").text(endDate);
            
            
    });
		   // 숫자에 천 단위 구분 쉼표를 추가하는 함수
		    function addCommas(num) {
		        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		    }
		
		   // 숫자를 한글로 변환하는 함수
    		 // 숫자를 한글로 변환하는 함수
			    function numberToKorean(number) {
			        const units = ['', '십', '백', '천'];
			        const bigUnits = ['만', '억', '조'];
			        let result = '';
			
			        if (number >= 100000000) {
			            const billionPart = Math.floor(number / 100000000);
			            result += `${convertToKorean(billionPart)}억`;
			            number %= 100000000;
			        }
			
			        if (number >= 10000) {
			            const tenThousandPart = Math.floor(number / 10000);
			            result += `${convertToKorean(tenThousandPart)}만`;
			            number %= 10000;
			        }
			
			        if (number > 0) {
			            result += convertToKorean(number);
			        }
			
			        return result.trim();
			    }
			
			    function convertToKorean(number) {
			        const units = ['', '십', '백', '천'];
			        const koreanNumbers = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
			        let result = '';
			        let i = 0;
			
			        while (number > 0) {
			            const digit = number % 10;
			            if (digit > 0) {
			                result = koreanNumbers[digit] + units[i] + result;
			            }
			            number = Math.floor(number / 10);
			            i++;
			        }
			
			        return result;
			    }
			
			    // 공급 가격, 할인 적용 가격에 쉼표 추가 및 한글 변환
			    function updatePrice(selector) {
			        const priceText = $(selector).text().trim();
			        if (priceText) {
			            const price = parseInt(priceText, 10);
			            const formattedPrice = addCommas(price) + "원";
			            const koreanPrice = numberToKorean(price) + "원";
			            $(selector).text(`${formattedPrice} (${koreanPrice})`);
			        }
			    }
				function getPrice(selector) {
			        const priceText = $(selector).text().trim();
			        if (priceText) {
			            return parseInt(priceText, 10);
			        }
			        return 0;
			    }
			    const supplyPrice = getPrice("#supply-price");
			    const finalPayment = getPrice("#final-payment");
			    if (finalPayment === 0) {
			        $("#final-payment").text(addCommas(supplyPrice) + "원 (" + numberToKorean(supplyPrice) + "원)");
			    } else {
			        updatePrice("#final-payment");
			    }
			
			    updatePrice("#supply-price");
			    updatePrice("#first_payment");
			    updatePrice("#second_payment");
			    updatePrice("#last_payment");
			    
			    
$(document).ready(function() {
    const signButton = document.getElementById('signButton');
    const isVerified = signButton.getAttribute('data-is-verified') === '1';

    signButton.addEventListener('click', function() {
        if (isVerified) {
            alert('이미 서명하셨습니다.');
            window.location.href = '/myAgreement';
        } else {
            const user_id = $('#user-id').val().trim();
            
            // 원래 스타일 저장
            const sections = document.querySelectorAll('section');
            const originalSectionStyles = [];
            sections.forEach((section) => {
                originalSectionStyles.push(section.style.width);
                section.style.width = '100%';
            });

            // seal 클래스들의 원래 스타일 저장
            const seal1 = document.querySelector('.seal-1');
            const seal2 = document.querySelector('.seal-2');
            const originalSeal1Style = seal1 ? seal1.style.marginRight : '';
            const originalSeal2Style = seal2 ? seal2.style.marginRight : '';

            // seal 클래스들의 margin 제거
            if (seal1) seal1.style.marginRight = '0';
            if (seal2) seal2.style.marginRight = '0';

            const opt = {
                margin: [0, 0, 0, 0],
                filename: `${user_id}_contract.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { 
                    scale: 2, 
                    useCORS: true
                },
                jsPDF: { 
                    unit: 'mm', 
                    format: 'a4', 
                    orientation: 'portrait'
                }
            };

            const element = document.body;
            html2pdf().from(element).set(opt).toPdf().get('pdf').then(function(pdf) {
                // 모든 원래 스타일 복원
                sections.forEach((section, index) => {
                    section.style.width = originalSectionStyles[index];
                });

                // seal 클래스들의 원래 스타일 복원
                if (seal1) seal1.style.marginRight = originalSeal1Style;
                if (seal2) seal2.style.marginRight = originalSeal2Style;

                var pdfBlob = pdf.output('blob');
                var formData = new FormData();
                formData.append('file', pdfBlob, `${user_id}_contract.pdf`);
                formData.append('agreementVO', new Blob([JSON.stringify({
                    user_id: user_id
                })], {
                    type: "application/json"
                }));

                $.ajax({
                    type: 'POST',
                    url: '/updateContract',
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function(data) {
                        if (data === 'success') {
                            window.location.href = '/kakaocert/signForm';
                        } else if (data === 'failed:session_closed') {
                            alert('로그인을 다시 해주십시오.');
                        } else {
                            alert('PDF 업로드 실패');
                            console.log(data);
                        }
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        console.log('AJAX error: ', textStatus, errorThrown);
                        alert('PDF 업로드 중 오류가 발생했습니다.');
                    }
                });
            });
        }
    });
});
			//글자수에 맞게 칸 조절
			            function adjustWidth(input) {
			                const tempSpan = $('<span>').text(input.val() || input.attr('placeholder')).css({
			                    'visibility': 'hidden',
			                    'white-space': 'pre',
			                    'font-family': input.css('font-family'),
			                    'font-size': input.css('font-size')
			                }).appendTo('body');
			
			                const newWidth = tempSpan.width(); // 20px 패딩 추가
			                input.width(newWidth);
			                tempSpan.remove();
			            }
			
			            $('.dynamic-width').each(function() {
			                adjustWidth($(this)); // 초기 너비 조절
			            });
			
			            $('.dynamic-width').on('input', function() {
			                adjustWidth($(this)); // 입력 시 너비 조절
			            });
			            
			            
			            //계약서 다운로드 링크
	    $('#downloadContractButton').on('click', function() {
	        
	        var url = `https://service.nanodc.info/docs/${UserId}_contract.pdf`;
	        console.log(url);
	        window.location.href = url;
	        });
	        
	   
});


    

			    
			    
	
