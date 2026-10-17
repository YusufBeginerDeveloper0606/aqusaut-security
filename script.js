'use strict';
document.addEventListener('DOMContentLoaded', () => {
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if (menu && nav) {
    menu.addEventListener('click', () => {
      const opened = nav.classList.toggle('open');
      menu.setAttribute('aria-expanded', String(opened));
      menu.setAttribute('aria-label', opened ? 'Закрыть меню' : 'Открыть меню');
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open');
      menu.setAttribute('aria-expanded', 'false');
    }));
  }

  const topButton = document.querySelector('.back-to-top');
  if (topButton) {
    const updateTop = () => topButton.classList.toggle('visible', window.scrollY > 350);
    window.addEventListener('scroll', updateTop, { passive: true });
    updateTop();
    topButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  const form = document.querySelector('#contact-form');
  if (form) {
    document.querySelectorAll('[data-service]').forEach(link => {
      link.addEventListener('click', () => {
        const select = form.querySelector('[name="service"]');
        if (!select) return;
        const wanted = (link.dataset.service || '').toLowerCase();
        const option = Array.from(select.options).find(o => wanted.includes(o.textContent.toLowerCase()) || o.textContent.toLowerCase().includes(wanted));
        if (option) select.value = option.value;
      });
    });
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const message = `Здравствуйте! Меня зовут ${String(data.get('name') || '').trim()}. Телефон: ${String(data.get('phone') || '').trim()}. Услуга: ${String(data.get('service') || 'Консультация')}. Прошу связаться со мной.`;
      window.location.href = `https://wa.me/77072320046?text=${encodeURIComponent(message)}`;
    });
  }

  const toggle = document.querySelector('.quick-contact-toggle');
  const options = document.querySelector('#quick-contact-options');
  if (toggle && options) {
    toggle.addEventListener('click', () => {
      const opened = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(opened));
      toggle.setAttribute('aria-label', opened ? 'Закрыть способы связи' : 'Открыть способы связи');
      options.hidden = !opened;
    });
  }
});
