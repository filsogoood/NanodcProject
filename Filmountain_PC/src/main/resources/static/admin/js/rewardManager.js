$(document).ready(function() {
		$('#dataTableContainer').show();
						 $('#alert_modal_payout').on('hidden.bs.modal', function (e) {
							 if ($('#alert_header_payout').hasClass("bg-success")){
								 location.reload(true);
							 } 
					      });			
						$(document).on('click', '.detail_reward', function() {
							var reward_sharing_id = $(this).val();
							$.ajax({
			                    type: "POST",
			                    url: "/admin/selectRewardSharingDetailListById",
			                    contentType: "application/json",
			                    data: reward_sharing_id,
			                    success: function (data) {
									$("#reward_detail_table").find('tbody').empty();
									data.forEach(function(item) {
									    var newRow = '<tr>' +
									        '<td align="center" id="update_purchase_date">' + item.userInfoVO.user_email + '</td>' +
									        '<td align="center" id="update_purchase_size">' + item.userInfoVO.user_name + '</td>' +
									        '<td align="center" id="update_fil_invested">' + item.reward_fil + '</td></tr>';
									    $("#reward_detail_table").append(newRow);
									    console.log(item.userInfoVO.user_email);
									});
									
			                    }
			                });
					       $('#reward_detail_list_modal').modal('show');
					    });	
					    $('.payout_update').on('click', function() {
							$("#payout_update_confirm_btn").val($(this).val());
							$('#payout_fil_per_tb').val($(this).parent().parent().find('#paid_per_tb_td').text());
							$('#original_fil_per_tb').val($('#payout_fil_per_tb').val());
							if($(this).parent().parent().find('#status_td').text()=='정상'){
								$('input[name="payout_status"][value="정상"]').prop('checked', true);
							}else{
								$('input[name="payout_status"][value="취소"]').prop('checked', true);
							}		
					       $('#payout_update_modal').modal('show');
					    });	
						$('#payout_btn').on('click', function() {
			$('#payout_modal').modal('show');
		});

         $('#payout_confirm_button').on('click', function() {
			 	var hw_product_id =  $('#hw_product_id').val();
			 	var total_fil = $('#total_fil').val();
							  $.ajax({
                    type: 'POST',
                    url: '/admin/payout',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        hw_product_id: hw_product_id,
                        total_fil: total_fil,
                        status: "active"
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
        });
});
