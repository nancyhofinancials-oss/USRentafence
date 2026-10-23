/* Add a service adapter here when the quote delivery service is configured.
   submit must return { accepted: true } only after confirmed server acceptance.
   No contact information is persisted by this page. */
const quoteDelivery = { submit: null };
const quoteForm = document.querySelector('#quote-form');
const quoteButton = document.querySelector('#quote-submit');
const quoteStatus = document.querySelector('#form-status');
const quoteErrors = document.querySelector('#form-errors');
const quoteFields = [...quoteForm.querySelectorAll('input, select, textarea')];
const dateField = quoteForm.elements.installationDate;
const today = new Date();
const localDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
dateField.min = localDate;
quoteForm.noValidate = true;
quoteButton.disabled = false;

function quoteFieldError(field) {
  if (field.required && !field.value.trim()) return 'Please complete this field.';
  if (field.name === 'email' && field.validity.typeMismatch) return 'Enter a valid email address.';
  if (field.name === 'phone' && field.value.replace(/\D/g, '').length < 7) return 'Enter a phone number including the area code.';
  if (field.name === 'zip' && field.validity.patternMismatch) return 'Enter a 5-digit ZIP code or ZIP+4 (12345-6789).';
  if (field.name === 'footage' && !field.validity.valid) return 'Enter a whole number from 1 to 1,000,000, or leave blank if unsure.';
  if (field.name === 'installationDate' && !field.validity.valid) return 'Choose today or a future date, or leave this field blank.';
  if (!field.validity.valid) return 'Please check this value.';
  return '';
}
function showQuoteFieldError(field) {
  const message = quoteFieldError(field);
  const error = document.getElementById(`${field.id}-error`);
  if (error) error.textContent = message;
  if (message) field.setAttribute('aria-invalid', 'true');
  else field.removeAttribute('aria-invalid');
  return message;
}
quoteFields.forEach(field => field.addEventListener('input', () => {
  if (field.hasAttribute('aria-invalid')) showQuoteFieldError(field);
  quoteErrors.hidden = true;
  quoteStatus.textContent = 'Preview only. Your information will not be sent or saved.';
}));
quoteForm.addEventListener('submit', async event => {
  event.preventDefault();
  quoteErrors.replaceChildren();
  const errors = quoteFields.map(field => ({ field, message: showQuoteFieldError(field) })).filter(item => item.message);
  quoteErrors.hidden = errors.length === 0;
  if (errors.length) {
    const heading = document.createElement('p');
    heading.textContent = 'Please check the following fields:';
    const list = document.createElement('ul');
    errors.forEach(({ field, message }) => {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = `#${field.id}`;
      link.textContent = `${field.labels[0].textContent.replace('*', '').trim()}: ${message}`;
      link.addEventListener('click', event => { event.preventDefault(); field.focus(); });
      item.append(link); list.append(item);
    });
    quoteErrors.append(heading, list);
    quoteStatus.textContent = 'Your details need attention. Nothing has been sent.';
    quoteErrors.focus();
    return;
  }
  if (!quoteDelivery.submit) {
    quoteStatus.textContent = 'Your details are ready, but have NOT been sent. Online delivery is not connected. Please call 516-805-1947 to request your quote.';
    return;
  }
  quoteButton.disabled = true;
  quoteStatus.textContent = 'Sending your request…';
  try {
    const result = await quoteDelivery.submit(Object.fromEntries(new FormData(quoteForm)));
    if (result?.accepted !== true) throw new Error('Request was not confirmed.');
    quoteStatus.textContent = 'Your quote request has been received.';
  } catch {
    quoteStatus.textContent = 'We could not confirm delivery. Your details remain here. Please call 516-805-1947.';
  } finally {
    quoteButton.disabled = false;
  }
});
