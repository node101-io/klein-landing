window.addEventListener('load', () => {
  const allWrapper = document.querySelector('.all-wrapper');
  const allHeaderAnimationMaxHeight = 150;
  const allHeaderWrapper = document.querySelector('.all-header');

  allWrapper.addEventListener('scroll', event => {
    allHeaderWrapper.style.borderBottomColor = `rgba(254, 254, 254, ${0.2 * Math.min(event.target.scrollTop, allHeaderAnimationMaxHeight) / allHeaderAnimationMaxHeight})`;
    allHeaderWrapper.style.boxShadow = `0 0 3px rgba(254, 254, 254, ${0.2 * Math.min(event.target.scrollTop, allHeaderAnimationMaxHeight) / allHeaderAnimationMaxHeight})`;
  });

  let isSubscribeFormSent = false;
  const subscribeForm = document.getElementById('footer-subscribe-form');
  const emailValidationError = document.getElementById('email-validation-error');
  const unknownError = document.getElementById('unknown-error');
  const alreadyRegisteredMessage = document.getElementById('already-registered-message');
  const successMessage = document.getElementById('success-message');

  subscribeForm.addEventListener('submit', event => {
    event.preventDefault();

    emailValidationError.style.display =
    unknownError.style.display =
    alreadyRegisteredMessage.style.display = 'none';

    if (isSubscribeFormSent) return;

    const email = document.getElementById('footer-email').value;

    if (!email || !email.trim().length)
      return emailValidationError.style.display = 'block';

    serverRequest('/subscribe', 'POST', {
      email
    }, res => {
      if (!res.success && res.error == 'duplicated_unique_field')
        return alreadyRegisteredMessage.style.display = 'block';
      if (!res.success)
        return unknownError.style.display = 'block';

      isSubscribeFormSent = true;
      successMessage.style.display = 'block';
    });
  });
});