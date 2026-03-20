document.addEventListener('DOMContentLoaded', () => {

    const aboutContent = document.getElementById('about-content');
    const fetchAboutBtn = document.getElementById('fetch-about-btn');
    const contactContent = document.getElementById('contact-content');
    const fetchContactBtn = document.getElementById('fetch-contact-btn');
    
    // Fetch About Data
    fetchAboutBtn.addEventListener('click', async () => {
        // give button spinning animation
        fetchAboutBtn.querySelector('i').classList.add('fa-spin');
        try {
            const response = await fetch('/about');
            const data = await response.json();
            
            aboutContent.innerHTML = `
                <div class="data-item">
                    <span class="data-label">Name</span>
                    <span class="data-value">${data.name}</span>
                </div>
                <div class="data-item">
                    <span class="data-label">Roll No</span>
                    <span class="data-value">${data.rollNo}</span>
                </div>
                <div class="data-item">
                    <span class="data-label">Course</span>
                    <span class="data-value">${data.course}</span>
                </div>
            `;
        } catch (error) {
            console.error('Error fetching about data:', error);
            aboutContent.innerHTML = `<div class="result-message error">Failed to load data. Please make sure the server endpoints are returning JSON.</div>`;
        } finally {
            setTimeout(() => fetchAboutBtn.querySelector('i').classList.remove('fa-spin'), 500);
        }
    });

    // Fetch Contact Data
    fetchContactBtn.addEventListener('click', async () => {
        fetchContactBtn.querySelector('i').classList.add('fa-spin');
        try {
            const response = await fetch('/contact');
            const data = await response.json();
            
            contactContent.innerHTML = `
                <div class="data-item">
                    <span class="data-label">Email</span>
                    <span class="data-value">${data.email}</span>
                </div>
                <div class="data-item">
                    <span class="data-label">Phone Prefix</span>
                    <span class="data-value">${data.phone}</span>
                </div>
            `;
        } catch (error) {
            console.error('Error fetching contact data:', error);
            contactContent.innerHTML = `<div class="result-message error">Failed to load data. Please make sure the server endpoints are returning JSON.</div>`;
        } finally {
            setTimeout(() => fetchContactBtn.querySelector('i').classList.remove('fa-spin'), 500);
        }
    });

    // Handle Register Form Submit
    const registerForm = document.getElementById('register-form');
    const registerResult = document.getElementById('register-result');
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new URLSearchParams(new FormData(registerForm));
        
        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData.toString()
            });

            const data = await response.json();
            
            if (response.ok) {
                registerResult.className = 'result-message success';
                registerResult.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${data.message} - Added ${data.student?.studentName || 'Student'}`;
                registerForm.reset();
            } else {
                throw new Error(data.message || 'Registration failed');
            }
        } catch (error) {
            registerResult.className = 'result-message error';
            registerResult.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Error: ${error.message}`;
        }
    });

    // Handle Update Form Submit
    const updateForm = document.getElementById('update-form');
    const updateResult = document.getElementById('update-result');
    updateForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new URLSearchParams(new FormData(updateForm));
        
        try {
            const response = await fetch('/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData.toString()
            });

            const data = await response.json();
            
            if (response.ok) {
                updateResult.className = 'result-message success';
                updateResult.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${data.message} - Roll No ${data.update?.rollNo || ''}`;
                updateForm.reset();
            } else {
                throw new Error(data.message || 'Update failed');
            }
        } catch (error) {
            updateResult.className = 'result-message error';
            updateResult.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Error: ${error.message}`;
        }
    });

    // Load initial data
    setTimeout(() => {
        fetchAboutBtn.click();
        fetchContactBtn.click();
    }, 500);
});
