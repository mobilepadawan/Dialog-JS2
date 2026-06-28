# Dialog JS2.0

A lightweight, modern, and dependency-free JavaScript library for creating asynchronous, accessible native modal dialogs and toasts. Its weight is just `(8kb)`. Powered by the native HTML5 `<dialog>` element and fully compatible with JS Modules (ESM).

## Features

* **Asynchronous API:** Every modal (`Alert`, `Confirm`, `Prompt`) returns a Promise, allowing clean `async/await` syntax.
* **Zero Dependencies:** Built entirely with native web standards.
* **Fully Animated SVGs:** Includes responsive, modern vector icons for different states (`SUCCESS`, `ERROR`, `WARNING`, `QUESTION`, `INFO`).
* **Accessible:** Uses native browser modal behaviors (`showModal()`), trap-focus, and supports closing via the `Esc` key or backdrop clicks.
* **CSS files:** You can implement this library with four differents CSS pre-built designs. You can choose between (`Default`, `Dark`, `iOS`, `Android`) themes or take one CSS file and share it as a model with an A.I. platform to create your own CSS design keeping the same CSS classes pre-built.

---
<br>

## Installation & Usage

### 1. Via NPM (ES Modules)

Install the package in your project:


```bash
npm install dialog2
```

Import and use it in your JavaScript file:

```javascript
import { Dialog2 } from './src/dialogJS2.0.js';
```

### 2. Via CDN

You can also use it directly in the browser via native script modules:


```html
<script type="module">
    import { Dialog2 } from './src/dialogJS2.0.js';
    window.Dialog2 = Dialog2;
</script>
```

Add this code in the `<head>` section in your HTML file(s) after download this library. `window.dialog2` expose the `DialogJS2` object in the window global object. This way able you to call the `Dialog2` object into your JS code.

### 3. CSS styles
⚠️ Note: To make the modals look stunning, make sure to link or include the companion CSS file in your project to expose CSS classes for its `Dialog Library`. 

The default CSS file for this library is `dialogJS2-default-theme.css`. Reference this CSS file in the `<head>` section of every HTML file you include to your project.

```html
<link rel="stylesheet" href="./src/dialogJS2-default-theme.css">
```

## API Reference

### Alert
`Dialog2.Alert(title, message, icon, okButtonText)`

Displays an alert box with an 'Ok' button. Resolves to `true` when closed or `null` if cancelled via ESC.

|Parameter|Type|Default|Description|
|-|-|-|-|
|title|string|Required|Title text of the dialog.|
|message|string|Required|Body content/message.|
|icon|string|'INFO'|Icon type: `SUCCESS`, `ERROR`, `WARNING`, `QUESTION`, `INFO`.|
|okButtonText|string|'Ok'|Label for the confirmation button.|

#### Example:
```javascript
await Dialog2.Alert(
                'System Updated', 
                'All changes have been successfully saved.', 
                'SUCCESS', 
                'Got it!'
);
```
<br>

---

<br>

### Confirm
`Dialog2.Confirm(title, message, icon, okButtonText, cancelButtonText)`

Displays a confirmation dialog box with two buttons. Resolves to `true` if the user confirms, and `false` if they cancel or click the backdrop.

|Parameter|Type|Default|Description|
|-|-|-|-|
|title|string|Required|Title text of the dialog.|
|message|string|Required|Question or statement text.|
|icon|string|'QUESTION'|"Icon type: SUCCESS, ERROR, WARNING, QUESTION, INFO."|
|okButtonText|string|'Confirm'|Label for the positive action button.|
|cancelButtonText|string|'Cancel'|Label for the negative action button.|

#### Example:
```javascript
const isDeleted = await Dialog2.Confirm(
                            'Delete File', 
                            'Are you sure you want to delete this report?', 
                            'WARNING', 
                            'Yes, delete', 
                            'No, keep it'
                        );

if (isDeleted) {
    // Proceed with deletion logic
}
```
<br>

---

<br>

### Prompt
`Dialog2.Prompt(title, message, placeholder, inputType, okButtonText, cancelButtonText)`

|Parameter|Type|Default|Description|
|-|-|-|-|
|title|string|Required|Title text of the prompt.|
|message|string|Required|Descriptive text guiding the input.|
|placeholder|string|''|Placeholder text inside the input box.|
|inputType|string|'text'|"The HTML input type (e.g., text, number, password, email)."|
|okButtonText|string|'Confirm'|Label for the submission button.|
|cancelButtonText|string|'Cancel'|Label for the cancellation button.|

#### Example:
```javascript
const userEmail = await Dialog2.Prompt(
                            'Newsletter', 
                            'Please enter your email:', 
                            'example@mail.com', 
                            'email'
                        );

if (userEmail) {
    console.log(`Subscribed email: ${userEmail}`);
}
```
<br>

---

<br>

### Toast

`Dialog2.Toast(message, icon, duration, position)`
Fires a non-blocking temporary notification stack on the screen with a timed visual progress bar.

|Parameter|Type|Default|Description|
|-|-|-|-|
|message|string|Required|Message to show in the toast.|
|icon|string|'INFO'|Icon type: SUCCESS, ERROR, WARNING, QUESTION, INFO.|
|duration|number|3000|Auto-dismiss timer in milliseconds.|
|position|string|'top-right'|Toast placement: top-left, top-center, top-right.|

#### Example:
```javascript
Dialog2.Toast(
        'Connection lost. Retrying...', 
        'WARNING', 
        5000, 
        'top-center'
);
```
<br>

---

<br>

### About 
`Dialog2.About()`

Triggers an informational Alert dialog displaying the library's built-in version, copyright credentials, and license notice.

```javascript
Dialog2.About();
```
<br>

## Promise base code
If you prefer to implement a JS logic by using a `.then()` Promise control method after pressing Accept or Cancel in a Dialog2 method, check the folowwing sample code:

```javascript
Dialog2.Confirm(
            'Your dialog title', 
            'Can you confirm to Delete this file?', 
            'QUESTION', 
            'Confirm', 
            'Cancel'
        )
        .then((result) => {
            if (result === true) {
                // your logic here
            } else {
                // another logic after cancel
            }
});
```

Every Dialog method except `Toast()` returns a `true` boolean value when the user press the **Ok** button, or a `false` boolean value when the user press the **Cancel** button. If the user press the `ESC` key, the dialog will close and the Promise returns `null`.

Keep this return params in mind and make a full test in different scenarios to apply the best practices in your code.
<br>

## License & Credits
Developed by [Fernando Omar Luna](https://ferpro.online).

This library is free to use in any personal or `open-source` projects. If you are integrating this library into a commercial application or a popular platform, attributing the author in your app's `credits/acknowledgments` section is highly appreciated.

