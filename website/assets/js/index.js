const demoTriggers = document.querySelectorAll('.btn-demo-trigger');
demoTriggers.forEach(button => {
    button.addEventListener('click', async () => {
        const dialogType = button.getAttribute('data-dialog-type');

        if (dialogType === 'alert') {
            await Dialog2.Alert(
                '🔔 Alert Dialog',
                'This is a styled alert dialog. Fully responsive, accessible, and animated — no native browser popup needed.',
                'SUCCESS',
                'Got it!'
            );
        } else if (dialogType === 'confirm') {
            const confirmed = await Dialog2.Confirm(
                'Confirm Action',
                'Are you sure you want to proceed with this step? This action requires explicit user confirmation.',
                'QUESTION',
                'Yes, proceed',
                'Cancel'
            );

            if (confirmed) {
                Dialog2.Toast('Action confirmed successfully!', 'SUCCESS', 3500, 'top-right');
            } else if (confirmed === false) {
                Dialog2.Toast('Action was cancelled.', 'ERROR', 3000, 'top-left');
            }
        } else if (dialogType === 'prompt') {
            const name = await Dialog2.Prompt(
                'User Input',
                'Please enter your name so we can greet you:',
                'Your name here...',
                'text',
                'Submit',
                'Cancel'
            );

            if (name) {
                await Dialog2.Alert(
                    'Welcome!',
                    `Hello, ${name}! Great to have you exploring Dialog-JS 2.0.`,
                    'SUCCESS',
                    'Thanks!'
                );
            }
        } else if (dialogType === 'toast') {
            Dialog2.Toast('This is a Toast notification! Non-blocking and auto-dismissed.', 'INFO', 6000, 'top-right');
            setTimeout(() => {
                Dialog2.Toast('You can stack multiple toasts!', 'SUCCESS', 6000, 'top-left');
            }, 1000);
        }
    });
});

const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');

        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        tabPanes.forEach(pane => {
            if (pane.id === `tab-${targetTab}`) {
                pane.classList.add('active');
            } else {
                pane.classList.remove('active');
            }
        });
    });
});

const copyBtns = document.querySelectorAll('.btn-copy-code');
copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-clipboard-target');
        const codeEl = document.getElementById(targetId);
        if (!codeEl) return;
        const textToCopy = codeEl.textContent;

        navigator.clipboard.writeText(textToCopy).then(() => {
            const originalText = btn.textContent;
            btn.textContent = 'Copied! ✓';
            btn.style.borderColor = '#10b981';
            btn.style.color = '#10b981';

            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.borderColor = '';
                btn.style.color = '';
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    });
});

const themeStylesheet = document.getElementById('theme-stylesheet');
const themeCards = document.querySelectorAll('.theme-card');

themeCards.forEach(card => {
    card.addEventListener('click', () => {
        const selectedTheme = card.getAttribute('data-theme-file');
        const selectedName = card.getAttribute('data-theme-name');

        // Update active state
        themeCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');

        // Swap the CSS theme file
        if (themeStylesheet) {
            themeStylesheet.href = `../src/dialogJS2-${selectedTheme}-theme.css`;
        }

        // Show a dialog with the new theme to preview it
        const themeLabels = {
            default: 'Default Theme 🎨',
            dark: 'Dark Theme 🌑',
            ios: 'iOS Theme 🍎',
            android: 'Android Theme 🤖'
        };

        Dialog2.Alert(
            themeLabels[selectedName] || 'Theme Changed',
            `You are now previewing the "${selectedName}" theme. All dialog examples on this page will use this style.`,
            'SUCCESS',
            'Looks great!'
        );
    });
});

const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const fullname = document.getElementById('fullname').value;

        Dialog2.Alert(
            'Message Received!',
            `Thank you for reaching out, ${fullname}. Your message has been recorded. We'll get back to you as soon as possible.`,
            'SUCCESS',
            'Close'
        );
        contactForm.reset();
    });
}