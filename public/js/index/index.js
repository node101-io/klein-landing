const SLIDE_ANIMATION_INTERVAL = 14;
const SLIDE_ANIMATION_STEP = 1;

let boxPadding = null;
let activeProject = null;
let activeProjectToLeft = 0;

function removeProject(element) {
  const newElement = element.cloneNode(true);
  element.remove();
  newElement.style.marginLeft = `${boxPadding}px`;
  document.querySelector('.projects-wrapper').appendChild(newElement);
};

function projectsSlideAnimation() {
  if (activeProjectToLeft > activeProject.getBoundingClientRect().width + boxPadding * 2) {
    activeProjectToLeft = 0;
    removeProject(activeProject);
    activeProject = document.querySelector('.projects-wrapper').childNodes[0];
    activeProject.style.marginLeft = `0`;
  } else {
    activeProjectToLeft += SLIDE_ANIMATION_STEP;
    activeProject.style.marginLeft = `-${activeProjectToLeft}px`;
  }
  setTimeout(() => {
    projectsSlideAnimation();
  }, SLIDE_ANIMATION_INTERVAL)
};

window.addEventListener('load', () => {
  boxPadding = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--box-padding').replace('px',  ''));
  activeProjectToLeft = boxPadding;

  const allWrapper = document.querySelector('.all-wrapper');
  const allHeaderAnimationMaxHeight = 150;
  const allHeaderWrapper = document.querySelector('.all-header');

  activeProject = document.querySelector('.projects-wrapper').childNodes[0];
  projectsSlideAnimation();

  allWrapper.addEventListener('scroll', event => {
    allHeaderWrapper.style.borderBottomColor = `rgba(14, 14, 16, ${0.2 * Math.min(event.target.scrollTop, allHeaderAnimationMaxHeight) / allHeaderAnimationMaxHeight})`;
    allHeaderWrapper.style.boxShadow = `0 0 3px rgba(14, 14, 16, ${0.2 * Math.min(event.target.scrollTop, allHeaderAnimationMaxHeight) / allHeaderAnimationMaxHeight})`;
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