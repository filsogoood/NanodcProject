$(document).ready(function() {
	
	 	var user_name; 
        var user_email; 
        var user_phone_number; 
        var user_password; 
        var user_hw_id;
        var user_id;
    // jQuery code executes after the document is fully loaded
    
    // Click event for the button with id 'create_user'
    $('#create_user').click(function(){
        // Show the modal with id 'upload_user'
        $('#upload_user').modal('show');
        
        // Get values from input fields
       
		
       
    });
    
$(document).on('click', '.detail_user', function() {
							var clickedButton = $(this);
							$('#join_date_p').text(clickedButton.parent().parent().find('.user_reg_date').text());
							$('#user_name_span').text(clickedButton.parent().parent().find('.user_name').text());
							$('#user_email_span').text(clickedButton.parent().parent().find('.user_email').text());
							$('#user_phone_span').text(clickedButton.parent().parent().find('.user_phone').text());
							$('#user_name').val(clickedButton.parent().parent().find('.user_name').text());
							$('#user_email').val(clickedButton.parent().parent().find('.user_email').text());
							$('#user_phone').val(clickedButton.parent().parent().find('.user_phone').text());
							$('#level').val(clickedButton.parent().parent().find('.level').text())
						    user_id = clickedButton.data('user-id');
						    console.log('User ID:', user_id);
							
						
	
							
		

							if(clickedButton.parent().parent().find('.user_status').text()=='active'){
								$('input[name="user_status"][value="active"]').prop('checked', true);
							}else{
								$('input[name="user_status"][value="inactive"]').prop('checked', true);
							}	
								
							 $.ajax({
			                    type: "POST",
			                    url: "/admin/selectInvestmentListForUser",
			                    contentType: "application/json",
			                    data: user_id.toString(),
			                    success: function (data) {
									$("#investment_user_table").find('tbody').empty();
									
									data.forEach(function(item) {
										var date = new Date(item.hw_reg_date);
									    var formattedDate = date.getFullYear() + '-' +
									                        ('0' + (date.getMonth() + 1)).slice(-2) + '-' +
									                        ('0' + date.getDate()).slice(-2);
									    var newRow = '<tr>' +
									        '<td align="center" id="update_purchase_date">' + formattedDate + '</td>' +
									        '<td align="center" id="update_product_name" data-user_id="'+  item.hw_product_id+ '">' + item.hw_product_name + '</td>' +
 									     	'<td align="center" id="update_status">' + item.hw_status + '</td>' +
 									        '<td align="center" id="update_fil_invested">' + item.hw_invest_fil + '</td>' +

									        '<td align="center"><button type="button" id=hw_id_button class="btn btn-secondary btn-sm m-1 update_user_investment_button" value="' + item.hw_id + '">수정</button>'+
 									        '</td></tr>';
									    $("#investment_user_table").append(newRow);
									});
									
			                    }
			                });
							$('#detail_user_modal').modal('show');
							
					    });
					    $('#user_investment_add').on('click', function() {
							   var hw_reg_date = $("#datetimepicker_invst").val();
 						       var fil_invested = $('#node_fil').val();
 						       var hw_product_id = $('#selectBox_product').val();;
						       console.log(user_id);
							   if(hw_reg_date==""||hw_product_id==""){
										if ($('#alert_header_user').hasClass("bg-success")) 
										{
								            $('#alert_header_user').removeClass("bg-success").addClass("bg-danger");
							       		} 			
							       		 $('#alert_title_user').text("모든 데이터를 입력해 주십시오.");
								         $('#alert_modal_user').modal('show');
								         return;
							   }
							   $.ajax({
			                    type: "POST",
			                    url: "/admin/addNewInvestment",
			                    contentType: "application/json",
			                    data: JSON.stringify({
							        hw_reg_date: hw_reg_date,
							        hw_status:"active",
							        hw_invest_fil: fil_invested,
							        hw_product_id : hw_product_id,
							        user_id  : user_id
							    }),
			                    success: function (data) {
									$('#add_user_modal').modal('hide');
									if(data=='success'){
										if ($('#alert_header_user').hasClass("bg-danger")) 
											{
							            		$('#alert_header_user').removeClass("bg-danger").addClass("bg-success");
							       		 	} 
										$('#alert_title_user').text("상품투자 등록 성공");
										$('#alert_modal_user').modal('show');
			                        }
			                        else if(data='failed:session_closed'){	
										$('#session_alert_user').modal('show');
									}
			                        else{
										if ($('#alert_header_user').hasClass("bg-success")) 
										{
								            $('#alert_header_user').removeClass("bg-success").addClass("bg-danger");
							       		} 			
							       		 $('#alert_title_user').text("상품투자 정보 등록 실패 : 중복된 제품명 또는 같은 정보");
								            $('#alert_modal_user').modal('show');
									}
			                    	}
			                	});  
							});
							
								

							
					     $('#user_update_confirm').on('click', function() {     
							   var user_name = $("#user_name").val();
						       var user_email = $('#user_email').val();
						       var user_phone = $('#user_phone').val();
						       var user_status = $('input[name="user_status"]:checked').val();
						       var level = $("#level").val();
						       var user_id = $('#user_edit_1_btn').val(); 
						       var product = $(this).data('product');
						       //var fileInput = $('#fileInput')[0].files[0];
					
						       var formData = new FormData();
						      
								formData.append('user_email', user_email);
								formData.append('phone_number', user_phone);
								formData.append('user_name', user_name);
								formData.append('user_status', user_status);
								formData.append('user_id', user_id); 
								formData.append('level', level); 
								formData.append('product', product); 
								/*if(fileInput!=undefined){
									formData.append('file', fileInput);
								}else{
									formData.append('file', 'no_change');
								}*/
								
					       $.ajax({
								type: "POST",
							    url: "/admin/updateUser",
							    data: formData,
							    contentType: false,
							    processData: false,
							    success: function (data) {
									$('#detail_user_modal').modal('hide');
									if(data=='success'){
										if ($('#alert_header_user').hasClass("bg-danger")) 
											{
							            		$('#alert_header_user').removeClass("bg-danger").addClass("bg-success");
							       		 	} 
										$('#alert_title_user').text("회원 정보 수정 완료");
										$('#alert_modal_user').modal('show');

			                        }
			                       /* else if(data='failed:session_closed'){
										
										$('#session_alert_user').modal('show');
									}*/
			                        else{
										if ($('#alert_header_user').hasClass("bg-success")) 
										{
								            $('#alert_header_user').removeClass("bg-success").addClass("bg-danger");
							       		} 			
							       		 $('#alert_title_user').text("회원 정보 수정 실패");
								            $('#alert_modal_user').modal('show');
									}
			                    }
			                });
					    });
					    
 							 $(document).on('click', '.update_user_investment_button', function() {
				
							  var hw_id = $(this).val();
						      var clicked= $(this).parent().parent();

 						        $('#update_user_investment').modal('show');
						          $('#datetimepicker_invst_a').val(clicked.find('#update_purchase_date').text());
								$('#selectBox_status_update').val(clicked.find('#update_status').text());
								$('#selectupdate_product').val(clicked.find('#update_product_name').data('user_id'));
								$('#node_fil_update').val(clicked.find('#update_fil_invested').text());
								$('#user_investment_update').data('hw_id', hw_id);
 						    });
 								
							$('#user_investment_update').on('click', function() {
							   var hw_reg_date = $("#datetimepicker_invst_a").val();
						       var fil_invested = $('#node_fil_update').val();
						       var hw_product_id = $('#selectupdate_product').val();
						       var hw_status = $('#selectBox_status_update').val();
						       var user_hw_id = $(this).data('hw_id');			       	   		
							   if(hw_reg_date==""||hw_product_id==""){
										if ($('#alert_header_user').hasClass("bg-success")) 
										{
								            $('#alert_header_user').removeClass("bg-success").addClass("bg-danger");
							       		} 			
							       		 $('#alert_title_user').text("모든 데이터를 입력해 주십시오.");
								         $('#alert_modal_user').modal('show');
								         return;
							   }
							   $.ajax({
			                    type: "POST",
			                    url: "/admin/updateInvestmentUser",
			                    contentType: "application/json",
			                    data: JSON.stringify({
							        hw_reg_date: hw_reg_date,
							        hw_status:hw_status,
							        hw_invest_fil: fil_invested,
							        hw_product_id : hw_product_id,
							        hw_id  : user_hw_id
							    }),
			                    success: function (data) {
									$('#add_user_modal').modal('hide');
									if(data=='success'){
										if ($('#alert_header_user').hasClass("bg-danger")) 
											{
							            		$('#alert_header_user').removeClass("bg-danger").addClass("bg-success");
							       		 	} 
										$('#alert_title_user').text("상품 수정 성공");
										$('#alert_modal_user').modal('show');
			                        }
			                        else if(data='failed:session_closed'){	
										$('#session_alert_user').modal('show');
									}
			                        else{
										if ($('#alert_header_user').hasClass("bg-success")) 
										{
								            $('#alert_header_user').removeClass("bg-success").addClass("bg-danger");
							       		} 			
							       		 $('#alert_title_user').text("상품 수정 실패 : 중복된 제품명 또는 같은 정보");
								            $('#alert_modal_user').modal('show');
									}
			                    	}
			                	});  
							});
			
					   
					   $('#add_user_investment_button').on('click', function() {
					       $('#add_user_investment').modal('show');
					    });
					    $(document).on('click', '.delete_user_investment_button', function() {
							$('#investment_delete').val($(this).val());
						    $('#delete_user_investment').modal('show'); 
						});
						
						
						 $('#user_pw_reset_btn').on('click', function() {
							 $('#alert_modal_user_pw_reset').modal('show'); 
						 });
						 $('#user_edit_1_btn').on('click', function() {		 
							 $('#alert_modal_user_update').modal('show'); 
						});
						 $('#user_pw_reset_confirm').on('click', function() {
							 var user_id = $('#user_edit_1_btn').val(); 
							 var user_password = $('#new_password').val();

			
							 
							  $.ajax({
								type: "POST",
							    url: "/admin/userPwReset",
							    contentType: "application/json",
			                    data: JSON.stringify({
							        user_id: user_id,
							        password: user_password
							    }),
							    success: function (data) {
									$('#detail_user_modal').modal('hide');
									if(data=='success'){
										if ($('#alert_header_user').hasClass("bg-danger")) 
											{
							            		$('#alert_header_user').removeClass("bg-danger").addClass("bg-success");
							       		 	} 
										$('#alert_title_user').text("회원 비밀번호 초기화 완료");
										$('#alert_modal_user').modal('show');
			                        }
			                       /* else if(data='failed:session_closed'){
										
										$('#session_alert_user').modal('show');
									}*/
			                        else{
										if ($('#alert_header_user').hasClass("bg-success")) 
										{
								            $('#alert_header_user').removeClass("bg-success").addClass("bg-danger");
							       		} 			
							       		 $('#alert_title_user').text("회원 비밀번호 초기화 실패");
								            $('#alert_modal_user').modal('show');
									}
			                    }
			                });
						});
    
    
    
     // Click event for the button with id 'register_user' inside the 'create_user' click event
        $('#register_user').click(function(){

			user_name = $('#user_name_a').val(); 
       		user_email = $('#user_email_a').val(); 
        	user_phone_number = $('#user_phone_a').val(); 
        	user_password = $('#user_password').val();
        	level = $('#level_input').val();
        	contract_status = $('#contract_status').val();
        	product = $('#product').val();

            // AJAX request
            $.ajax({
                type: "POST",
                url: "/admin/addNewUser",
                contentType: "application/json",
                data: JSON.stringify({
                    user_name: user_name,
                    user_email: user_email,
                    phone_number: user_phone_number,
                    level : level,
                    user_status: "active",
                    password: user_password,
                    contract_status: contract_status,
                    product: product
                }),
                success: function (data) {
                    // Hide the 'upload_user' modal
                    $('#upload_user').modal('hide');

                    // Check the response and update modal accordingly
                    if (data == 'success') {
                        if ($('#alert_header_user').hasClass("bg-danger")) {
                            $('#alert_header_user').removeClass("bg-danger").addClass("bg-success");
                        } 
                        $('#alert_title_user').text("회원 등록 완료");
                        $('#alert_modal_user').modal('show');
                    } else if (data == 'failed:session_closed') {
                        $('#session_alert_user').modal('show');
                    } else {
                        if ($('#alert_header_user').hasClass("bg-success")) {
                            $('#alert_header_user').removeClass("bg-success").addClass("bg-danger");
                        } 
                        $('#alert_title_user').text("회원 등록 실패");
                        $('#alert_modal_user').modal('show');
                    }
                }
            });
        });
        $('#receipt_update').on('click', function() {
    location.reload();
});
});
