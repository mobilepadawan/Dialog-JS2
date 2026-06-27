// import { Dialog2 } from "../../src/dialogJS2.0.js";

document.querySelector('h1.header-title').addEventListener('click', () => {
    // Dialog2.Prompt('Título', 'Ingresa el dato solicitado', 'Dato a buscar', 'search', 'Buscar', 'Cerrar')
    //     .then((result) => {
    //         console.log(result)
    // });

    // Dialog2.Confirm('Título del diálogo', 'Este es un mensaje de prueba, sólo para ver qué tal luce el cuadro Confirm.', 'INFO', "Aceptar", "Cancelar")
    //         .then((result) => {
    //             console.log(result)
    // });

    Dialog2.Alert('Título del diálogo', 'Este es un mensaje de prueba, sólo para ver qué tal luce el cuadro de alerta y el mensaje en la aplicación.', 'WARNING', "Aceptar")
        .then((result) => {
            console.log(result)
    });

    // Dialog2.Toast('Esto es un mensaje Toast, simple.', 'INFO', 5000, 'top-center');
});

const overlay = document.getElementById('dialog-overlay');
const box = document.getElementById('dialog-box');
const titleEl = document.getElementById('dialog-title-el');
const messageEl = document.getElementById('dialog-message-el');
const inputWrapper = document.getElementById('dialog-input-wrapper');
const inputEl = document.getElementById('dialog-input-el');
const btnCancel = document.getElementById('dialog-btn-cancel');
const btnOk = document.getElementById('dialog-btn-ok');
const btnClose = document.getElementById('dialog-close-btn');

let dialogResolver = null;

const Dialog = {
    show(options = {}) {
        return new Promise((resolve) => {
            dialogResolver = resolve;

            box.className = 'dialog-box';
            box.classList.add(options.theme || 'theme-dark');

            titleEl.textContent = options.title || 'Alerta';
            messageEl.textContent = options.message || '';

            if (options.type === 'prompt') {
                inputWrapper.classList.remove('hidden');
                inputEl.value = options.defaultValue || '';
                btnCancel.classList.remove('hidden');
                btnCancel.textContent = options.cancelText || 'Cancelar';
                btnOk.textContent = options.okText || 'Enviar';
            } else if (options.type === 'confirm') {
                inputWrapper.classList.add('hidden');
                btnCancel.classList.remove('hidden');
                btnCancel.textContent = options.cancelText || 'Cancelar';
                btnOk.textContent = options.okText || 'Confirmar';
            } else { // alert
                inputWrapper.classList.add('hidden');
                btnCancel.classList.add('hidden');
                btnOk.textContent = options.okText || 'Aceptar';
            }

            overlay.classList.remove('hidden');
            setTimeout(() => {
                inputEl.focus();
            }, 50);
        });
    },

    close(value) {
        overlay.classList.add('hidden');
        if (dialogResolver) {
            dialogResolver(value);
            dialogResolver = null;
        }
    },

    alert(options) {
        return this.show({ ...options, type: 'alert' });
    },

    confirm(options) {
        return this.show({ ...options, type: 'confirm' });
    },

    prompt(options) {
        return this.show({ ...options, type: 'prompt' });
    }
};

// Modal Events
btnOk.addEventListener('click', () => {
    const isPrompt = !inputWrapper.classList.contains('hidden');
    Dialog.close(isPrompt ? inputEl.value : true);
});

btnCancel.addEventListener('click', () => {
    const isPrompt = !inputWrapper.classList.contains('hidden');
    Dialog.close(isPrompt ? null : false);
});

btnClose.addEventListener('click', () => {
    const isPrompt = !inputWrapper.classList.contains('hidden');
    Dialog.close(isPrompt ? null : false);
});

overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
        const isPrompt = !inputWrapper.classList.contains('hidden');
        Dialog.close(isPrompt ? null : false);
    }
});

document.addEventListener('keydown', (e) => {
    if (!overlay.classList.contains('hidden')) {
        if (e.key === 'Enter') {
            e.preventDefault();
            btnOk.click();
        } else if (e.key === 'Escape') {
            btnCancel.click();
        }
    }
});

let activeGlobalTheme = 'theme-dark';

const demoTriggers = document.querySelectorAll('.btn-demo-trigger');
demoTriggers.forEach(button => {
    button.addEventListener('click', async () => {
        const dialogType = button.getAttribute('data-dialog-type');

        if (dialogType === 'alert') {
            await Dialog.alert({
                title: '🔔 Notificación de Alerta',
                message: '¡Esta es una ventana de alerta estilizada! Totalmente responsive y accesible.',
                theme: activeGlobalTheme,
                okText: 'Entendido'
            });
        } else if (dialogType === 'confirm') {
            const confirmed = await Dialog.confirm({
                title: '⚠️ ¿Proceder con la Acción?',
                message: '¿Estás seguro de que quieres continuar con este paso? Esta acción requiere confirmación del usuario.',
                theme: activeGlobalTheme,
                okText: 'Sí, continuar',
                cancelText: 'Mejor no'
            });

            // Show result using another Alert
            setTimeout(() => {
                Dialog.alert({
                    title: 'Resultado de Confirmación',
                    message: confirmed ? '¡Acción confirmada con éxito!' : 'Acción cancelada por el usuario.',
                    theme: activeGlobalTheme
                });
            }, 400);
        } else if (dialogType === 'prompt') {
            const name = await Dialog.prompt({
                title: '👤 Entrada de Datos',
                message: 'Por favor, dinos tu nombre para saludarte:',
                defaultValue: 'Invitado',
                theme: activeGlobalTheme,
                okText: 'Guardar'
            });

            // Show result using another Alert
            if (name !== null) {
                setTimeout(() => {
                    Dialog.alert({
                        title: '¡Bienvenido!',
                        message: `Hola, ${name || 'usuario sin nombre'}. ¡Qué gusto tenerte de visita en Dialog-JS!`,
                        theme: activeGlobalTheme
                    });
                }, 400);
            }
        }
    });
});

