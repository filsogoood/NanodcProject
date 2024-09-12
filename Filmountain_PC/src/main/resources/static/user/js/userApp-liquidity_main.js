$(document).ready(function() {
    
    var user_id;
    var user_name;
    var phone_number;
    var isIdentityVerified = false; // 본인 인증 완료 여부를 체크하는 변수
    var wallet_id;
   
    
    const safeParseFloat = (value) => {
    const parsedValue = parseFloat(value.replace(/,/g, '').trim());
    return isNaN(parsedValue) ? 0 : parsedValue;
  };

  const a = safeParseFloat($('#fil_price').text()); // FIL 현재가격
  const b = safeParseFloat($('#deposit_price').text()); 
  const c = safeParseFloat($('#staking-amount').text()); // Liquidity 총 수량

  const d = b * c; // 총 투자 금액
  const e = safeParseFloat($('#reward').text()); // 수익 (FIL)
  const locked_fil = safeParseFloat($('#locked_amount').text());
  const stub = safeParseFloat($('#staking-amount').text()) - locked_fil ;
  const f = (c !== 0) ? (e / c) * 100 : 0; // 수익비율
  const g = d + (e * a); // 총 자산
  const avg = (c !== 0) ? g / c : 0; // 평균단가
  const h = (d !== 0) ? (g / d) * 100 : 0; // 총 수익 비율
  const zfil = safeParseFloat($('#staking-amount').text());

  // 계산된 값을 HTML 요소에 할당
  $('#fil_price').text(Math.round(a).toLocaleString() + '원');
  $('#deposit_price').text(Math.round(avg).toLocaleString() + '원');
  $('#total-cash').text(Math.round(d).toLocaleString() + '원');
  $('#staking-amount').text(Math.round(zfil).toLocaleString() + ' FIL');
  $('#unstake-amount').text(Math.round(stub).toLocaleString() + ' FIL');
  $('#locked_amount').text(Math.round(locked_fil).toLocaleString() + ' FIL');
  $('#zfil_amount').text(Math.round(zfil).toLocaleString() + ' FIL');

  if (e === 0) { 
    $('#reward').text('0 FIL');
  } else {
    $('#reward').html(`${e.toFixed(2)} FIL (${f.toFixed(2)}%)`);
  }

  $('#total_cash_amount').text(Math.round(g).toLocaleString() + '원');
  $('#total_reward_ratio').html(`${h.toFixed(2)}%`);
	
  $('#deposit-btn').click(function() {
		 user_id = $(this).data('user-id');
		 wallet = $(this).data('wallet-id');
				
        $('#liquidity_modal').modal('show');
        console.log(user_id)
        console.log(wallet);
    });
    
     $('#withdraw-btn').click(function() {
		 user_id = $(this).data('user-id');
		 wallet = $(this).data('wallet-id');
		 
		 if ( Math.round(stub).toLocaleString() == 0){
			 alert("출금 가능한 FIL이 없습니다.");
			 return;
		 }
		 
        $('#Withdraw_modal').modal('show');
    });
    $('#liquidity_modal_confirm').click(function() {
        $('#success_alert').modal('show');
    });
    
    $('#call-wallet-btn').click(function() {
    user_id = $(this).data('user-id');
    
    $.ajax({
        type: "POST",
        url: "/api/generate-key", // 내부 백엔드 엔드포인트
        contentType: "application/json",
        data: JSON.stringify({
            userId: user_id
        }),
        success: function(response) {
            console.log(response);
            if (response.success == true) {
                $('#success_alert_title').text('발급 완료');
                $('#success_alert').modal('show');
                $('#success_alert_confirm').on('click', function() {
                    location.reload(); // 현재 페이지를 새로고침
                });
            } else if (response.success == false) {
                $('#fail_alert_title').text(response.message); // 실패 메시지 표시
                $("#fail_alert").modal('show');
            } else {
                $('#success_alert_title').text('신청 실패');
                $('#fail_alert_message').text(response.message); // 실패 메시지 표시
                $("#fail_alert").modal('show');
            }
        }
    });
});


    $('#liquidity_modal_confirm').click(function(){
						console.log(wallet);
						var fil_amount=$('#new_transaction_fil_amount').val();
						var outside_address=$('#outside_address_input').val();
						console.log(user_id)
						if (!fil_amount || parseFloat(fil_amount) <= 0) {
					        $('#fail_alert_title').text('수량을 입력해주세요.');
					        $("#fail_alert").modal('show');
					        return;  // 조건이 충족되지 않으면 진행하지 않음
					    }
					
					    // outside_address가 null 또는 빈 문자열인 경우 요청을 중단
					    if (!outside_address) {
					        $('#fail_alert_title').text('입금주소를 입력해주세요.');
					        $("#fail_alert").modal('show');
					        return;  // 조건이 충족되지 않으면 진행하지 않음
					    }
            			$.ajax({
						    type: "POST",
						    url: "/addNewLPTransaction",
						    contentType: "application/json", 
						    data: JSON.stringify({
						        fil_amount: fil_amount,
						        user_id: user_id,
						        status: "입금신청",
						        wallet_id: wallet,
						        type: "Liquidity",
						        outside_address : outside_address
						    }),
						    success: function (data) {
								
						        $("#detail_product_modal").modal('hide');
						        if (data === 'success') {
						            $('#success_alert').modal('show');
						        } else if (data === 'failed:session_closed') {
						            $('#fail_alert').text('로그인을 다시해 주십시오.');
						            $("#fail_alert").modal('show');
						        } else {
						            $('#success_alert_title').text('신청 실패');
						            $("#fail_alert").modal('show');
						        }
						    }
						});

        			});
        			
 // 출금 신청 확인 버튼 클릭 시
    $('#withdraw_modal_confirm').click(function() {
		user_name = $(this).data('user-name');
        phone_number = $(this).data('phone-number')
        if (!isIdentityVerified) {
			$('#verify_name').val(user_name).attr('readonly', true);
        	$('#verify_phone').val(phone_number).attr('readonly', true);
            $('#Withdraw_modal').modal('hide');
            $('#identityVerificationModal').modal('show');
            
        } else {
            submitWithdrawTransaction();
        }
    });

    // 본인 인증 시작 버튼 클릭 시
    $('#startIdentityVerification').click(function() {
        var name = $('#verify_name').val();
        var birthdate = $('#verify_birthdate').val();
        var phone = $('#verify_phone').val();

        if (!birthdate) {
            $('#identityVerificationFailMessage').text("생년월일을 입력해주세요.");
            $('#identityVerificationFailModal').modal('show');
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
                        $('#Withdraw_modal').modal('show');
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

    function submitWithdrawTransaction() {
        var fil_amount = $('#withraw_filamount').val();
        var outside_address = $('#withdraw_wallet_input').val();
        console.log(user_id);

        // AJAX 요청으로 출금 신청 처리
        $.ajax({
            type: "POST",
            url: "/addNewLPTransaction",
            contentType: "application/json",
            data: JSON.stringify({
                fil_amount: fil_amount,
                user_id: user_id,
                status: "출금신청",
                wallet_id: wallet,
                type: "Liquidity",
                outside_address: outside_address
            }),
            success: function(data) {
                if (data === 'success') {
                    $('#success_alert').modal('show');
                } else if (data === 'failed:session_closed') {
                    $('#fail_alert_title').text('로그인을 다시해 주십시오.');
                    $("#fail_alert").modal('show');
                } else {
                    $('#fail_alert_title').text('신청 실패');
                    $("#fail_alert").modal('show');
                }
            }
        });
    }        			

  
});
