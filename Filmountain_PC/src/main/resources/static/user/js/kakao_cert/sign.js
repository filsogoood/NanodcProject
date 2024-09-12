document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signForm');
    const submitButton = document.getElementById('submitButton');
    const backButton = document.getElementById('backButton');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const phoneInput = form.querySelector('input[name="hp"]');
        const birthdayInput = form.querySelector('input[name="birthday"]');

        // Validate lengths
        if (phoneInput.value.length !== 11) {
            alert('휴대전화번호는 11자리여야 합니다.');
            return;
        }
        if (birthdayInput.value.length !== 8) {
            alert('생년월일은 8자리여야 합니다.');
            return;
        }

        submitButton.disabled = true;
        submitButton.textContent = '처리 중...';

        const formData = new FormData(form);
        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const result = await response.json();
                alert('Error: ' + result.error || 'An error occurred. Please try again.');
                if (response.status === 403) { // Check if the status is Forbidden
                    window.location.href = '/myAgreement';
                }
                submitButton.disabled = false;
                submitButton.textContent = '확인';
                return;
            }

            const result = await response.json();

            if (result.receiptID) {
                sessionStorage.setItem('receiptID', result.receiptID);
                checkSignStatus(result.receiptID);
            } else {
                alert('Error: ' + result.error || 'An error occurred. Please try again.');
                submitButton.disabled = false;
                submitButton.textContent = '확인';
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An unexpected error occurred. Please try again.');
            submitButton.disabled = false;
            submitButton.textContent = '확인';
        }
    });

    async function checkSignStatus(receiptID) {
        try {
            const response = await fetch(`/kakaocert/getSignStatus/${receiptID}`);
            const result = await response.json();

            if (result.result) {
                if (result.status.state === 1) { // Status 1 means signed
                    verifySign(receiptID);
                } else {
                    setTimeout(() => checkSignStatus(receiptID), 5000); // Check again after 5 seconds
                }
            } else {
                alert('Error checking sign status: ' + result.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async function verifySign(receiptID) {
        try {
            const response = await fetch(`/kakaocert/verifySign/${receiptID}`);
            const result = await response.json();

            if (result.result) {
                window.location.href = `/kakaocert/confirmAuthStatus?receiptID=${receiptID}`;
            } else {
                alert('Error verifying sign: ' + result.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    function goBack() {
        window.location.href = '/contract';
    }

    backButton.addEventListener('click', goBack);

    // Ensure phone number and birthday fields only accept numbers
    form.addEventListener('input', (event) => {
        if (event.target.name === 'hp' || event.target.name === 'birthday') {
            event.target.value = event.target.value.replace(/[^0-9]/g, '');
        }
    });

    
});