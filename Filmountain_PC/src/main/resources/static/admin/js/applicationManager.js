$(document).ready(function() {
    var name;
    var tel;
    var email;
    var level;
    var application_id;
    var sp_product;
    
     $(document).on('click', '.agree_button', function() {
		application_id = $(this).data('application-id');
        name = $(this).data('name');
        tel = $(this).data('tel');
        email = $(this).data('email');
        level = $(this).data('level');
        sp_product = $(this).data('sp-product');
        console.log(application_id);
		    $.ajax({
                type: "POST",
                url: "/admin/addNewUser",
                contentType: "application/json",
                data: JSON.stringify({
                    user_name: name,
                    user_email: email,
                    phone_number: tel,
                    level : level,
                    user_status: "active",
                    password: '123123',
                    contract_status: "신규계약",
                    product: sp_product
                }),
                success: function (data) {
                    if (data == 'success') {
						$.ajax({
		                type: "POST",
		                url: "/admin/updateApplicationStatus",
		                contentType: "application/json",
		                data: JSON.stringify({
		                    status: 'receipt',
		                    application_id: application_id
		                }),
		                success: function(data) {	 
									if(data=='success'){
										$('#success_alert').modal('show');
										location.reload();
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