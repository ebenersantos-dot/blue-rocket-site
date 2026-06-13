# Blue Rocket Co. — Deployment Guide (Shared Hosting / cPanel)

© 2026 Blue Rocket Co. All rights reserved.

---

## Prerequisites

- cPanel hosting with PHP 8.0+ and `mail()` enabled (standard on Namecheap, SiteGround, etc.)
- Your domain DNS pointing to the host
- SSL certificate active (Let's Encrypt via cPanel is free and takes 2 minutes)

---

## Before you upload — one required edit

Open `mail/contact.php` and change the CSRF secret on line ~20:

```php
define('CSRF_SECRET', 'BR_CSRF_SECRET_CHANGE_THIS_BEFORE_DEPLOY');
```

Replace with any long random string (32+ characters). Example:

```php
define('CSRF_SECRET', 'Xk9#mP2$vL7nQ4wR8jT1yA6sD3fG5hB0');
```

Then open `js/main.js` and find the matching line (~line 170) and set **the exact same string**:

```js
var secret = 'BR_CSRF_SECRET_CHANGE_THIS_BEFORE_DEPLOY';
```

→

```js
var secret = 'Xk9#mP2$vL7nQ4wR8jT1yA6sD3fG5hB0';
```

Both values must be identical or form submissions will be rejected.

---

## Upload steps

1. **Log in to cPanel → File Manager**
2. Navigate to `public_html/` (or the folder your domain points to)
3. Upload **all files and folders** from the project root — everything except `.git/` and `.DS_Store` files:

```
public_html/
├── .htaccess          ← must be at the root
├── index.html
├── services.html
├── about.html
├── process.html
├── contact.html
├── assets/
├── css/
├── js/
├── mail/
│   ├── contact.php
│   └── .htaccess
└── docs/              (optional — safe to omit)
```

> **Important:** `.htaccess` is a hidden file. Make sure your FTP client or File Manager shows hidden files before uploading.

4. Verify file permissions:
   - PHP files: `644`
   - Directories: `755`
   - The PHP rate-limit directory is created automatically in the server's temp folder — no action needed

---

## Test the contact form

1. Open your site over HTTPS
2. Open the "Book a call" modal, fill in the form, and submit
3. **Check `bluerocketco.7@gmail.com` for an activation email from FormSubmit** — click the link in it once (first submission only)
4. Submit a second test — this one should arrive immediately, formatted as a table

If email doesn't arrive:
- Check cPanel → **Email** → **Track Delivery** to see if `mail()` is delivering
- Some hosts require you to set a proper From address in cPanel → **Email Accounts** first
- As a fallback, replace the `mail()` call in `contact.php` with PHPMailer + SMTP (see below)

---

## Optional: PHPMailer / SMTP fallback

If `mail()` is unreliable on your host (common on some VPS setups), use PHPMailer:

1. Upload PHPMailer via Composer or manually place `PHPMailer/` in the project root
2. Replace the `mail()` block at the bottom of `contact.php` with:

```php
use PHPMailer\PHPMailer\PHPMailer;
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';
require 'PHPMailer/src/Exception.php';

$mail = new PHPMailer(true);
$mail->isSMTP();
$mail->Host       = 'smtp.gmail.com';       // or your host's SMTP
$mail->SMTPAuth   = true;
$mail->Username   = 'bluerocketco.7@gmail.com';
$mail->Password   = 'YOUR_APP_PASSWORD';    // Gmail App Password, not your login
$mail->SMTPSecure = 'tls';
$mail->Port       = 587;
$mail->setFrom(FROM_EMAIL, FROM_NAME);
$mail->addAddress(TO_EMAIL);
$mail->Subject = $subject;
$mail->Body    = $textBody;
$sent = $mail->send();
```

For Gmail: generate an **App Password** at myaccount.google.com → Security → App passwords.

---

## Security checklist (verify after deploy)

- [ ] Site loads over HTTPS and HTTP redirects to HTTPS
- [ ] `https://yourdomain.com/mail/` shows 403 (directory listing blocked)
- [ ] `https://yourdomain.com/.htaccess` returns 403 (file blocked)
- [ ] Security headers visible in browser DevTools → Network → Response Headers:
  - `X-Frame-Options: DENY`
  - `X-Content-Type-Options: nosniff`
  - `Content-Security-Policy` present
  - `Strict-Transport-Security` present
- [ ] Form submission arrives in inbox
- [ ] Submitting 6 times within 15 minutes returns a rate-limit error on the 6th

---

## Content Security Policy note

The `.htaccess` CSP allows scripts only from `cdn.jsdelivr.net` (React CDN). If you later add any other third-party script, add its domain to the `script-src` directive in `.htaccess`.

---

*Blue Rocket Co. — bluerocketco.7@gmail.com*
