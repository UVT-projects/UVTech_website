'use strict';

var form           = document.getElementById('portfolio-form');
var tbody          = document.getElementById('projects-tbody');
var projectsSection = document.getElementById('projects-section');
var submitBtn      = form.querySelector('button[type="submit"]');
var editingRow     = null;

var fields = {
  'project-name': {
    validate: function (v) { return v.trim().length >= 2; },
    message: 'Numele proiectului este obligatoriu (minim 2 caractere).'
  },
  'project-desc': {
    validate: function (v) { return v.trim().length >= 20; },
    message: 'Descrierea trebuie sa aiba cel putin 20 de caractere.'
  },
  'project-url': {
    validate: function (v) { return /^https?:\/\/.{3,}/.test(v.trim()); },
    message: 'Introdu un URL valid care incepe cu http:// sau https://.'
  },
  'project-category': {
    validate: function (v) { return v !== ''; },
    message: 'Selecteaza o categorie pentru proiect.'
  },
  'project-tech': {
    validate: function (v) { return v.trim().length >= 2; },
    message: 'Introdu cel putin o tehnologie folosita.'
  },
  'project-img': {
    validate: function (v) { return v.trim() === '' || /^https?:\/\/.{3,}/.test(v.trim()); },
    message: 'URL-ul imaginii nu este valid. Lasa gol sau introdu un URL complet (https://...).'
  },
  'project-date': {
    validate: function (v) { return v !== ''; },
    message: 'Data finalizarii este obligatorie.'
  }
};

/* ── Validation helpers ──────────────────────────────────── */
function showError(id, message) {
  var input = document.getElementById(id);
  var error = document.getElementById('err-' + id);
  input.setAttribute('aria-invalid', 'true');
  error.textContent = message;
}

function clearError(id) {
  var input = document.getElementById(id);
  var error = document.getElementById('err-' + id);
  input.removeAttribute('aria-invalid');
  error.textContent = '';
}

function validateAll() {
  var valid = true;
  var ids = Object.keys(fields);
  for (var i = 0; i < ids.length; i++) {
    var id = ids[i];
    if (!fields[id].validate(document.getElementById(id).value)) {
      showError(id, fields[id].message);
      valid = false;
    } else {
      clearError(id);
    }
  }
  return valid;
}

function clearAllErrors() {
  var ids = Object.keys(fields);
  for (var i = 0; i < ids.length; i++) { clearError(ids[i]); }
}

/* ── Utilities ───────────────────────────────────────────── */
function formatDate(dateStr) {
  if (!dateStr) return '—';
  var p = dateStr.split('-');
  return p[2] + '.' + p[1] + '.' + p[0];
}

function makePlaceholder() {
  var div = document.createElement('div');
  div.className = 'thumb-placeholder';
  div.setAttribute('aria-hidden', 'true');
  div.textContent = 'No img';
  return div;
}

function buildImgCell(data) {
  var td = document.createElement('td');
  td.dataset.label = 'Imagine';
  if (data.img) {
    var img = document.createElement('img');
    img.src = data.img;
    img.alt = data.name + ' — previzualizare';
    img.className = 'project-thumb';
    img.loading = 'lazy';
    img.width = 60;
    img.height = 60;
    img.onerror = function () { this.replaceWith(makePlaceholder()); };
    td.appendChild(img);
  } else {
    td.appendChild(makePlaceholder());
  }
  return td;
}

/* ── Edit mode ───────────────────────────────────────────── */
function startEdit(row) {
  editingRow = row;
  submitBtn.textContent = 'Update';

  document.getElementById('project-name').value     = row.dataset.name;
  document.getElementById('project-desc').value     = row.dataset.desc;
  document.getElementById('project-url').value      = row.dataset.url;
  document.getElementById('project-category').value = row.dataset.category;
  document.getElementById('project-tech').value     = row.dataset.tech;
  document.getElementById('project-img').value      = row.dataset.img;
  document.getElementById('project-date').value     = row.dataset.date;

  clearAllErrors();
  form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  document.getElementById('project-name').focus();
}

function clearEditingState() {
  editingRow = null;
  submitBtn.textContent = 'Save';
}

/* ── Row helpers ─────────────────────────────────────────── */
function storeData(row, data) {
  row.dataset.name     = data.name;
  row.dataset.desc     = data.desc;
  row.dataset.url      = data.url;
  row.dataset.category = data.category;
  row.dataset.tech     = data.tech;
  row.dataset.img      = data.img;
  row.dataset.date     = data.date;
}

