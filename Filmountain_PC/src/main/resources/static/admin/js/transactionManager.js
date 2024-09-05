$(document).ready(function() {
	
	 	var tx_id;
		var userStatus;
		var fil_amount;
		var wallet_address;
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
	        wallet_address = clickedButton.closest('tr').find('#wallet_address').text();

			 $('#confirm_modal').modal('show');
	
			 
			});
			 $('#confirm_approve').off('click').on('click', function() {
				  $('#confirm_modal').modal('hide');
			 		//$('#loadingModal_fund').modal('show');
			 
            if (userStatus === '출금신청') {
                $.ajax({
                    type: 'POST',
                    url: '/admin/updateFundRequest',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        transaction_id: tx_id,
                        status: "출금승인",
                        fil_amount: fil_amount,
                        wallet_address :wallet_address
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
            } else {
                console.log('이 요청은 처리할 수 없습니다. 상태: ' + userStatus);
            }
        });
        
         $('.decline_button').off('click').on('click', function() {
			 var clickedButton = $(this);
			tx_id = clickedButton.closest('tr').find('[data-tx-id]').data('tx-id');
			userStatus = clickedButton.closest('tr').find('#status').text().trim();
	        fil_amount = clickedButton.closest('tr').find('#fil_amount').text().trim();
	        wallet_address = clickedButton.closest('tr').find('#wallet_address').text();
			
			 $('#declineModal').modal('show');
	
			 
			});
			
			
			 $('#declineConfirmBtn').off('click').on('click', function() {
				  
				  var message = $('#declineReason').val();
			 		//$('#loadingModal_fund').modal('show');
			 
            if (userStatus === '출금신청') {
                $.ajax({
                    type: 'POST',
                    url: '/admin/updateFundRequest',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        transaction_id: tx_id,
                        status: "출금거절",
                        message:message
                    }),
                    success: function(data) {
						$('#declineModal').modal('hide');
                                if (data === 'success') {	
                                    // 성공 시 모달 내용 변경
                                    $('#success_header_fundRequest').removeClass("bg-danger").addClass("bg-success");
                                    $('#success_title_fundRequest').text("거절되었습니다");
                                    $('#confirmSuccessModal').modal('show'); 
                                    // 승인 완료 모달 표시
                                } else if (data === 'failed:session_closed') {
                                    // 세션 종료 시 다른 처리
                                    $('#session_alert_user').modal('show');
                                    
                                } else {
                                    // 실패 시 모달 내용 변경
                                    $('#success_header_fundRequest').removeClass("bg-success").addClass("bg-danger");
									$('#success_body_fundRequest').text(data);
                                    $('#success_title_fundRequest').text("거절실패하였습니다");
                                    $('#confirmSuccessModal').modal('show');
                                }
                            },
                    error: function(error) {
                        // 요청에 실패했을 때 수행할 동작
                        console.error('승인 요청 실패:', error);
                    },   
                });
            } else {
                console.log('이 요청은 처리할 수 없습니다. 상태: ' + userStatus);
            }
        });

    
        });
