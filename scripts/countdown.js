'use strict';

(function () {
  var target  = new Date('2026-06-06T10:00:00');
  var elDays  = document.getElementById('cd-days');
  var elHours = document.getElementById('cd-hours');
  var elMins  = document.getElementById('cd-mins');
  var elSecs  = document.getElementById('cd-secs');

  function pad(n) { return String(n).padStart(2, '0'); }

  var started = false;

  function tick() {
    var diff = target - Date.now();

    if (diff <= 0) {
      if (!started) {
        started = true;
        document.getElementById('countdown').setAttribute('aria-label', 'Timp scurs de la inceperea UVTech Fest 2026');
        var liveMsg = document.createElement('p');
        liveMsg.className = 'countdown-live-msg';
        liveMsg.textContent = 'Evenimentul a inceput!';
        document.getElementById('countdown').insertAdjacentElement('beforebegin', liveMsg);
      }
      diff = Math.abs(diff);
    }

    elDays.textContent  = pad(Math.floor(diff / 86400000));
    elHours.textContent = pad(Math.floor((diff % 86400000) / 3600000));
    elMins.textContent  = pad(Math.floor((diff % 3600000)  / 60000));
    elSecs.textContent  = pad(Math.floor((diff % 60000)    / 1000));
  }

  tick();
  setInterval(tick, 1000);
}());
