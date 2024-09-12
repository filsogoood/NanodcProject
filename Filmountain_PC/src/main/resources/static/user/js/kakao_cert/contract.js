console.log("JavaScript file loaded");

// Function to poll the signature status
function pollSignatureStatus(receiptID) {
    fetch(`/kakaocert/getSignStatus/${receiptID}`)
        .then(response => response.json())
        .then(data => {
            if (data.result && data.status.state === 1) { // Completed
                verifySignature(receiptID);
            } else if (data.result && data.status.state === 2) { // Expired
                document.getElementById("verificationMessage").innerText = "Verification expired.";
            } else {
                setTimeout(() => pollSignatureStatus(receiptID), 5000); // Poll every 5 seconds
            }
        })
        .catch(error => {
            console.error("Error checking signature status:", error);
        });
}

// Function to verify the signature
function verifySignature(receiptID) {
    fetch(`/kakaocert/verifySign/${receiptID}`)
        .then(response => response.json())
        .then(data => {
            if (data.result) {
                document.getElementById("verificationMessage").innerText = "Verification successful!";
                var showContractButton = document.createElement("button");
                showContractButton.innerText = "Open Contract PDF";
                showContractButton.onclick = function() {
                    window.open('/showContract', '_blank');
                };
                document.getElementById("buttonContainer").appendChild(showContractButton);
            } else {
                document.getElementById("verificationMessage").innerText = "Verification failed: " + data.error;
            }
        })
        .catch(error => {
            console.error("Error verifying signature:", error);
        });
}

// Function for self-verification and redirection
function selfVerification(event) {
    event.preventDefault(); // Prevent the default form submission
    console.log("selfVerification called");

    // Disable the verify button to prevent multiple submissions
    var verifyButton = document.getElementById("verifyButton");
    verifyButton.disabled = true;

    // Collect form data
    const formData = new FormData(document.getElementById("contractForm"));

    // Submit the data to the /kakaocert/requestSign endpoint
    fetch("/kakaocert/requestSign", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.result) {
            document.getElementById("verificationMessage").innerText = "Verification in progress...";
            pollSignatureStatus(data.receiptID);
        } else {
            alert("Verification request failed. Please try again.");
            verifyButton.disabled = false; // Re-enable the button if verification fails
        }
    })
    .catch(error => {
        console.error("Error during verification request:", error);
        alert("An error occurred during verification. Please try again.");
        verifyButton.disabled = false; // Re-enable the button if an error occurs
    });
}

// Function to generate the contract
function generateContract(event) {
    event.preventDefault();
    const form = document.getElementById("contractForm");
    const formData = new FormData(form);

    fetch("/generateContract", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("contractContent").innerHTML = data.htmlContent;
        document.getElementById("verifyButton").style.display = 'inline';
    });
}

// Attach event listeners to the buttons when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("contractForm").addEventListener("submit", generateContract);

    var verifyButton = document.getElementById("verifyButton");
    if (verifyButton) {
        verifyButton.addEventListener("click", selfVerification);
    }
});