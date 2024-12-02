$(document).ready(function () {
    // 구매 신청 버튼이 눌릴 때, user_id 값을 가져와서 폼에 설정
    $('#purchaseButton').on('click', function () {
	    var userId = $(this).data('user-id');
	    $('#userId').val(userId);
	});

    // 폼 제출 이벤트 처리
    $('#purchaseForm').submit(function (e) {
        e.preventDefault(); // 폼의 기본 제출 동작을 막음
        
        // 폼 필수 입력 항목 체크
        var userId = $('#userId').val();
        var level = $('#level').val();
        var spProduct = $('#spProduct').val();
        var hdd_amount = $('#quantity').val();
        var memo = $('#description').val()
        
        // 필수 입력 사항 체크
        if (!userId) {
            alert('유저 ID가 설정되지 않았습니다.');
            return;
        }
       
        if (!spProduct || spProduct === "구매하실 SP상품을 선택하세요.") {
            alert('구매할 SP상품을 선택해주세요.');
            return;
        }

        // 폼 데이터 수집
        var formData = {
            user_id: userId,
            sp_product: spProduct,
            message: memo // Description은 필수 입력이 아님
        };
        // 갯수 입력 필드 값 확인 및 추가 // '갯수 입력' 필드 값
		if (hdd_amount && hdd_amount.trim() !== "") { // null, undefined, 빈 문자열 체크
		    formData.hdd_amount = hdd_amount; // 값이 있으면 추가
		}

        // Ajax 요청
         $.ajax({
            url: '/insertApplication', // 서버의 엔드포인트
            method: 'POST',
            contentType: 'application/json', // Content-Type을 JSON으로 설정
            data: JSON.stringify(formData),
            success: function (response) {
                alert('구매 신청이 완료되었습니다.');
                // 필요한 경우 모달을 닫음
                $('#verticallyCentered').modal('hide');
                location.reload(); // 페이지 새로고침
            },
            error: function (error) {
                alert('구매 신청 중 오류가 발생했습니다.');
                console.log(error);
            }
        });
    });
    
});






