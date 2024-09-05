$(document).ready(function() {
    var isEmailDuplicate = false;
    var isIdentityVerified = false; // 본인 인증 완료 여부를 체크하는 변수

    // 이메일 중복 확인
    $("#checkEmail").click(function() {
        var email = $("#email").val();

        if (!email) {
            alert("이메일을 입력해주세요.");
            return;
        }

        $.ajax({
            url: "/checkUserEmail",
            type: "GET",
            data: {
                user_email: email
            },
            success: function(response) {
                if (response.isDuplicate) {
                    alert("이미 사용 중인 이메일입니다.");
                    isEmailDuplicate = true;
                } else {
                    alert("사용 가능한 이메일입니다.");
                    isEmailDuplicate = false;
                }
            },
            error: function() {
                alert("이메일 중복 확인 중 오류가 발생했습니다.");
            }
        });
    });

    function validatePassword(password, username, email) {
        const minLength = 8;
        const maxLength = 20;
        const commonPasswords = ["password", "123456", "qwerty", "abc123"];
        const localPart = email.split('@')[0];

        var num = password.search(/[0-9]/g);
        var eng = password.search(/[a-z]/ig);
        var spe = password.search(/[`~!@#$%^&*|\\\'";:/?]/gi);

        if (password.length < minLength || password.length > maxLength) {
            alert("비밀번호는 8자리 ~ 20자리 이내로 입력해주세요.");
            return false;
        }

        if (password.search(/\s/) != -1) {
            alert("비밀번호는 공백 없이 입력해주세요.");
            return false;
        }

        if (num < 0 || eng < 0 || spe < 0) {
            alert("비밀번호는 영문, 숫자, 특수문자를 혼합하여 입력해주세요.");
            return false;
        }

        const noRepeatingChars = !/(.)\1\1/.test(password);
        if (!noRepeatingChars) {
            alert("비밀번호에 동일한 문자가 연속으로 3번 이상 포함될 수 없습니다.");
            return false;
        }

        const noUsername = !password.includes(username);
        if (!noUsername) {
            alert("비밀번호에 계정명(사용자 이름)이 포함될 수 없습니다.");
            return false;
        }

        const noPersonalInfo = !password.includes(localPart) && !password.includes(username);
        if (!noPersonalInfo) {
            alert("비밀번호에 이메일의 일부 또는 사용자 이름이 포함될 수 없습니다.");
            return false;
        }

        const notCommonPassword = !commonPasswords.includes(password.toLowerCase());
        if (!notCommonPassword) {
            alert("추측 가능한 비밀번호는 사용할 수 없습니다.");
            return false;
        }

        console.log("비밀번호가 모든 조건을 통과했습니다.");
        return true;
    }

    // 본인 인증 요청 모달 표시로 수정된 부분
   $("#auth-request-btn").click(function() {
    var name = $("#name").val();
    var dob = $("#birthdate").val();
    var phone = $("#phone").val();
    
    if (!name || !dob || !phone) {
        alert("이름, 생년월일, 핸드폰 번호를 모두 입력해주세요.");
        return;
    }
    
    // 중복 유저 확인을 위한 AJAX 호출
    $.ajax({
        url: "/checkUser",
        type: "GET",
        data: {
            user_name: name,
            phone_number: phone
        },
        success: function(response) {
            if (response.isDuplicate) {
                alert("이미 가입된 유저입니다.");
                return;  // 중복 유저일 경우 여기서 함수 종료
            } else {
                // 중복 유저가 아닐 경우에만 인증 요청 시작
                sendIdentityVerificationRequest(name, dob, phone);
            }
        },
        error: function() {
            alert("중복유저 검사 에러");
        }
    });
});

function sendIdentityVerificationRequest(name, dob, phone) {
    var identityData = {
        name: name,
        dob: dob,
        tel: phone.replace(/-/g, '')
    };

    // 인증 요청 후 모달 표시로 변경
    $.ajax({
        url: "/kakaocert/requestIdentity",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(identityData),
        success: function(identityReceipt) {
            // 인증 요청 모달 표시
            $('#identityVerificationRequestModal').modal('show');
            // 확인 버튼 클릭 시 본인 인증 상태 확인 함수 호출
            $('#identityVerificationRequestConfirm').on('click', function () {
                checkIdentityStatus(identityReceipt.receiptID);
            });
        },
        error: function() {
            // 인증 실패 시 실패 모달 표시
            $('#identityVerificationFailMessage').text("본인 인증 요청 중 오류가 발생했습니다.");
            $('#identityVerificationFailModal').modal('show');
        }
    });
}


    // 본인 인증 상태 확인 부분도 모달로 수정
    function checkIdentityStatus(requestId) {
        $.ajax({
            url: `/kakaocert/checkIdentityStatus?requestId=${requestId}`,
            type: "GET",
            success: function(statusData) {
                if (statusData.status === 1 && statusData.completeDT) {
                    // 인증 성공 모달 표시
                    $('#identityVerificationSuccessModal').modal('show');
                    // 성공 모달의 확인 버튼 클릭 시 인증 완료 상태 설정
                    $('#identityVerificationSuccessConfirm').on('click', function () {
                        isIdentityVerified = true;
                    });
                } else if (statusData.status === 2) {
                    // 인증 만료 시 실패 모달 표시
                    $('#identityVerificationFailMessage').text("본인 인증이 만료되었습니다.");
                    $('#identityVerificationFailModal').modal('show');
                } else {
                    // 인증 실패 시 실패 모달 표시
                    $('#identityVerificationFailMessage').text("본인 인증이 완료되지 않았습니다. 다시 시도해주세요.");
                    $('#identityVerificationFailModal').modal('show');
                }
            },
            error: function() {
                // 상태 확인 중 오류 발생 시 실패 모달 표시
                $('#identityVerificationFailMessage').text("본인 인증 상태 확인 중 오류가 발생했습니다.");
                $('#identityVerificationFailModal').modal('show');
            }
        });
    }

    // 회원가입 폼 제출
    $("#signupButton").click(function(event) {
        event.preventDefault(); 

        var phone_number = $("#phone").val();
        var user_name = $("#name").val();
        var user_email = $("#email").val();
        var password = $("#password").val();
        var confirmPassword = $("#confirm-password").val();

        if (!user_name || !user_email || !phone_number || !password || !confirmPassword) {
            alert("모든 필수 항목을 입력해주세요.");
            return;
        }

        if (password !== confirmPassword) {
            alert("비밀번호가 일치하지 않습니다. 다시 입력해주세요.");
            return;
        }

        if (isEmailDuplicate) {
            alert("이미 사용 중인 이메일입니다. 다른 이메일을 입력해주세요.");
            return;
        }

        if (!isIdentityVerified) { // 본인 인증 여부 확인
            alert("본인 인증을 완료해주세요.");
            return;
        }

        if (!validatePassword(password, user_name, user_email)) {
            return; // 유효성 검사를 통과하지 못했으므로 더 이상 진행하지 않음
        }

        $.ajax({
            type: "POST",
            url: "/admin/addNewUser",
            contentType: "application/json",
            data: JSON.stringify({
                user_name: user_name,
                user_email: user_email,
                phone_number: phone_number,
                level: "일반고객",
                user_status: "active",
                password: password
            }),
            success: function(data) {
                if (data === 'success') {
                    alert("회원가입 완료");
                    window.location.href = '/login'; // 로그인 페이지로 이동
                } else {
                    alert("회원가입 실패");
                }
            },
            error: function() {
                alert("회원가입 중 오류가 발생했습니다.");
            }
        });
    });

    // 약관 동의 토글 기능
    function toggleTermsContent(id) {
        var content = $("#" + id);
        content.toggle();
    }

    function toggleAllTerms() {
        var termsAllCheckbox = $("#terms-all");
        var termsCheckboxes = $(".terms-checkbox input");
        var checked = termsAllCheckbox.is(":checked");

        termsCheckboxes.prop("checked", checked);
    }

    function handleCheckboxClick(event, checkboxId) {
        event.stopPropagation();
        var checkbox = $("#" + checkboxId);
        checkbox.prop("checked", !checkbox.is(":checked"));
    }

    $("#terms-all").change(toggleAllTerms);

    $(".terms-header-1").click(function() {
        handleCheckboxClick(event, "terms1-agree");
    });

    $(".terms-header-2").click(function() {
        handleCheckboxClick(event, "terms2-agree");
    });

    $("#terms1-agree, #terms2-agree").click(function(event) {
        event.stopPropagation();
    });
});
