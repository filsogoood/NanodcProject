
	$(document).ready(function() {
		var user_id
		var isIdentityVerified = false; // 본인 인증 완료 여부를 체크하는 변수
		var total_reward_fil = Math.floor($('#total_reward_fil').text());
		var user_name
		var phone_number
		$('#total_reward_fil').text(total_reward_fil);
		$('#total_reward_fil').show();

	
		    
				$('#success_alert').on('hidden.bs.modal', function (e) {
								 window.location.reload();});  
				$('#addNewTransactionPayout').on('click', function() {
					user_id = $(this).data('user-id');
					user_name = $(this).data('user-name');
        			phone_number = $(this).data('phone-number')
        			// console.log(user_name);
        			//console.log(user_id);
        			
        			if (total_reward_fil == 0){
						alert("출금 가능한 FIL이 없습니다.");
					}
					$('#addNewTransactionPayout_modal').modal('show');});

				$('#walletManager').on('click', function() {
					user_id = $(this).data('user-ids');
					$('#walletManager_modal').modal('show');});
					
					
	$('#addNewTransactionPayout_confirm').click(function() {
		
       
        if (!isIdentityVerified) {
            $('#addNewTransactionPayout_modal').modal('hide');
            $('#verify_name').val(user_name).attr('readonly', true);
        	$('#verify_phone').val(phone_number).attr('readonly', true);
            $('#identityVerificationModal').modal('show');
        } else {
            submitTransaction();
        }
    });			// 본인 인증 시작 버튼 클릭 시
    $('#startIdentityVerification').click(function() {
        var name = $('#verify_name').val();
        var birthdate = $('#verify_birthdate').val();
        var phone = $('#verify_phone').val();

        if (!name || !birthdate || !phone) {
            alert("이름, 생년월일, 핸드폰 번호를 모두 입력해주세요.");
            return;
        }

        var identityData = {
            name: name,
            dob: birthdate,
            tel: phone.replace(/-/g, '')
        };

        // 본인 인증 요청
        $.ajax({
            url: "/kakaocert/requestIdentity",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(identityData),
            success: function(identityReceipt) {
                $('#identityVerificationModal').css('z-index', 900); 
                $('.modal-backdrop').remove();

                $('#identityVerificationRequestModal').modal('show');
                $('#identityVerificationRequestConfirm').on('click', function () {
                    checkIdentityStatus(identityReceipt.receiptID);
                });
            },
            error: function() {
                $('#identityVerificationFailMessage').text("본인 인증 요청 중 오류가 발생했습니다.");
                $('#identityVerificationFailModal').modal('show');
            }
        });
    });

	    function checkIdentityStatus(requestId) {
	        // 본인 인증 상태 확인
	        $.ajax({
	            url: `/kakaocert/checkIdentityStatus?requestId=${requestId}`,
	            type: "GET",
	            success: function(statusData) {
	                if (statusData.status === 1 && statusData.completeDT) {
	                    $('#identityVerificationSuccessModal').modal('show');
	                    $('#identityVerificationSuccessConfirm').on('click', function () {
	                        isIdentityVerified = true;
	                        $('#identityVerificationModal').modal('hide');
	                        $('#addNewTransactionPayout_modal').modal('show');
	                    });
	                } else if (statusData.status === 2) {
	                    $('#identityVerificationFailMessage').text("본인 인증이 만료되었습니다.");
	                    $('#identityVerificationFailModal').modal('show');
	                } else {
	                    $('#identityVerificationFailMessage').text("본인 인증이 완료되지 않았습니다. 다시 시도해주세요.");
	                    $('#identityVerificationFailModal').modal('show');
	                }
	            },
	            error: function() {
	                $('#identityVerificationFailMessage').text("본인 인증 상태 확인 중 오류가 발생했습니다.");
	                $('#identityVerificationFailModal').modal('show');
	            }
	        });
	    }
        			function submitTransaction() {
					        var wallet = $('#wallet_new_transaction_option').val();
					        var fil_amount = $('#new_transaction_fil_amount').val();
					
					        // 트랜잭션 제출
					        $.ajax({
					            type: "POST",
					            url: "/addNewTransaction",
					            contentType: "application/json",
					            data: JSON.stringify({
					                fil_amount: fil_amount,
					                user_id: user_id,
					                status: "출금신청",
					                wallet_id: wallet,
					                type: "출금신청"
					            }),
					            success: function (data) {
					                $("#detail_product_modal").modal('hide');
					                if (data === 'success') {
					                    $('#success_alert_title').text('송금신청 완료');
					                    $('#success_alert').modal('show');
					                } else if (data === 'failed:session_closed') {
					                    $('#fail_alert').text('로그인을 다시해 주십시오.');
					                    $("#fail_alert").modal('show');
					                } else {
					                    $('#success_alert_title').text('송금신청 실패');
					                    $("#fail_alert").modal('show');
					                }
					            }
					        });
					    }
        			 $('#deleteWallet_confirm').click(function(){
						 console.log(user_id);
            			$.ajax({
			                    type: "POST",
			                    url: "/addspWallet",
			                    contentType: "application/json",
			                    data: JSON.stringify({
							        user_id: user_id,
							        sp_address: null
							    }),
			                    success: function (data) {
										$("#detail_product_modal").modal('hide');	 
									if(data=='success'){
										$('#success_alert_title').text('지갑삭제 완료');
										$('#success_alert').modal('show');}
			                        else if(data='failed:session_closed'){
										$('#fail_alert').text('로그인을 다시해 주십시오.');
										$("#fail_alert").modal('show');}
			                        else{
										$('#success_alert_title').text('지갑삭제 실패');
										$("#fail_alert").modal('show');}}
			                	});  
       						});
        			$('#addNewWallet_confirm').click(function(){
						var sp_address =$("#new_wallet_addr").val();
				
						console.log(user_id);
            			$.ajax({
			                    type: "POST",
			                    url: "/addspWallet",
			                    contentType: "application/json",
			                    data: JSON.stringify({
							        user_id: user_id,
							        sp_address: sp_address
							        
							    }),    
			                    success: function (data) {	
									$("#detail_product_modal").modal('hide');	 
									if(data=='success'){
										$('#success_alert_title').text('유저 새지갑 등록 성공');
										$('#success_alert').modal('show');}
			                        else{
										$('#success_alert_title').text('유저 새지갑 등록 실패');
										$("#fail_alert").modal('show');}
			                    	}
			                	});  
					        });                
						});						
						
						
					