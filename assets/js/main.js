(function () {
  "use strict";
  var data = window.KONTEN || {};

  // Tahun footer
  var th = document.getElementById("tahun");
  if (th) th.textContent = new Date().getFullYear();

  // Menu aktif
  var page = document.body.dataset.page;
  var aktif = document.querySelector('[data-nav="' + page + '"]');
  if (aktif) aktif.classList.add("active");

  // Toggle menu mobile
  var tg = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");
  if (tg && nav) tg.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    tg.setAttribute("aria-expanded", open);
  });

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function tgl(iso) {
    var d = new Date(iso);
    return isNaN(d) ? esc(iso) : d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  }

  function kartu(item, jenis) {
    if (jenis === "galeri") {
      return '<figure><img loading="lazy" src="' + esc(item.gambar) + '" alt="' + esc(item.judul) + '"><figcaption>' + esc(item.judul) + "</figcaption></figure>";
    }
    var img = item.gambar ? '<img loading="lazy" src="' + esc(item.gambar) + '" alt="' + esc(item.judul) + '">' : "";
    var meta = jenis === "event" ? tgl(item.tanggal) + " &middot; " + esc(item.lokasi) : esc(item.lokasi);
    return '<article class="card">' + img + '<div class="card-body"><h3>' + esc(item.judul) + '</h3><p class="meta">' + meta + "</p><p>" + esc(item.ringkas) + "</p></div></article>";
  }

  // Render daftar dari data-source
  document.querySelectorAll("[data-source]").forEach(function (el) {
    var jenis = el.dataset.source;
    var list = (data[jenis] || []).slice();
    if (jenis === "event") list.sort(function (a, b) { return a.tanggal.localeCompare(b.tanggal); });
    if (el.dataset.limit) list = list.slice(0, +el.dataset.limit);
    el.innerHTML = list.length ? list.map(function (i) { return kartu(i, jenis); }).join("") : "<p>Belum ada data.</p>";
  });

  // Pencarian sederhana
  document.querySelectorAll("[data-filter-for]").forEach(function (inp) {
    var target = document.getElementById(inp.dataset.filterFor);
    inp.addEventListener("input", function () {
      var q = inp.value.toLowerCase();
      target.querySelectorAll(".card").forEach(function (c) {
        c.hidden = c.textContent.toLowerCase().indexOf(q) === -1;
      });
    });
  });

  // Form kontak (contoh)
  var form = document.getElementById("form-kontak");
  if (form) form.addEventListener("submit", function (e) {
    e.preventDefault();
    form.querySelector(".form-note").hidden = false;
    form.reset();
  });
})();
