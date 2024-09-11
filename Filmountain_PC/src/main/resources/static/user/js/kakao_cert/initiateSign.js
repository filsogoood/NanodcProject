document.addEventListener('DOMContentLoaded', () => {
    const signButton = document.getElementById('signButton');
    const initiateSignForm = document.getElementById('initiateSignForm');
    const isVerified = signButton.getAttribute('data-is-verified') === '1';

    signButton.addEventListener('click', () => {
        if (isVerified) {
            alert('이미 서명하셨습니다.');
            window.location.href = '/user/agreement';
        } else {
            initiateSignForm.submit();
        }
    });

    const signError = document.getElementById('signError').value;
    if (signError) {
        alert(signError);
    }
});