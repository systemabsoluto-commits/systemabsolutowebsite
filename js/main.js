// System Absoluto LLC — botón flotante de WhatsApp y formulario de cotización
(function () {
  var WA_NUMBER = '14055035283';

  // Abrir / cerrar el panel flotante
  var panel = document.getElementById('wa-panel');
  var toggles = document.querySelectorAll('[data-wa-toggle]');
  function setOpen(open) {
    if (!panel) return;
    panel.hidden = !open;
    toggles.forEach(function (b) { b.setAttribute('aria-expanded', open ? 'true' : 'false'); });
  }
  toggles.forEach(function (b) {
    b.setAttribute('aria-expanded', 'false');
    if (panel) b.setAttribute('aria-controls', 'wa-panel');
    b.addEventListener('click', function () { setOpen(panel && panel.hidden); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && panel && !panel.hidden) setOpen(false);
  });

  // El formulario de cotización envía la solicitud por WhatsApp
  var cfg = window.SA_FORM || {};
  document.querySelectorAll('form[data-wa-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var val = function (n) { var el = form.elements[n]; return el ? String(el.value || '').trim() : ''; };
      var lines = [cfg.intro || ''];
      if (val('name')) lines.push((cfg.name || 'Name') + ': ' + val('name'));
      if (val('phone')) lines.push((cfg.phone || 'Phone') + ': ' + val('phone'));
      if (val('zip')) lines.push((cfg.zip || 'ZIP') + ': ' + val('zip'));
      if (val('interest')) lines.push((cfg.interest || 'Interested in') + ': ' + val('interest'));
      var url = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(lines.join('\n'));
      window.open(url, '_blank', 'noopener');
    });
  });
})();
