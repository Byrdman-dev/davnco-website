// ===================== Contact form (Web3Forms) =====================
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const contactSubmit = document.getElementById('contactSubmit');
const accessKeyInput = contactForm.querySelector('input[name="access_key"]');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (accessKeyInput.value === 'YOUR_ACCESS_KEY') {
    formStatus.textContent = 'Contact form is not fully set up yet — Web3Forms access key is missing.';
    formStatus.className = 'form-status error';
    return;
  }

  contactSubmit.disabled = true;
  formStatus.textContent = 'Sending…';
  formStatus.className = 'form-status';

  try {
    const payload = Object.fromEntries(new FormData(contactForm));
    const response = await fetch(contactForm.action, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload)
    });
    const result = await response.json();

    if (response.ok && result.success) {
      formStatus.textContent = "Thanks — your message is on its way. We'll be in touch soon.";
      formStatus.className = 'form-status success';
      contactForm.reset();
    } else {
      formStatus.textContent = 'Something went wrong sending your message. Please email us directly instead.';
      formStatus.className = 'form-status error';
    }
  } catch (err) {
    formStatus.textContent = 'Network error — please try again or email us directly.';
    formStatus.className = 'form-status error';
  } finally {
    contactSubmit.disabled = false;
  }
});
