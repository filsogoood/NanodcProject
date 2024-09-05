$(document).ready(function() {
	
	 	var tx_id;
		var userStatus;
		var fil_amount;
		var outside_address;
		var f4_address
		var key_id;
		var lp_address;
		$('#confirmSuccessModal').on('hidden.bs.modal', function (e) {
            location.reload(true);
    });
    $('#declineSuccessModal').on('hidden.bs.modal', function (e) {
            location.reload(true);
    }); 
        $('.approve_button').off('click').on('click', function() {
			 var clickedButton = $(this);
			tx_id = clickedButton.closest('tr').find('[data-tx-id]').data('tx-id');
			userStatus = clickedButton.closest('tr').find('#status').text().trim();
	        fil_amount = clickedButton.closest('tr').find('#fil_amount').text().trim();
	        outside_address = clickedButton.closest('tr').find('#outside_address').text().trim();
	        f4_address = clickedButton.closest('tr').find('#wallet_address').text().trim();
	        lp_address = clickedButton.closest('tr').find('td[data-lp-address]').data('lp-address');

	        key_id = clickedButton.closest('tr').find('[data-key-id]').data('key-id');

			 $('#confirm_modal').modal('show');
	
			 
			});
			$('#confirm_approve').off('click').on('click', function() {
    $('#confirm_modal').modal('hide');
    //$('#loadingModal_fund').modal('show');
    var status = '';
    console.log(tx_id);
   if (userStatus === '출금신청') {
    $.ajax({
        url: "/api/withdraw", // 내부 백엔드 엔드포인트
        type: "POST",
        data: JSON.stringify({
            liquidId: tx_id,
            msigExecuteKeyId: key_id,
            amount: fil_amount,
            fromEthAddress: lp_address,
            toAddress: outside_address
        }),
        contentType: "application/json",
        success: function(response) {
            console.log(response);
            if (response.success === true) {
                console.log('Withdrawal in progress', response);
                status = "출금진행중";
                updateStatus(tx_id, status);
            } else {
                console.log('Failed : ', response);
                status = "출금거절";
                updateStatus(tx_id, status);
            }
        }
    });
} else if (userStatus === '입금신청') {
    $.ajax({
        url: "/api/deposit", // 내부 백엔드 엔드포인트
        type: "POST",
        data: JSON.stringify({
            liquidId: tx_id,
            keyId: key_id,
            amount: fil_amount
        }),
        contentType: "application/json",
        success: function(response) {
            console.log(response);
            if (response.success === true) {
                console.log('Deposit in progress', response);
                status = "입금진행중";
                updateStatus(tx_id, status);
            } else {
                console.log('Failed : ', response);
                status = "입금거절";
                updateStatus(tx_id, status);
            }
        }
    });
}
   
   
   

    function updateStatus(tx_id,status) {
		console.log(status);
        $.ajax({
            type: 'POST',
            url: '/admin/updateLPstatus',
            contentType: 'application/json',
            data: JSON.stringify({
                liquid_id: tx_id,
                status: status,
                tx_message: null
            }),
            success: function(data) {
                if (data === 'success') {	
                    // 성공 시 모달 내용 변경
                    $('#success_header_fundRequest').removeClass("bg-danger").addClass("bg-success");
                    $('#success_title_fundRequest').text("승인 되었습니다");
                    $('#confirmSuccessModal').modal('show'); 
                    // 승인 완료 모달 표시
                } else if (data === 'failed:session_closed') {
                    // 세션 종료 시 다른 처리
                    $('#session_alert_user').modal('show');
                } else {
                    // 실패 시 모달 내용 변경
                    $('#success_header_fundRequest').removeClass("bg-success").addClass("bg-danger");
                    $('#success_body_fundRequest').text(data);
                    $('#success_title_fundRequest').text("승인 실패하였습니다");
                    $('#confirmSuccessModal').modal('show');
                }
            },
            error: function(error) {
                // 요청에 실패했을 때 수행할 동작
                console.error('승인 요청 실패:', error);
            },
        });
    }
});

        
        $('.decline_button').off('click').on('click', function() {
			 var clickedButton = $(this);
			tx_id = clickedButton.closest('tr').find('[data-tx-id]').data('tx-id');
			userStatus = clickedButton.closest('tr').find('#status').text().trim();

			
			 $('#declineModal').modal('show');
	
			 
			});
			
			
			$('#declineConfirmBtn').off('click').on('click', function() {
			     var tx_message = $('#declineReason').val();
			     var status = '';
			
			     if (userStatus === '출금신청') {
			         status = "출금거절";
			     } else if (userStatus === '입금신청') {
			         status = "출금거절";
			     } else {
			         console.log('이 요청은 처리할 수 없습니다. 상태: ' + userStatus);
			         return; // 처리할 수 없는 상태이므로 종료
			     }
			
			     $.ajax({
			         type: 'POST',
			         url: '/admin/updateLPstatus',
			         contentType: 'application/json',
			         data: JSON.stringify({
			             liquid_id: tx_id,
			             status: status,
			             tx_message: tx_message
			         }),
			         success: function(data) {
			             $('#declineModal').modal('hide');
			             if (data === 'success') {
			                 $('#success_header_fundRequest').removeClass("bg-danger").addClass("bg-success");
			                 $('#success_title_fundRequest').text("거절되었습니다");
			                 $('#confirmSuccessModal').modal('show'); 
			             } else if (data === 'failed:session_closed') {
			                 $('#session_alert_user').modal('show');
			             } else {
			                 $('#success_header_fundRequest').removeClass("bg-success").addClass("bg-danger");
			                 $('#success_body_fundRequest').text(data);
			                 $('#success_title_fundRequest').text("거절실패하였습니다");
			                 $('#confirmSuccessModal').modal('show');
			             }
			         },
			         error: function(error) {
			             console.error('승인 요청 실패:', error);
			         },
			     });
 });


    
        });
