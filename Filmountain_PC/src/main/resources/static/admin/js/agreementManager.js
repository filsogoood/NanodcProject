$(document).ready(function() {
    // 천 단위로 콤마 추가
    function formatNumberWithCommas(number) {
        if (number === undefined || number === null || isNaN(number)) {
            return '';
        }
        return Number(number).toLocaleString();
    }

    // 천 단위 콤마 제거
    function removeCommasFromNumber(number) {
        if (number === undefined || number === null) {
            return '';
        }
        return number.toString().replace(/,/g, '');
    }

    var UserId;
    var process;
    var systemLocation;
    var finalPayment;
    var supplyDiscountPrice;
    var supplyPrice;
    var firstPayment;
    var secondPayment;
    var lastPayment;

    $(document).on('click', '.detail-agreement-button', function() {
        UserId = $(this).data('user-id');
        process = $(this).data('process');
        contract_number = $(this).data('contract-number');
        finalPayment = $(this).data('final-payment');
        supplyDiscountPrice = $(this).data('supply-discount-price');
        supplyPrice = $(this).data('supply-price');
        firstPayment = $(this).data('first-payment');
        secondPayment = $(this).data('second-payment');
        lastPayment = $(this).data('last-payment');
        console.log(formatNumberWithCommas(supplyPrice));

        // 폼 필드에 값 설정
        $('#contract_number').val(contract_number);
        $('#final_payment').val(formatNumberWithCommas(finalPayment));
        $('#supply_discount_price').val(supplyDiscountPrice);
        $('#supply_price').val(formatNumberWithCommas(supplyPrice));
        $('#first_payment').val(formatNumberWithCommas(firstPayment));
        $('#second_payment').val(formatNumberWithCommas(secondPayment));
        $('#last_payment').val(formatNumberWithCommas(lastPayment));
        

        // 체크박스 초기화 및 설정
        $('.process-checkbox').prop('checked', false); // 모든 체크박스 초기화
        $('.process-checkbox').prop('disabled', false); // 모든 체크박스 활성화
        $('.step-label').removeClass('text-decoration-line-through'); // 모든 취소선 제거
        $('.check-icon').hide(); // 체크 아이콘 숨기기

        $('.process-checkbox').each(function() {
            if ($(this).val() === process) {
                $(this).prop('checked', true);
                disableAndStrikePreviousSteps(this); // 현재 단계에 따라 이전 단계 비활성화 및 체크 아이콘 추가
            }
        });

        $('#detail_agreement_modal').modal('show');
    });

    // 체크박스를 클릭할 때 다른 체크박스를 해제
    $(document).on('change', '.process-checkbox', function() {
        if ($(this).is(':checked')) {
            $('.process-checkbox').not(this).prop('checked', false);
        }
    });

    function disableAndStrikePreviousSteps(currentStep) {
        console.log('disableAndStrikePreviousSteps 호출됨');
        var stepOrder = [ '전자서명 진행중', '계약서 검토중', '계약금 입금 확인중','중도금 입금 확인중','잔금 입금 확인중', '계약완료'];
        var currentIndex = stepOrder.indexOf($(currentStep).val());
        console.log('현재 단계 인덱스:', currentIndex);
        $('.process-checkbox').each(function() {
            var stepIndex = stepOrder.indexOf($(this).val());
            if (stepIndex < currentIndex) {
                $(this).prop('disabled', true);
                $(this).next('.step-label').addClass('text-decoration-line-through');
                $(this).next('.step-label').find('.check-icon').show();
                console.log('취소선 추가 및 체크박스 비활성화됨:', $(this).val());
            }
        });
        feather.replace(); // Feather icons 업데이트
    }

    $('#calculate_button').on('click', function() {
        supplyPrice = parseFloat(removeCommasFromNumber($('#supply_price').val()));
        supplyDiscountPrice = parseFloat($('#supply_discount_price').val());

        if (isNaN(supplyPrice) || isNaN(supplyDiscountPrice)) {
            alert('모든 값을 올바르게 입력해 주세요.');
            return;
        }

        var discountAmount = supplyPrice * (supplyDiscountPrice / 100);
        finalPayment = supplyPrice - discountAmount;

        $('#final_payment').val(formatNumberWithCommas(finalPayment));
    });

    $('#update_agreement_confirm').on('click', function() {
				
				if (firstPayment + secondPayment + lastPayment !== finalPayment) {
					$('#fail_alert_title').text('금액 총합이 맞지 않습니다.');  // 모달 제목 업데이트
					$("#fail_alert").modal('show');
		    	return;
				}
		       

		        process = $('input[name="process"]:checked').val();

			 	if(process=="계약완료"){
					 
					 $.ajax({
                    type: 'POST',
                    url: '/admin/agreementUpdate',
                    contentType: "application/json",
			                    data: JSON.stringify({
							        user_id: UserId,
						            process: process,
						            contract_status: "계약완료",
						            system_location: $('#system_location').val() || null,
		            				final_payment: removeCommasFromNumber($('#final_payment').val()) || null, // 콤마 제거 및 null 처리
		            				supply_discount_price: $('#supply_discount_price').val() || null, // null 처리
		            				supply_price: removeCommasFromNumber($('#supply_price').val()) || null ,// 콤마 제거 및 null 처리
		            				first_payment: removeCommasFromNumber($('#first_payment').val()) || null ,
		            				second_payment: removeCommasFromNumber($('#second_payment').val()) || null ,
		            				last_payment: removeCommasFromNumber($('#last_payment').val()) || null 
				            // 필요한 다른 필드들을 추가
							    }),
                    success: function(data) {
                               $("#detail_product_modal").modal('hide');	 
									if(data=='success'){
										$('#success_alert').modal('show');
			                        }
			                        else if(data='failed:session_closed'){
										$('#fail_alert').text('로그인을 다시해 주십시오.');
										$("#fail_alert").modal('show');	 	
									}
			                        else{
										$('#success_alert_title').text('업데이트 실패');
										$("#fail_alert").modal('show');	 
									}
                            },
                    error: function(error) {
                        // 요청에 실패했을 때 수행할 동작
                        console.error('승인 요청 실패:', error);
                    },   
                });
				 }
				 else{
			 		
					$.ajax({
                    type: 'POST',
                    url: '/admin/agreementUpdate',
                     contentType: "application/json",
			                    data: JSON.stringify({
							    user_id: UserId,
					            process: process,
					            system_location: $('#system_location').val() || null,
		            			final_payment: removeCommasFromNumber($('#final_payment').val()) || null, // 콤마 제거 및 null 처리
		            			supply_discount_price: $('#supply_discount_price').val() || null, // null 처리
		            			supply_price: removeCommasFromNumber($('#supply_price').val()) || null, // 콤마 제거 및 null 처리
		            			first_payment: removeCommasFromNumber($('#first_payment').val()) || null ,
		            			second_payment: removeCommasFromNumber($('#second_payment').val()) || null ,
		            			last_payment: removeCommasFromNumber($('#last_payment').val()) || null 
			            // 필요한 다른 필드들을 추가
				            // 필요한 다른 필드들을 추가
							    }),
                    success: function(data) {
                               $("#detail_product_modal").modal('hide');	 
									if(data=='success'){
										$('#success_alert').modal('show');
			                        }
			                        else if(data='failed:session_closed'){
										$('#fail_alert').text('로그인을 다시해 주십시오.');
										$("#fail_alert").modal('show');	 	
									}
			                        else{
										$('#success_alert_title').text('보상 지급 실패');
										$("#fail_alert").modal('show');	 
									}
                            },
                    error: function(error) {
                        // 요청에 실패했을 때 수행할 동작
                        console.error('승인 요청 실패:', error);
                    },   
                });
                };
        });
        
        
        $('#update_properties').on('click', function() {
        firstPayment = removeCommasFromNumber($('#first_payment').val());
        secondPayment = removeCommasFromNumber($('#second_payment').val());
        lastPayment = removeCommasFromNumber($('#last_payment').val());
        finalPayment = removeCommasFromNumber($('#final_payment').val());

        if (parseInt(firstPayment) + parseInt(secondPayment) + parseInt(lastPayment) != parseInt(finalPayment)) {
		    debugger;
		    $('#fail_alert_title').text('금액 총합이 맞지 않습니다.');  // 모달 제목 업데이트
		    $("#fail_alert").modal('show');
		    return;
		}



        $.ajax({
            type: 'POST',
            url: '/admin/agreementUpdate',
            contentType: "application/json",
            data: JSON.stringify({
                user_id: UserId,
                system_location: $('#system_location').val() || null,
                final_payment: finalPayment || null,
                supply_discount_price: $('#supply_discount_price').val() || null,
                supply_price: removeCommasFromNumber($('#supply_price').val()) || null,
                first_payment: firstPayment || null,
                second_payment: secondPayment || null,
                last_payment: lastPayment || null
            }),
            success: function(data) {
                $("#detail_product_modal").modal('hide');
                if (data === 'success') {
                    $('#success_alert').modal('show');
                } else if (data === 'failed:session_closed') {
                    $('#fail_alert_title').text('로그인을 다시 해 주십시오.');
                    $("#fail_alert").modal('show');
                } else {
                    $('#fail_alert_title').text('업데이트 실패');
                    $("#fail_alert").modal('show');
                }
            },
            error: function(error) {
                console.error('요청 실패:', error);
            }
        });
    });
                
                
    $('#receipt_update').on('click', function() {
        location.reload();
    });
    //계약서 다운로드 링크
    $('#downloadContractButton').on('click', function() {

        if ( process == "계약금 입금 확인중" || process == "중도금 입금 확인중" || process == "잔금 입금 확인중" || process == "계약완료") {
            var url = `https://app.nanodc.info/docs/${UserId}_contract.pdf`;
            window.location.href = url;
        } else {
       		$('#fail_alert_title').text('계약서를 작성하지 않았습니다.');
            $("#fail_alert").modal('show');	 
        }
    });
});
