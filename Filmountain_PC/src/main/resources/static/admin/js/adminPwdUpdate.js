$(document).ready(function () {
    $("#update_user_password_confirm").click(function () {
        var admin_id = $("#userId").val();
        var originalPassword = $("#original_password").val();
        var newPassword = $("#user_password").val();
        var newPasswordRepeat = $("#user_password_repeat").val();
        // Check for null values
        if (originalPassword === null || newPassword === null || newPasswordRepeat === null) {
            $("#alert_span").text("입력값을 확인해주십시오")
            return;
        }

        // Check if originalPassword and newPassword are the same
        if (originalPassword === newPassword) {
            $("#alert_span").text("새로운 비밀번호는 이전 비밀번호와 다르게 설정해야 합니다.")
            return;
        }

        // Check if newPassword and newPasswordRepeat are not the same
        if (newPassword !== newPasswordRepeat) {
            $("#alert_span").text("새로운 비밀번호와 확인 비밀번호가 일치하지 않습니다.")
            return;
        }

        // Perform your AJAX call here
        $.ajax({
            type: "POST",
            url: "/admin/DOadminPwdUpdate",
             contentType: 'application/json', // Replace with your actual API endpoint
            data:  JSON.stringify({
                user_id: admin_id,
                password: originalPassword,
                new_password: newPassword
            }),
           success: function(data) {
                // Handle success response
                if (data == "비밀번호가 일치하지 않습니다"){
					$("#alert_span").text("현재 비밀번호가 일치하지 않습니다.")
					return;
				}
                $('#completionModal').modal('show');
            },
            error: function (error) {
                // Handle error response
                console.error("Error updating password", error);
            }
        });
    });
    $('#completionModal').on('hidden.bs.modal', function (e) {
            window.location.href = "/admin/logout";
    }); 
});
