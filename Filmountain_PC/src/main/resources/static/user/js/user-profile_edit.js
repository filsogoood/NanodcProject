$(document).ready(function () {
	function chkPW(pw) {
    // 비밀번호 규칙: 최소 8자 이상, 대문자, 소문자, 숫자, 특수문자 포함
    var reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    var hangulcheck = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

    // 비밀번호 규칙에 맞는지 확인
    if (!reg.test(pw)) {
        alert('비밀번호는 8자 이상이어야 하며, 숫자/대문자/소문자/특수문자를 모두 포함해야 합니다.');
        return false;
    }
    // 같은 문자가 4번 이상 반복되는지 확인
    else if (/(\w)\1\1\1/.test(pw)) {
        alert('같은 문자를 4번 이상 사용하실 수 없습니다.');
        return false;
    }
    // 비밀번호에 공백이 있는지 확인
    else if (pw.search(/\s/) != -1) {
        alert("비밀번호는 공백 없이 입력해주세요.");
        return false;
    }
    // 비밀번호에 한글이 포함되었는지 확인
    else if (hangulcheck.test(pw)) {
        alert("비밀번호에 한글을 사용 할 수 없습니다."); 
        return false;
    } 
    else {
        console.log("통과");
        return true; // 통과 시 true 반환
    }
}
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
		if (chkPW(newPasswordRepeat) !== true) {
			return;
		}
        // Perform your AJAX call here
        $.ajax({
            type: "POST",
            url: "/DOuserprofileEdit",
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
            error: function (xhr) {
                // Handle error response
                $("#alert_span").text(xhr.responseText);
            }
        });
    });
    $('#completionModal').on('hidden.bs.modal', function (e) {
            window.location.href = "/logout";
    }); 
});
