// remove eslint-disable-next-line
/* eslint-disable */
export function scrollToSmoothly(
  el: any,
  time: any,
  hasSignal: boolean = false
) {
  const targetElement = document.getElementById(el);
  if (!targetElement) {
    return;
  }

  if (hasSignal) {
    targetElement.style.transition = 'box-shadow 0.3s ease-in-out';
    targetElement.style.boxShadow = 'inset 0 0 0 3px #FFB32F';
    setTimeout(() => {
      targetElement.style.boxShadow = 'none';
    }, 1000 * 5);
  }

  let pos = targetElement.offsetTop;
  const currentPos = window.scrollY;
  let start: any = null;
  if (time == null) time = 500;
  (pos = +pos), (time = +time);

  window.requestAnimationFrame(function step(currentTime) {
    start = !start ? currentTime : start;
    const progress = currentTime - start;
    if (currentPos < pos) {
      window.scrollTo(0, ((pos - currentPos) * progress) / time + currentPos);
    } else {
      window.scrollTo(0, currentPos - ((currentPos - pos) * progress) / time);
    }
    if (progress < time) {
      window.requestAnimationFrame(step);
    } else {
      window.scrollTo(0, pos);

      setTimeout(() => {
        targetElement.style.backgroundColor = '';
      }, 1000);
    }
  });
}

export function getBaseUrl() {
  if (typeof window !== 'undefined')
    return '';
  
  if (process.env.VERCEL_URL)
    return `https://${process.env.VERCEL_URL}`;
    
  return `http://localhost:3000`;
}