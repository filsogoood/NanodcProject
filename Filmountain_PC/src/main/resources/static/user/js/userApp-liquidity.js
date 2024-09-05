$(document).ready(function() {
    function formatNumber(num) {
        if (num === 0) return '0';
        return num % 1 === 0 ? num.toFixed(0) : num.toFixed(4).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }

    function formatNumbers() {
        var stakingAmountElement = $('#staking-amount');
        var unstakeAmountElement = $('#unstake-amount');
        var filAmountElement = $('#fil-amount');

        if (stakingAmountElement.length) {
            var stakingAmount = parseFloat(stakingAmountElement.text());
            if (!isNaN(stakingAmount)) {
                stakingAmountElement.text(formatNumber(stakingAmount));
            }
        }

        if (unstakeAmountElement.length) {
            var unstakeAmount = parseFloat(unstakeAmountElement.text());
            if (!isNaN(unstakeAmount)) {
                unstakeAmountElement.text(formatNumber(unstakeAmount));
            }
        }

        if (filAmountElement.length) {
            var filAmount = parseFloat(filAmountElement.text());
            if (!isNaN(filAmount)) {
                filAmountElement.text(formatNumber(filAmount));
            }
        }
    }

    formatNumbers();
});
