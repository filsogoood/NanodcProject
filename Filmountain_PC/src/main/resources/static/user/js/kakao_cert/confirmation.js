document.addEventListener('DOMContentLoaded', () => {
    const confirmButton = document.getElementById('confirmButton');

    confirmButton.addEventListener('click', async () => {
        const receiptID = new URLSearchParams(window.location.search).get('receiptID');
        if (!receiptID) {
            alert('Error: No receipt ID found.');
            return;
        }

        try {
            const response = await fetch('/kakaocert/confirmAuthStatus', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ receiptID })
            });
            const result = await response.json();

            if (result.result) {
                window.location.href = '/myAgreement';
            } else {
                alert('Error confirming auth status: ' + result.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
});