/**
 * PBS Designs - Service Estimator Logic
 * Developed for CTO Sean Huang
 */

// 1. Live Price Calculation Logic
const checkboxes = document.querySelectorAll('.service-item');
const totalPriceElement = document.getElementById('totalPrice');
const detailsElement = document.getElementById('details');

checkboxes.forEach(item => {
    item.addEventListener('change', () => {
        let total = 0;
        let selectedList = [];

        checkboxes.forEach(cb => {
            if(cb.checked) {
                // Get price from data-price attribute defined in the HTML
                total += parseInt(cb.getAttribute('data-price'));
                selectedList.push(cb.value);
            }
        });

        // Update the UI
        totalPriceElement.innerText = total.toLocaleString();
        detailsElement.innerText = selectedList.length > 0
            ? "Included Services: " + selectedList.join(", ")
            : "Please select services to see the breakdown.";
    });
});

// 2. Industry Field Toggle
function toggleOtherIndustry() {
    const industrySelect = document.getElementById('industry');
    const otherInput = document.getElementById('otherIndustry');
    // Show input only if "Other" is selected
    otherInput.style.display = (industrySelect.value === 'Other') ? 'block' : 'none';
}

// 3. Form Submission Workflow
function submitQuote() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const total = document.getElementById('totalPrice').innerText;

    // Simple Validation
    if (!name || !email) {
        alert("Please provide your name and email so we can contact you.");
        return;
    }

    if (total === "0") {
        alert("Please select at least one service to generate an estimate.");
        return;
    }

    // Confirmation Step
    const userConfirmed = confirm(`Your estimated project total is $${total}. \n\nWould you like to submit this quote request to the PBS Designs team?`);

    if (userConfirmed) {
        // Success Message (Per your request)
        alert("We have received your form, and a specialist will contact you shortly!");

        // Reset form for demo purposes
        document.getElementById('quoteForm').reset();
        document.getElementById('totalPrice').innerText = "0";
        document.getElementById('details').innerText = "Please select services to see the breakdown.";
        document.getElementById('otherIndustry').style.display = 'none';
    }
}