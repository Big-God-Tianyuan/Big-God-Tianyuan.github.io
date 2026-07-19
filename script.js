(() => {
  const root = document.documentElement;
  const themeButton = document.querySelector('.theme-toggle');
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) root.dataset.theme = savedTheme;
  themeButton?.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    localStorage.setItem('theme', next);
  });
  menuButton?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  }));
  document.querySelectorAll('.accordion-item button').forEach(button => button.addEventListener('click', () => {
    const item = button.closest('.accordion-item');
    const open = item.classList.toggle('open');
    button.setAttribute('aria-expanded', String(open));
    item.querySelector('.plus').textContent = open ? '−' : '+';
  }));
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
  const reveal = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); reveal.unobserve(entry.target); }
  }), { threshold: .1 });
  document.querySelectorAll('.reveal').forEach(el => reveal.observe(el));
  const header = document.querySelector('.site-header');
  const progress = document.querySelector('.progress span');
  const onScroll = () => {
    header?.classList.toggle('scrolled', scrollY > 12);
    const range = document.documentElement.scrollHeight - innerHeight;
    if (progress) progress.style.width = `${range > 0 ? scrollY / range * 100 : 0}%`;
  };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  const filters = document.querySelectorAll('.filter-button');
  filters.forEach(button => button.addEventListener('click', () => {
    filters.forEach(item => item.classList.remove('active')); button.classList.add('active');
    const filter = button.dataset.filter;
    document.querySelectorAll('.publication').forEach(item => item.hidden = filter !== 'all' && item.dataset.type !== filter);
  }));
})();
