$(document).ready(function() {
            var processStatus = {
                "전자서명 진행중": 1,
                "계약금 입금 확인중": 2,
                "중도금 입금 확인중": 3,
                "잔금 입금 확인중":4,
                "계약완료": 5,
            };

            // 상태 표시 업데이트
             function updateProcessStatus() {
                var currentProcess = $('#hiddenData').data('process');
                $('.step').each(function() {
                    var stepLabel = $(this).find('.step-label').text().trim();
                    var stepOrder = processStatus[stepLabel];

                    // 아이콘 초기화
                    $(this).find('.check-icon').hide();

                    // 이전 단계
                    if (stepOrder < processStatus[currentProcess]) {
                        $(this).find('.step-label').addClass('text-decoration-line-through');
                        $(this).find('.check-icon').show();
                    }
                    // 현재 단계
                    else if (stepOrder === processStatus[currentProcess]) {
                        $(this).find('.step-label').addClass('current-step');
                         $(this).find('.step-label').append('<span class="badge badge-phoenix ms-auto fs-10 badge-phoenix-info">현재 진행중</span>');
                    }
                    // 다음 단계는 별도 처리 없음
                });
                feather.replace(); // Feather icons 업데이트
            }

            updateProcessStatus();
        });