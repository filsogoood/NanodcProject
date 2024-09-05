$(document).ready(function() {
	
	 	var user_name; 
        var user_email; 
        var user_phone_number;
        
        $('#success_alert').on('hidden.bs.modal', function (e) {
								 location.reload(true);
					    });
		$('#fileInput_update').on('change', function (e) {
				var file = e.target.files[0];
				if (file) {
				var reader = new FileReader();
				                reader.onload = function (e) {
				                    $('#picture_update').attr('src', e.target.result).show();
				                };
				                reader.readAsDataURL(file);
				            } else {
				                $('#profilePicture').hide();
				            }
				        });
		$(document).on('click', '.detail_product', function() {		        
			 var clickedButton = $(this).parent().parent();
			$('#hw_product_name').val(clickedButton.find('.hw_product_name').text());
			$('#city').val(clickedButton.find('.city').text());
			$('#hw_product_status').val(clickedButton.find('.hw_product_status').text());
			$('#total_budget_fil').val(clickedButton.find('.total_budget_fil').text());
			$('#update_product_confirm').val($(this).val());
			$('#picture_update').attr('src', '/uploads'+$(this).attr('data-pictureUrl'));
			if($(this).attr('data-details') !=undefined){
				window.tinymce.get(0).setContent($(this).attr('data-details'));	
			}else{
				window.tinymce.get(0).setContent('');	
			}
			
			if(clickedButton.find('.recruitment_start_date').text()==""){
				$('#flexSwitchCheckUpdateA').prop("checked", true);
			}else{
				$('#flexSwitchCheckUpdateA').prop("checked", false);
			}
			
			if(clickedButton.find('.service_start_date').text()==""){
				$('#flexSwitchCheckUpdateC').prop("checked", true);
			}else{
				$('#flexSwitchCheckUpdateC').prop("checked", false);
			}
			if(clickedButton.find('.service_end_date').text()==""){
				$('#flexSwitchCheckUpdateD').prop("checked", true);
			}else{
				$('#flexSwitchCheckUpdateD').prop("checked", false);
			}
			$("#flexSwitchCheckUpdateA").trigger("click");
			$("#flexSwitchCheckUpdateC").trigger("click");
			$("#flexSwitchCheckUpdateD").trigger("click");
				
			$('#datetimepicker_update_A').val(clickedButton.find('.recruitment_start_date').text());
			$('#datetimepicker_update_C').val(clickedButton.find('.service_start_date').text());
			$('#datetimepicker_update_D').val(clickedButton.find('.service_end_date').text());
							 
			$('#detail_product_modal').modal('show');
		});
		
		
		$('#add_product_button').on('click', function() {
			$('#add_product_modal').modal('show');
		});
    
        $('#add_product_confirm').click(function(){
					var hw_product_name = $('#hw_product_name_add').val();
					var city = $('#city_add').val();
					var hw_product_status = $('#hw_product_status_add').val();
					var total_budget_fil = $('#total_budget_fil_add').val();
					var details = window.tinymce.get(1).getContent();
					var recruitment_start_date ="";
					var service_start_date ="";
					var service_end_date ="";
						
					var formData = new FormData();
					if ($("#flexSwitchCheckNewA").prop("checked")) {
			        	recruitment_start_date = $("#datetimepicker_new_A").val();
			        } 
			      
			        if ($("#flexSwitchCheckNewC").prop("checked")) {
						service_start_date = $("#datetimepicker_new_C").val();
			        } 
			        if ($("#flexSwitchCheckNewD").prop("checked")) {
						service_end_date = $("#datetimepicker_new_D").val();
			        } 
					
					formData.append('hw_product_name', hw_product_name);
					formData.append('city', city);
					formData.append('user_name', user_name);
					formData.append('recruitment_start_date', recruitment_start_date);
					formData.append('service_start_date', service_start_date);
					formData.append('service_end_date', service_end_date);
					formData.append('details',details);
					formData.append('total_budget_fil',total_budget_fil);
					formData.append('hw_product_status',hw_product_status);
            $.ajax({
								type: "POST",
							    url: "/admin/addProduct",
							    data: formData,
							    contentType: false,
							    processData: false,
							    success: function (data) {
									$("#detail_product_modal").modal('hide');	 
									if(data=='success'){
										$('#success_alert_title').text('제품수정 성공!');
										$('#success_alert').modal('show');
			                        }
			                        else if(data='failed:session_closed'){
										$('#fail_alert').text('로그인을 다시해 주십시오.');
										$("#fail_alert").modal('show');	 	
									}
			                        else{
										$('#success_alert_title').text('제품수정 실패');
										$("#fail_alert").modal('show');	 
									}
			                    }
			                });
        });          
              $('#update_product_confirm').on('click', function() { 
					var hw_product_name = $('#hw_product_name').val();
					var city = $('#city').val();
					var hw_product_status = $('#hw_product_status').val();
					var user_name = $('#user_name').val(); 
					var fileInput = $('#fileInput_update')[0].files[0];
					var total_budget_fil = $('#total_budget_fil').val();
					var details = window.tinymce.get(0).getContent();
					var recruitment_start_date ="";
				
					var service_start_date ="";
					var service_end_date ="";
					var hw_product_id = $('#update_product_confirm').val();
						
					var formData = new FormData();
					if ($("#flexSwitchCheckUpdateA").prop("checked")) {
			        	recruitment_start_date = $("#datetimepicker_update_A").val();
			        } 
			       
			        if ($("#flexSwitchCheckUpdateC").prop("checked")) {
						service_start_date = $("#datetimepicker_update_C").val();
			        } 
			        if ($("#flexSwitchCheckUpdateD").prop("checked")) {
						service_end_date = $("#datetimepicker_update_D").val();
			        } 
			        formData.append('hw_product_id', hw_product_id);
					formData.append('hw_product_name', hw_product_name);
					formData.append('city', city);
					formData.append('user_name', user_name);
					formData.append('recruitment_start_date', recruitment_start_date);
					formData.append('service_start_date', service_start_date);
					formData.append('service_end_date', service_end_date);
					formData.append('details',details);
					formData.append('total_budget_fil',total_budget_fil);
					formData.append('hw_product_status',hw_product_status);
				
					if(fileInput!=undefined){
						formData.append('file', fileInput);
					}else{
						formData.append('file', 'no_change');
					}	
					       $.ajax({
								type: "POST",
							    url: "/admin/updateProduct",
							    data: formData,
							    contentType: false,
							    processData: false,
							    success: function (data) {
									$("#detail_product_modal").modal('hide');	 
									if(data=='success'){
										$('#success_alert_title').text('제품수정 성공!');
										$('#success_alert').modal('show');
			                        }
			                        else if(data='failed:session_closed'){
										$('#fail_alert').text('로그인을 다시해 주십시오.');
										$("#fail_alert").modal('show');	 	
									}
			                        else{
										$('#success_alert_title').text('제품수정 실패');
										$("#fail_alert").modal('show');	 
									}
			                    }
			                });
					    });
            $(".flexSwitchCheck").change(function () {
                var datepicker = $(this).parent().parent().find(".flatpickr-input");
                 if ($(this).prop("checked")) {
                    datepicker.show();
                } else {
                    datepicker.hide();
                }
            });
					    
					    			    
});