$(document).ready(function() {
    var user_id;
    var application_id;
    var sp_product;
    $('#success_alert').on('hidden.bs.modal', function (e) {
								 location.reload(true);
					    });
     $(document).on('click', '.agree_button', function() {
		application_id = $(this).data('application-id');
        user_id = $(this).data('id');
        tel = $(this).data('tel');
        email = $(this).data('email');

        sp_product = $(this).data('sp-product');
        console.log(sp_product);
        console.log(application_id);
        console.log(user_id);
		
		    $.ajax({
                type: "POST",
                url: "/admin/insertAgreement",
                contentType: "application/json",
                data: JSON.stringify({
                    user_id: user_id,
                    contract_status: "신규계약",
                    process:"전자서명 진행중",
                    sp_product: sp_product,
                }),
                success: function (data) {
                    if (data == 'success') {
						$.ajax({
		                type: "POST",
		                url: "/admin/updateApplicationStatus",
		                contentType: "application/json",
		                data: JSON.stringify({
		                    status: '처리완료',
		                    application_id: application_id
		                }),
		                success: function(data) {	 
									if(data=='success'){
										$('#success_alert').modal('show');
			                        }
			                        else if(data='failed:session_closed'){
										$('#fail_alert').text('로그인을 다시해 주십시오.');
										$("#fail_alert").modal('show');	 	
									}
			                        else{
										$('#success_alert_title').text('승인실패');
										$("#fail_alert").modal('show');	 
									}
                            },
                    error: function(error) {
                        // 요청에 실패했을 때 수행할 동작
                        console.error('승인 요청 실패:', error);
                    },   
                });
                    } else if(data='failed:session_closed'){
										$('#fail_alert').text('로그인을 다시해 주십시오.');
										$("#fail_alert").modal('show');	 	
									}
			                        else{
										$('#success_alert_title').text('승인실패');
										$("#fail_alert").modal('show');	 
									}
                            },
                    error: function(error) {
                        // 요청에 실패했을 때 수행할 동작
                        console.error('승인 요청 실패:', error);
                    },   
            });
});
});