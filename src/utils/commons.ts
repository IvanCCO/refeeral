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
  // Browser - use the current window location
  if (typeof window !== 'undefined') {
    const { protocol, host } = window.location;
    return `${protocol}//${host}`;
  }

  // Server - use environment variables
  if (process.env.VERCEL_URL) {
    return `https://www.brioeducaindica.com.br`;
  }

  // Fallback for development
  return process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
}

/**
 * Generates a WhatsApp URL with the Brio contact number and custom message
 * @param message The message to send via WhatsApp
 * @returns Formatted WhatsApp URL
 */
export function generateWhatsAppLink(message: string): string {
  const WHATSAPP_NUMBER = '5511954602091';
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