// 2. Playground Configurator Sandbox
const playType = document.getElementById('play-type');
const playTitle = document.getElementById('play-title');
const playMessage = document.getElementById('play-message');
const playTheme = document.getElementById('play-theme');
const playgroundCode = document.getElementById('playground-code');
const btnPlayTrigger = document.getElementById('btn-play-trigger');

function updatePlaygroundCode() {
    const type = playType.value;
    const title = playTitle.value.replace(/'/g, "\\'");
    const message = playMessage.value.replace(/'/g, "\\'");
    const theme = playTheme.value;

    let code = `Dialog.${type}({\n`;
    code += `  title: '${title}',\n`;
    code += `  message: '${message}',\n`;
    code += `  theme: '${theme}'\n`;
    code += `});`;

    playgroundCode.textContent = code;
}

// Bind event listeners to sandbox inputs
[playType, playTitle, playMessage, playTheme].forEach(input => {
    input.addEventListener('input', updatePlaygroundCode);
    input.addEventListener('change', updatePlaygroundCode);
});

// Execute Sandbox Dialog
btnPlayTrigger.addEventListener('click', async () => {
    const type = playType.value;
    const title = playTitle.value;
    const message = playMessage.value;
    const theme = playTheme.value;

    if (type === 'alert') {
        await Dialog.alert({ title, message, theme });
    } else if (type === 'confirm') {
        const res = await Dialog.confirm({ title, message, theme });
        setTimeout(() => {
            Dialog.alert({
                title: 'Retorno del Playground',
                message: `Valor devuelto por el Confirm: ${res}`,
                theme: theme
            });
        }, 400);
    } else if (type === 'prompt') {
        const res = await Dialog.prompt({ title, message, theme });
        if (res !== null) {
            setTimeout(() => {
                Dialog.alert({
                    title: 'Retorno del Playground',
                    message: `Valor ingresado en el Prompt: "${res}"`,
                    theme: theme
                });
            }, 400);
        }
    }
});

// 3. Quick Installation Tabs
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');

        // Toggle active classes in buttons
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Toggle active panes
        tabPanes.forEach(pane => {
            if (pane.id === `tab-${targetTab}`) {
                pane.classList.add('active');
            } else {
                pane.classList.remove('active');
            }
        });
    });
});

// Clipboard Copy Code
const copyBtns = document.querySelectorAll('.btn-copy-code');
copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const codeEl = btn.previousElementSibling;
        const textToCopy = codeEl.textContent;

        navigator.clipboard.writeText(textToCopy).then(() => {
            const originalText = btn.textContent;
            btn.textContent = '¡Copiado!';
            btn.style.borderColor = '#10b981';
            btn.style.color = '#10b981';

            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.borderColor = '';
                btn.style.color = '';
            }, 2000);
        }).catch(err => {
            console.error('Error al copiar texto: ', err);
        });
    });
});

// 4. Styles Theme Selection Cards
const themeCards = document.querySelectorAll('.theme-card');
themeCards.forEach(card => {
    card.addEventListener('click', () => {
        const selectedTheme = card.getAttribute('data-theme-name');

        // Update active state in grids
        themeCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');

        // Update active state variables
        activeGlobalTheme = selectedTheme;

        // Sync with playground config theme dropdown
        playTheme.value = selectedTheme;
        updatePlaygroundCode();

        // Trigger a preview Alert dialog with the selected theme
        let niceTitle = 'Tema Configurado';
        if (selectedTheme === 'theme-dark') niceTitle = 'Cosmic Dark Activado 🌌';
        if (selectedTheme === 'theme-light') niceTitle = 'Sleek Light Activado ☀️';
        if (selectedTheme === 'theme-glass') niceTitle = 'Cyber Glass Activado 💎';
        if (selectedTheme === 'theme-obsidian') niceTitle = 'Obsidian Gold Activado 👑';

        Dialog.alert({
            title: niceTitle,
            message: `Has cambiado el esquema global al tema: "${selectedTheme.replace('theme-', '')}". Todos los ejemplos usarán este estilo ahora.`,
            theme: selectedTheme
        });
    });
});

// 5. Contact Form Submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const fullname = document.getElementById('fullname').value;

        // Show successful message via Custom Dialog Alert
        Dialog.alert({
            title: '✉️ ¡Mensaje Recibido!',
            message: `Gracias por contactarnos, ${fullname}. Tu mensaje se ha simulado correctamente. Nos pondremos en contacto contigo lo antes posible.`,
            theme: activeGlobalTheme,
            okText: 'Cerrar'
        });

        contactForm.reset();
    });
}

// Initialize Playground Code display
// updatePlaygroundCode();