
(function(){
  const root = document.documentElement;
  const saved = localStorage.getItem('theme');
  if(saved === 'dark') root.classList.add('dark');
  else if(saved === 'light') root.classList.remove('dark');
  else if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) root.classList.add('dark');

  function setTheme(mode){
    root.classList.toggle('dark', mode === 'dark');
    localStorage.setItem('theme', mode);
    document.querySelectorAll('[data-theme-label]').forEach(el => el.textContent = mode === 'dark' ? 'Dark' : 'Light');
  }
  document.addEventListener('click', e => {
    const toggle = e.target.closest('[data-theme-toggle]');
    if(toggle){ setTheme(root.classList.contains('dark') ? 'light' : 'dark'); }
    const menuBtn = e.target.closest('[data-mobile-toggle]');
    if(menuBtn){
      const panel = document.querySelector('[data-mobile-panel]');
      if(panel){ panel.classList.toggle('hidden-panel'); panel.classList.toggle('shown-panel'); }
      menuBtn.setAttribute('aria-expanded', menuBtn.getAttribute('aria-expanded') !== 'true');
    }
    const dropdownBtn = e.target.closest('[data-services-toggle]');
    if(dropdownBtn){
      const menu = document.querySelector('[data-services-menu]');
      if(menu) menu.classList.toggle('hidden');
    }
    if(!e.target.closest('[data-services-wrap]')){
      const menu = document.querySelector('[data-services-menu]');
      if(menu) menu.classList.add('hidden');
    }
    const topBtn = e.target.closest('[data-back-top]');
    if(topBtn) window.scrollTo({top:0, behavior:'smooth'});
  });

  document.querySelectorAll('[data-mobile-panel] a').forEach(a => a.addEventListener('click', () => {
    const panel = document.querySelector('[data-mobile-panel]');
    if(panel){ panel.classList.add('hidden-panel'); panel.classList.remove('shown-panel'); }
  }));

  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if(entry.isIntersecting) entry.target.classList.add('is-visible');
  }), {threshold:.12});
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Carousels: one generic instance per [data-carousel]
  document.querySelectorAll('[data-carousel]').forEach(carousel => {
    const track = carousel.querySelector('[data-carousel-track]');
    const slides = Array.from(carousel.querySelectorAll('[data-carousel-slide]'));
    const dots = Array.from(carousel.querySelectorAll('[data-carousel-dot]'));
    const counter = carousel.querySelector('[data-carousel-counter]');
    const prev = carousel.querySelector('[data-carousel-prev]');
    const next = carousel.querySelector('[data-carousel-next]');
    if(!track || slides.length < 2) return;
    let index = 0, timer = null, paused = false, touchStart = null;
    const render = () => {
      track.style.transform = `translateX(-${index*100}%)`;
      dots.forEach((d,i)=>d.setAttribute('aria-current', String(i===index)));
      if(counter) counter.textContent = `${String(index+1).padStart(2,'0')} / ${String(slides.length).padStart(2,'0')}`;
    };
    const go = delta => { index = (index + delta + slides.length) % slides.length; render(); };
    prev && prev.addEventListener('click', ()=>go(-1));
    next && next.addEventListener('click', ()=>go(1));
    dots.forEach((d,i)=>d.addEventListener('click', ()=>{index=i;render();}));
    carousel.addEventListener('mouseenter', ()=>paused=true);
    carousel.addEventListener('mouseleave', ()=>paused=false);
    carousel.addEventListener('touchstart', e=>{touchStart=e.changedTouches[0].clientX; paused=true;},{passive:true});
    carousel.addEventListener('touchend', e=>{
      const end=e.changedTouches[0].clientX;
      if(touchStart!==null && Math.abs(end-touchStart)>40) go(end<touchStart?1:-1);
      touchStart=null; paused=false;
    },{passive:true});
    carousel.addEventListener('keydown', e=>{ if(e.key==='ArrowLeft')go(-1); if(e.key==='ArrowRight')go(1); });
    if(carousel.dataset.autoplay !== 'false'){
      timer=setInterval(()=>{ if(!paused) go(1); }, 4800);
      carousel.addEventListener('destroy', ()=>clearInterval(timer));
    }
    render();
  });

  document.querySelectorAll('[data-contact-form]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const name = form.querySelector('[name=name]');
      const email = form.querySelector('[name=email]');
      const message = form.querySelector('[name=message]');
      const status = form.querySelector('[data-form-status]');
      if(!name.value.trim() || !email.value.trim() || !message.value.trim()){
        status.textContent='Заполните обязательные поля.';
        status.className='mt-4 text-sm text-red-500'; return;
      }
      if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())){
        status.textContent='Проверьте email.';
        status.className='mt-4 text-sm text-red-500'; return;
      }
      status.textContent='Спасибо! Форма заполнена. Подключите backend или Formspree для реальной отправки.';
      status.className='mt-4 text-sm text-emerald-500';
      form.reset();
    });
  });

  const year = document.querySelector('[data-year]');
  if(year) year.textContent = new Date().getFullYear();
})();