function makeEditButton(row, name) {
  var btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'btn-edit-row';
  btn.textContent = 'Editeaza';
  btn.setAttribute('aria-label', 'Editeaza proiectul ' + name);
  btn.addEventListener('click', function () { startEdit(row); });
  return btn;
}

function addProjectRow(data) {
  var tr = document.createElement('tr');
  storeData(tr, data);

  var tdName = document.createElement('td');
  tdName.dataset.label = 'Proiect';
  tdName.textContent = data.name;
  tr.appendChild(tdName);

  var tdDesc = document.createElement('td');
  tdDesc.dataset.label = 'Descriere';
  tdDesc.textContent = data.desc;
  tr.appendChild(tdDesc);

  var tdUrl = document.createElement('td');
  tdUrl.dataset.label = 'URL';
  var link = document.createElement('a');
  link.href = data.url;
  link.textContent = 'Viziteaza';
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  tdUrl.appendChild(link);
  tr.appendChild(tdUrl);

  var tdTech = document.createElement('td');
  tdTech.dataset.label = 'Tehnologii';
  tdTech.textContent = data.tech;
  tr.appendChild(tdTech);

  tr.appendChild(buildImgCell(data));

  var tdDate = document.createElement('td');
  tdDate.dataset.label = 'Data';
  tdDate.textContent = formatDate(data.date);
  tr.appendChild(tdDate);

  var tdActions = document.createElement('td');
  tdActions.dataset.label = 'Actiuni';
  tdActions.appendChild(makeEditButton(tr, data.name));
  tr.appendChild(tdActions);

  tbody.appendChild(tr);
}

function updateRow(row, data) {
  storeData(row, data);
  var c = row.cells;

  c[0].textContent = data.name;
  c[1].textContent = data.desc;

  c[2].innerHTML = '';
  var link = document.createElement('a');
  link.href = data.url;
  link.textContent = 'Viziteaza';
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  c[2].appendChild(link);

  c[3].textContent = data.tech;

  var newImgCell = buildImgCell(data);
  c[4].replaceWith(newImgCell);

  c[5].textContent = formatDate(data.date);

  /* update aria-label on the edit button */
  c[6].querySelector('.btn-edit-row').setAttribute('aria-label', 'Editeaza proiectul ' + data.name);
}

/* ── Form submit ─────────────────────────────────────────── */
form.addEventListener('submit', function (e) {
  e.preventDefault();

  if (!validateAll()) {
    var firstInvalid = form.querySelector('[aria-invalid="true"]');
    if (firstInvalid) { firstInvalid.focus(); }
    return;
  }

  var data = {
    name:     document.getElementById('project-name').value.trim(),
    desc:     document.getElementById('project-desc').value.trim(),
    url:      document.getElementById('project-url').value.trim(),
    category: document.getElementById('project-category').value,
    tech:     document.getElementById('project-tech').value.trim(),
    img:      document.getElementById('project-img').value.trim(),
    date:     document.getElementById('project-date').value
  };

  if (editingRow) {
    updateRow(editingRow, data);
    clearEditingState();
  } else {
    addProjectRow(data);
    projectsSection.removeAttribute('hidden');
  }

  form.reset();
  clearAllErrors();
  projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

/* ── Form reset ──────────────────────────────────────────── */
form.addEventListener('reset', function () {
  setTimeout(function () {
    clearAllErrors();
    clearEditingState();
  }, 0);
});

/* ── Open date picker on click ───────────────────────────── */
(function () {
  var dateInput = document.getElementById('project-date');
  if (dateInput && typeof dateInput.showPicker === 'function') {
    dateInput.addEventListener('click', function () {
      try { this.showPicker(); } catch (e) {}
    });
  }
}());

/* ── Live validation ─────────────────────────────────────── */
(function () {
  var ids = Object.keys(fields);
  for (var i = 0; i < ids.length; i++) {
    (function (id) {
      var input = document.getElementById(id);
      input.addEventListener('blur', function () {
        if (!fields[id].validate(this.value)) {
          showError(id, fields[id].message);
        } else {
          clearError(id);
        }
      });
      input.addEventListener('input', function () {
        if (this.hasAttribute('aria-invalid') && fields[id].validate(this.value)) {
          clearError(id);
        }
      });
    }(ids[i]));
  }
}());
