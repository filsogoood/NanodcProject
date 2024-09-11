$(document).ready(function () {
    // 구매 신청 버튼이 눌릴 때, user_id 값을 가져와서 폼에 설정
    $('#purchaseButton').on('click', function () {
	    var userId = $(this).data('user-id');
	    $('#userId').val(userId);
	});

    // 폼 제출 이벤트 처리
    $('#purchaseForm').submit(function (e) {
        e.preventDefault(); // 폼의 기본 제출 동작을 막음

        // 폼 데이터 수집
        var formData = {
            user_id: $('#userId').val(), // userId는 버튼에서 설정한 값
            level: $('#level').val(),
            sp_product: $('#spProduct').val(),
            memo: $('#description').val()
        };

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



