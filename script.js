document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Clear previous errors
    clearErrors();
    
    let isValid = true;
    
    // Validate required fields
    const requiredFields = ['fullName', 'email', 'phone', 'motivation', 'availability'];
    requiredFields.forEach(field => {
        const element = document.getElementById(field);
        if (!element.value.trim()) {
            showError(element, 'This field is required');
            isValid = false;
        }
    });
    
    // Validate email format
    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value && !emailRegex.test(email.value)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate phone number
    const phone = document.getElementById('phone');
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (phone.value && !phoneRegex.test(phone.value.replace(/[\s\-\(\)]/g, ''))) {
        showError(phone, 'Please enter a valid phone number');
        isValid = false;
    }
    
    // Validate skills selection
    const skills = document.querySelectorAll('input[name="skills"]:checked');
    if (skills.length === 0) {
        const skillsGroup = document.querySelector('.checkbox-group');
        showError(skillsGroup, 'Please select at least one technical skill');
        isValid = false;
    }
    
    if (isValid) {
        // Collect form data
        const formData = new FormData(this);
        const data = {};
        
        // Handle regular fields
        for (let [key, value] of formData.entries()) {
            if (key === 'skills') {
                if (!data.skills) data.skills = [];
                data.skills.push(value);
            } else {
                data[key] = value;
            }
        }
        
        // Show success message
        alert('Application submitted successfully! We will contact you soon.');
        console.log('Form Data:', data);
        
        // Reset form
        this.reset();
    }
});

function showError(element, message) {
    element.classList.add('error');
    
    // Remove existing error message
    const existingError = element.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    element.parentNode.appendChild(errorDiv);
}

function clearErrors() {
    // Remove error classes
    document.querySelectorAll('.error').forEach(element => {
        element.classList.remove('error');
    });
    
    // Remove error messages
    document.querySelectorAll('.error-message').forEach(element => {
        element.remove();
    });
}