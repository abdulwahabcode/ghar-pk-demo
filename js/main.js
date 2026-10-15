// GHAR.PK demo — nav, reveal, counters, WhatsApp form
(function(){
  var nav = document.getElementById('nav');
  var burger = document.getElementById('burger');
  var links = document.getElementById('navLinks');

  window.addEventListener('scroll', function(){
    nav.classList.toggle('scrolled', window.scrollY > 10);
  }, {passive:true});

  burger.addEventListener('click', function(){
    var open = links.classList.toggle('open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  links.addEventListener('click', function(e){
    if (e.target.tagName === 'A') {
      links.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    }
  });

  // reveal on scroll
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, {threshold:.12});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });

  // animated counters
  var cio = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if (!en.isIntersecting) return;
      var el = en.target, target = parseInt(el.dataset.count, 10), t0 = null;
      cio.unobserve(el);
      function tick(t){
        if (!t0) t0 = t;
        var p = Math.min((t - t0) / 1400, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }, {threshold:.5});
  document.querySelectorAll('.stat-num[data-count]').forEach(function(el){ cio.observe(el); });

  // contact form -> WhatsApp
  document.getElementById('contactForm').addEventListener('submit', function(e){
    e.preventDefault();
    var name = document.getElementById('cfName').value.trim();
    var phone = document.getElementById('cfPhone').value.trim();
    var topic = document.getElementById('cfTopic').value;
    var msg = document.getElementById('cfMsg').value.trim();
    var text = 'Assalam-o-Alaikum! I am ' + name + ' (' + phone + '). I am interested in: ' + topic + '.' + (msg ? ' Message: ' + msg : '');
    window.open('https://wa.me/923238299252?text=' + encodeURIComponent(text), '_blank');
  });
})();
