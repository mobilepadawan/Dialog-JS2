export class Dialog2 {
    static copyright = 'Fernando Omar Luna';
    static version = '1.0.0';
    static icon = {
        SUCCESS: '✅',
        ERROR: '❌',
        WARNING: '⚠️',
        QUESTION: '❓',
        INFO: 'ℹ️'
    };

    static async Alert(title, message, icon = 'INFO', okButtonText = 'Ok') {
        return new Promise((resolve) => {
            const dialogJS2 = document.createElement('dialog');
            dialogJS2.classList.add('dialog2');

            dialogJS2.innerHTML = `
                <div class="dialog2-header">
                    <div class="dialog2-icon">${Dialog2.icon[icon] || ''}</div>
                    <h2 class="dialog2-title">${title || ''}</h2>
                </div>
                <div class="dialog2-content">
                    <p class="dialog2-message">${message || ''}</p>
                </div>
                <div class="dialog2-footer">
                    <button class="dialog2-btn dialog2-btn-primary" data-dialog-btn="Ok">${okButtonText || 'Ok'}</button>
                </div>
            `;

            document.body.appendChild(dialogJS2);
            dialogJS2.showModal();

            const closeDialog = (value) => {
                resolve(value);
                dialogJS2.close();
                dialogJS2.remove();
            };

            dialogJS2.querySelector('button.dialog2-btn.dialog2-btn-primary')
                .addEventListener('click', () => {
                    closeDialog(true);
                });
            
            dialogJS2.addEventListener('cancel', (e) => {
                e.preventDefault();
                closeDialog(null);
            });            
        });
    };

    static async Confirm(title, message, icon = 'QUESTION', okButtonText = 'Confirm', cancelButtonText = 'Cancel') {
        return new Promise((resolve) => {
 
            const dialogJS2 = document.createElement('dialog');
            dialogJS2.classList.add('dialog2');

            dialogJS2.innerHTML = `
                <div class="dialog2-header">
                    <div class="dialog2-icon">${Dialog2.icon[icon] || ''}</div>
                    <h2 class="dialog2-title">${title || ''}</h2>
                </div>
                <div class="dialog2-content">
                    <p class="dialog2-message">${message || ''}</p>
                </div>
                <div class="dialog2-footer">
                    <button class="dialog2-btn dialog2-btn-secondary" data-dialog-btn="cancel">${cancelButtonText || 'Cancel'}</button>
                    <button class="dialog2-btn dialog2-btn-primary"   data-dialog-btn="confirm">${okButtonText || 'Confirm'}</button>
                </div>
            `;
 
            document.body.appendChild(dialogJS2);
            dialogJS2.showModal();
 
            const closeDialog = (confirmed) => {
                resolve(confirmed);
                dialogJS2.close();
                dialogJS2.remove();
            };
 
            dialogJS2.querySelector('[data-dialog-btn="confirm"]')
                .addEventListener('click', () => closeDialog(true));
 
            dialogJS2.querySelector('[data-dialog-btn="cancel"]')
                .addEventListener('click', () => closeDialog(false));
 
            dialogJS2.addEventListener('cancel', (e) => {
                e.preventDefault();
                closeDialog(false);
            });
 
            dialogJS2.addEventListener('click', ({ target }) => {
                if (target === dialogJS2) closeDialog(false);
            });
        });
    };

    static async Prompt(title, message, placeholder = '', inputType = 'text', okButtonText = 'Confirm', cancelButtonText = 'Cancel') {
        return new Promise((resolve) => {
            const dialogJS2 = document.createElement('dialog');
            dialogJS2.classList.add('dialog2');
            
            dialogJS2.innerHTML = `
                <div class="dialog2-header dialog2-header-prompt">
                    <h2 class="dialog2-title">${title || ''}</h2>
                </div>
                <div class="dialog2-content dialog2-content-prompt">
                    <p class="dialog2-message" style="margin-bottom: 16px;">${message || ''}</p>
                    <input type="${inputType}" 
                           class="dialog2-input" 
                           placeholder="${placeholder}" 
                           style="width: 100%;"
                           autocomplete="off"
                           autocorrect="off"
                    >
                </div>
                <div class="dialog2-footer">
                    <button class="dialog2-btn dialog2-btn-secondary" data-dialog-btn="cancel">${cancelButtonText || 'Cancel'}</button>
                    <button class="dialog2-btn dialog2-btn-primary" data-dialog-btn="confirm">${okButtonText || 'Confirm'}</button>
                </div>
            `;

            document.body.appendChild(dialogJS2);
            dialogJS2.showModal();

            const input = dialogJS2.querySelector('.dialog2-input');
            input.focus();

            const closeDialog = (value) => {
                resolve(value);
                dialogJS2.close();
                dialogJS2.remove();
            };

            dialogJS2.querySelector('[data-dialog-btn="confirm"]')
                .addEventListener('click', () => closeDialog(input.value));

            dialogJS2.querySelector('[data-dialog-btn="cancel"]')
                .addEventListener('click', () => closeDialog(null));

            dialogJS2.addEventListener('cancel', (e) => {
                e.preventDefault();
                closeDialog(null);
            });

            dialogJS2.addEventListener('click', ({ target }) => {
                if (target === dialogJS2) closeDialog(null);
            });
        });
    };

    static About() {
        const currentYear = `- ${new Date().getFullYear()}`
        const aboutText = `<strong>2026 ${currentYear > 2026 ? currentYear : ''} - ${this.copyright}</strong>. All rights reserved. <strong>https://ferpro.online/</strong>. This is a library free to use in any project. If your software is a commercial or popular application, please mention me as the Author of this Dialog boxes library in its credits.`

        this.Alert('Copyright', aboutText, 'SUCCESS')
    }
}