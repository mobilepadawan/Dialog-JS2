export class Dialog2 {
    static copyright = 'Fernando Omar Luna';
    static version = '1.0.0';
    static icon = {
        SUCCESS: `<svg class="check-svg" id="check" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-label="Éxito" role="img">
                      <circle class="check-circle-track" cx="24" cy="24" r="22"></circle>
                      <circle class="check-circle-fill" cx="24" cy="24" r="22" transform="rotate(-90 24 24)"></circle>
                      <circle class="check-dot-pulse" cx="24" cy="24" r="4"></circle>
                      <polyline class="check-mark" points="13,25 21,33 35,16"></polyline>
                  </svg>`,
        ERROR: `<svg class="err-svg" id="err" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-label="Error" role="img">
                    <circle class="err-circle-track" cx="24" cy="24" r="22"></circle>
                    <circle class="err-circle-fill" cx="24" cy="24" r="22" transform="rotate(-90 24 24)"></circle>
                    <circle class="err-dot-pulse" cx="24" cy="24" r="4"></circle>
                    <line class="err-x-line-1" x1="15" y1="15" x2="33" y2="33"></line>
                    <line class="err-x-line-2" x1="33" y1="15" x2="15" y2="33"></line>
                </svg>`,
        WARNING: `<svg class="w-svg" id="wsvg" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-label="Advertencia" role="img">
                     <g class="w-warn-group" style="animation: 0.38s cubic-bezier(0.36, 0.07, 0.19, 0.97) 1.18s 1 normal none running w-shake;">
                     <path class="w-tri-track" d="M24,6 L42,40 L6,40 Z"></path>
                     <path class="w-tri-fill" d="M24,6 L42,40 L6,40 Z" style="animation: 0.6s cubic-bezier(0.65, 0, 0.35, 1) 0.1s 1 normal forwards running w-draw-tri;"></path>
                     <circle class="w-dot-pulse" cx="24" cy="29" r="4" style="animation: 0.45s ease-out 1.01s 1 normal forwards running w-pulse-dot;"></circle>
                     <line class="w-ex-stem" x1="24" y1="18" x2="24" y2="29" style="animation: 0.25s cubic-bezier(0.65, 0, 0.35, 1) 0.76s 1 normal forwards running w-draw-stem;"></line>
                     <circle class="w-ex-dot" cx="24" cy="34" style="animation: 0.22s cubic-bezier(0.34, 1.56, 0.64, 1) 1.01s 1 normal forwards running w-pop-dot;"></circle>
                     </g>
                 </svg>`,
        QUESTION: `<svg class="q-svg" id="qsvg" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-label="Pregunta" role="img">
                       <circle class="q-circle-track" cx="24" cy="24" r="22"></circle>
                       <circle class="q-circle-fill" cx="24" cy="24" r="22" transform="rotate(-90 24 24)"></circle>
                       <circle class="q-dot-pulse" cx="24" cy="24" r="4"></circle>
                       <path class="q-curve" d="M17,20 C17,11 31,11 31,20 C31,27 24,26 24,30"></path>
                       <circle class="q-dot" cx="24" cy="34.5"></circle>
                   </svg>`,
        INFO: `<svg class="info-svg" id="info" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-label="Información" role="img">
                    <circle class="info-circle-track" cx="24" cy="24" r="22"></circle>
                    <circle class="info-circle-fill" cx="24" cy="24" r="22" transform="rotate(-90 24 24)" style="animation: 0.5s cubic-bezier(0.65, 0, 0.35, 1) 0.1s 1 normal forwards running info-draw-circle;"></circle>
                    <circle class="info-dot-pulse" cx="24" cy="24" r="4" style="animation: 0.45s ease-out 0.84s 1 normal forwards running info-pulse-dot;"></circle>
                    <circle class="info-i-dot" cx="24" cy="17" style="animation: 0.22s cubic-bezier(0.34, 1.56, 0.64, 1) 0.65s 1 normal forwards running info-pop-dot;"></circle>
                    <line class="info-i-stem" x1="24" y1="22" x2="24" y2="34" style="animation: 0.28s cubic-bezier(0.65, 0, 0.35, 1) 0.84s 1 normal forwards running info-draw-stem;"></line>
                </svg>`
    };

    /**
     * @param {string} title - Alert Dialog title.
     * @param {string} message - Alert Dialog description text.
     * @param {constant} icon - Alert Dialog icon.
     * @param {string} okButtonText - Alert Dialog OK button text.
     */
    static async Alert(title, message, icon = 'INFO', okButtonText = 'Ok') {
        return new Promise((resolve) => {
            const dialogJS2 = document.createElement('dialog');
            dialogJS2.classList.add('dialog2');
            dialogJS2.innerHTML = `
                <div class="dialog2-header">
                    <div class="dialog2-icon">${this.icon[icon] || this.icon.INFO}</div>
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

    /**
     * @param {string} title - Confirm Dialog title.
     * @param {string} message - Confirm Dialog description text.
     * @param {constant} icon - Confirm Dialog icon.
     * @param {string} okButtonText - Confirm Dialog Confirm button text.
     * @param {string} cancelButtonText - Confirm Dialog Cancel button text.
     */
    static async Confirm(title, message, icon = 'QUESTION', okButtonText = 'Confirm', cancelButtonText = 'Cancel') {
        return new Promise((resolve) => {
            const dialogJS2 = document.createElement('dialog');
            dialogJS2.classList.add('dialog2');
            dialogJS2.innerHTML = `
                <div class="dialog2-header">
                    <div class="dialog2-icon">${this.icon[icon] || this.icon.QUESTION}</div>
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

    /**
     * @param {string} title - Prompt Dialog title.
     * @param {string} message - Prompt Dialog descripction text.
     * @param {string} placeholder - Input placeholder hint text.
     * @param {variant} inputType - Custom content for the input 'Type' type.
     * @param {string} okButtonText - Prompt Dialog 'Confirm' button text.
     * @param {string} cancelButtonText - Prompt Dialog 'Cancel' button text.
     */
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
                    <input type="${inputType || 'text'}" 
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
            const btnOk = document.querySelector('button.dialog2-btn.dialog2-btn-primary');
            input.addEventListener('keypress', (e) => e.key === 'Enter' && btnOk.click());
            input.focus({ preventScroll: true });
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

    /**
     * @param {string} message - Toast Dialog text message.
     * @param {constant} icon - Toast Dialog icon.
     * @param {number} duration (Optional) - Toast Dialog visible time - in milliseconds (default 3000).
     * @param {string} position (Optional) - Toast Dialog on-screen location 'top-left', 'top-center', 'top-right' (default top-right).
     */
    static Toast(message, icon = 'INFO', duration, position = 'top-right') {
        let container = document.querySelector(`.dialog2-toast-container.${position || 'top-center'}`);
        if (!container) {
            container = document.createElement('div');
            container.className = `dialog2-toast-container ${position || 'top-center'}`;
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = 'dialog2-toast';
        toast.innerHTML = `
            <div class="dialog2-toast-body">
                <div class="dialog2-toast-icon">${this.icon[icon] || this.icon.INFO}</div>
                <p class="dialog2-toast-message">${message || ''}</p>
            </div>
            <div class="dialog2-toast-progress-bar">
                <div class="dialog2-toast-progress-fill" style="animation-duration: ${duration || 3000}ms"></div>
            </div>
        `;

        container.appendChild(toast);
        setTimeout(() => {
            toast.classList.add('fade-out');

            toast.addEventListener('transitionend', (e) => {
                if (e.propertyName === 'max-height') {
                    toast.remove();
                    if (container.children.length === 0) {
                        container.remove();
                    }
                }
            });
        }, duration || 3000);
    };

    static About() {
        const currentYear = `- ${new Date().getFullYear()}`;
        const aboutText = `<strong>2026 ${currentYear > 2026 ? currentYear : ''} - ${this.copyright}</strong>. All rights reserved. <strong>https://ferpro.online/</strong>. This library is free to use in any project. If your software is a commercial or popular application, please credit me as the author of this dialog boxes library.`;
        this.Alert('Copyright', aboutText, 'SUCCESS');
    };
};