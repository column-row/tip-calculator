document.addEventListener('DOMContentLoaded', () => {
    const billInput = document.querySelector('.billing-section .input-field');
    const tipButtons = document.querySelectorAll('.tips li');
    const customTipInput = document.querySelector('.custom-input input');
    const peopleInput = document.querySelector('#fname');
    const tipAmountDisplay = document.querySelector('.sty-tips .amount');
    const totalDisplay = document.querySelector('.sty-tips:last-of-type .amount');
    const resetButton = document.querySelector('.payment-rendering button');
    const errorMessage = document.createElement('p');

    let billValue = 0;
    let tipValue = 0;
    let peopleValue = 1; // Default to 1 to avoid division by zero

    // Function to calculate and update the display
    function calculateTip() {
        if (peopleValue > 0) {
            let tipAmount = (billValue * tipValue) / 100 / peopleValue;
            let total = billValue / peopleValue + tipAmount;

            tipAmountDisplay.textContent = `$${tipAmount.toFixed(2)}`;
            totalDisplay.textContent = `$${total.toFixed(2)}`;
        }
    }

    // Event listener for the bill input
    billInput.addEventListener('input', () => {
        billValue = parseFloat(billInput.value);
        calculateTip();
    });

    // Event listener for tip buttons
    tipButtons.forEach(button => {
        button.addEventListener('click', () => {
            tipButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            if (button.classList.contains('custom-input')) {
                tipValue = parseFloat(customTipInput.value) || 0;
            } else {
                tipValue = parseFloat(button.textContent);
            }

            calculateTip();
        });
    });

    // Event listener for custom tip input
    customTipInput.addEventListener('input', () => {
        tipValue = parseFloat(customTipInput.value) || 0;
        calculateTip();
    });

    // Event listener for the number of people input
    peopleInput.addEventListener('input', () => {
        peopleValue = parseInt(peopleInput.value);

        if (peopleValue === 0) {
            if (!document.body.contains(errorMessage)) {
                errorMessage.textContent = "Can't be zero";
                errorMessage.style.color = 'red';
                peopleInput.parentNode.appendChild(errorMessage);
            }
        } else {
            if (document.body.contains(errorMessage)) {
                errorMessage.remove();
            }
            calculateTip();
        }
    });

    // Reset button functionality
    resetButton.addEventListener('click', () => {
        billInput.value = '';
        tipButtons.forEach(btn => btn.classList.remove('active'));
        customTipInput.value = '';
        peopleInput.value = '';
        billValue = 0;
        tipValue = 0;
        peopleValue = 1;

        tipAmountDisplay.textContent = '$0.00';
        totalDisplay.textContent = '$0.00';

        if (document.body.contains(errorMessage)) {
            errorMessage.remove();
        }
    });
});
