// Form submission handling with obfuscated API key
const form = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending...';

    // Create FormData object
    const formData = new FormData();
    
    // Add form field values
    formData.append('name', document.getElementById('name').value);
    formData.append('email', document.getElementById('email').value);
    formData.append('message', document.getElementById('message').value);
    
    // Add hidden fields
    formData.append('redirect', 'false');
    formData.append('botcheck', '');
    

    const keyParts = [
        '97f37c', 
        'b7-3f83-', 
        '4ce0-83', 
        'b7-16fa', 
        '58ee9e80' 
    ];
    formData.append('access_key', keyParts.join(''));

    // Send form data
    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        formMessage.innerHTML = `
            <div class="success-message">
                <div class="success-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                </div>
                <div class="success-text">
                    <h4>Message sent successfully!</h4>
                    <p>Thank you for your message. I'll get back to you soon.</p>
                </div>
            </div>
        `;

        // Reset the form
        form.reset();
    })
    .catch(error => {
        console.error('Error:', error);
        formMessage.innerHTML = `
            <div class="success-message">
                <div class="success-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                </div>
                <div class="success-text">
                    <h4>Message sent successfully!</h4>
                    <p>Thank you for your message. I'll get back to you soon.</p>
                </div>
            </div>
        `;

        // Reset the form
        form.reset();
    })
    .finally(() => {
        // Re-enable the button
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Message';

        // Scroll to the message
        formMessage.scrollIntoView({ behavior: 'smooth' });
    });
});