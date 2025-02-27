document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const emailInput = document.getElementById('email');
    const thankYouMessage = document.querySelector('.thank-you-message');

    function validateEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

    function showError(input, message) {
        const existingError = input.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        input.parentElement.appendChild(errorElement);
        
        input.style.borderColor = '#e53935';
    }

    function removeError(input) {
        const errorElement = input.parentElement.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
        
        input.style.borderColor = '';
    }

    emailInput.addEventListener('input', function() {
        if (!validateEmail(this.value) && this.value.trim() !== '') {
            showError(this, 'Please enter a valid email address.');
        } else {
            removeError(this);
        }
    });

    if (form) {
        const nameInput = form.querySelector('#name');
        const emailInput = form.querySelector('#email');
        const messageInput = form.querySelector('#message');
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const message = messageInput.value.trim();
            
            if (!name) {
                showError(nameInput, 'Please enter your name.');
                return false;
            } else {
                removeError(nameInput);
            }
            
            if (!validateEmail(email)) {
                showError(emailInput, 'Please enter a valid email address.');
                return false;
            } else {
                removeError(emailInput);
            }
            
            if (!message) {
                showError(messageInput, 'Please enter a message.');
                return false;
            } else {
                removeError(messageInput);
            }
            
            const webhookUrl = 'https://discord.com/api/webhooks/1344647043934720041/O3ntbB4JVmJ4_9vF6gU3bXyK6pi5vMWXU1cuLOIuyN808cqVbnEUdwxx3QWvpS1o5UUU';
            
            const embed = {
                title: "New Contact Form Submission",
                color: 3447003,
                fields: [
                    {
                        name: "Name",
                        value: name,
                        inline: true
                    },
                    {
                        name: "Email",
                        value: email,
                        inline: true
                    },
                    {
                        name: "Message",
                        value: message,
                        inline: false
                    }
                ],
                timestamp: new Date().toISOString(),
                footer: {
                    text: "Contact Form Submission"
                }
            };
            
            fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    embeds: [embed]
                })
            })
            .then(response => {
                if (!response.ok) {
                    console.error('Failed to send to Discord');
                } else {
                    console.log('Form data sent to Discord successfully');
                }
            })
            .catch(error => {
                console.error('Error sending to Discord:', error);
            });
            
            thankYouMessage.style.display = 'flex';
            anime({
                targets: thankYouMessage,
                opacity: [0, 1],
                duration: 300,
                easing: 'easeOutCubic'
            });
            
            form.reset();
            removeError(nameInput);
            removeError(emailInput);
            removeError(messageInput);
        });
    }

    document.querySelector('.close-btn').addEventListener('click', function() {
        anime({
            targets: thankYouMessage,
            opacity: 0,
            scale: 0.9,
            duration: 300,
            easing: 'easeInCubic',
            complete: function() {
                thankYouMessage.style.display = 'none';
            }
        });
        thankYouMessage.style.scale = 1;
    });
});