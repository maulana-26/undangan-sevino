// =============================================
// EDIT HERE: DATA UNDANGAN
// Ganti semua nilai di bawah ini sesuai acara kamu.
// =============================================
const birthdayData = {
  name: "MUHAMMAD SHEVINO ABHISEVA REYNANDA",                          // EDIT HERE: nama anak
  age: 2,                                 // EDIT HERE: usia anak
  dateLabel: "Sabtu, 26 September 2026",  // EDIT HERE: tanggal untuk ditampilkan
  // GANTI TANGGAL ACARA DI SINI (format yang bisa dibaca JS Date, WIB = UTC+7)
  eventDateISO: "2026-09-26T15:00:00+07:00",
  time: "15.00 WIB — Selesai",            // EDIT HERE: jam acara
  location: "Rumah Shevino",                // EDIT HERE: nama lokasi
  address: " RUMAH SHEVINO (PERUMAHAN SELATAN BLKI KEL.PERBON KEC.TUBAN KAB.TUBAN)",           // EDIT HERE: alamat lengkap
  mapsLink: "https://maps.app.goo.gl/ZvHAQSi4f5aMMM2G6",   // EDIT HERE: link Google Maps
  whatsapp: "6285812506076",              // EDIT HERE: nomor WhatsApp (format 628xxxx, tanpa + atau 0 di depan)
  family: "Keluarga Besar Shevino",          // EDIT HERE: nama keluarga di footer
};

// =============================================
// ISI DATA KE HALAMAN
// =============================================
function populateData() {
  const d = birthdayData;

  document.getElementById("coverName").textContent = `${d.name}'s ${ordinal(d.age)} Birthday`;
  document.getElementById("heroName").textContent = d.name;

  document.getElementById("detailName").textContent = d.name;
  document.getElementById("detailAge").textContent = d.age;
  document.getElementById("detailDate").textContent = d.dateLabel;
  document.getElementById("detailTime").textContent = d.time;
  document.getElementById("detailLocation").textContent = d.location;
  document.getElementById("detailAddress").textContent = d.address;
  document.getElementById("mapsLink").href = d.mapsLink;

  document.getElementById("wishName").textContent = d.name;
  document.getElementById("footerName").textContent = d.name;
  document.getElementById("footerFamily").textContent = d.family;

  const waMessage = encodeURIComponent(
    `Halo, saya akan hadir di acara ulang tahun ${d.name} pada hari ${d.dateLabel}. Terima kasih! `
  );
  document.getElementById("rsvpButton").href = `https://wa.me/${d.whatsapp}?text=${waMessage}`;
}

function ordinal(n) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

// =============================================
// BUKA UNDANGAN
// =============================================
function initOpenInvitation() {
  const openBtn = document.getElementById("openInvitation");
  const cover = document.getElementById("cover");
  const mainContent = document.getElementById("mainContent");
  const siteNav = document.getElementById("siteNav");
  const music = document.getElementById("bgMusic");

  openBtn.addEventListener("click", () => {
    fireConfetti();

    cover.style.transition = "opacity 0.6s ease";
    cover.style.opacity = "0";

    setTimeout(() => {
      cover.style.display = "none";
      mainContent.classList.add("is-open");
      siteNav.classList.add("is-visible");
      revealOnScroll();
      window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
    }, 550);

    // Musik dimulai saat undangan dibuka (menghindari blokir autoplay browser)
    music.play().catch(() => {
      // Jika browser tetap memblokir, biarkan user menekan tombol musik manual
    });
    document.getElementById("musicToggle").classList.add("is-playing");
  });
}

function initBackToCover() {
  const backBtn = document.getElementById("backToCover");
  const cover = document.getElementById("cover");
  const mainContent = document.getElementById("mainContent");
  const siteNav = document.getElementById("siteNav");
  const music = document.getElementById("bgMusic");

  backBtn.addEventListener("click", () => {
    mainContent.classList.remove("is-open");
    siteNav.classList.remove("is-visible");

    cover.style.display = "flex";
    cover.style.opacity = "1";

    music.pause();
    document.getElementById("musicToggle").classList.remove("is-playing");

    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  });
}

// =============================================
// COUNTDOWN TIMER
// =============================================
function initCountdown() {
  const target = new Date(birthdayData.eventDateISO).getTime();
  const els = {
    days: document.getElementById("cdDays"),
    hours: document.getElementById("cdHours"),
    minutes: document.getElementById("cdMinutes"),
    seconds: document.getElementById("cdSeconds"),
  };
  const timerBox = document.getElementById("countdownTimer");
  const todayMsg = document.getElementById("countdownToday");

  function tick() {
    const now = Date.now();
    const diff = target - now;

    if (diff <= 0) {
      timerBox.hidden = true;
      todayMsg.hidden = false;
      clearInterval(interval);
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    els.days.textContent = pad(days);
    els.hours.textContent = pad(hours);
    els.minutes.textContent = pad(minutes);
    els.seconds.textContent = pad(seconds);
  }

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  tick();
  const interval = setInterval(tick, 1000);
}

// =============================================
// MUSIC TOGGLE BUTTON
// =============================================
function initMusicToggle() {
  const btn = document.getElementById("musicToggle");
  const music = document.getElementById("bgMusic");

  btn.addEventListener("click", () => {
    if (music.paused) {
      music.play().catch(() => {});
      btn.classList.add("is-playing");
    } else {
      music.pause();
      btn.classList.remove("is-playing");
    }
  });
}

// =============================================
// SMOOTH SCROLL NAV + ACTIVE STATE
// =============================================
function initNav() {
  const navItems = document.querySelectorAll("[data-nav]");
  const sections = Array.from(navItems).map((item) =>
    document.querySelector(item.getAttribute("href"))
  ).filter(Boolean);

  navItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(item.getAttribute("href"));
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  function updateActive() {
    let currentIndex = 0;
    sections.forEach((section, i) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.4) currentIndex = i;
    });
    navItems.forEach((item, i) => {
      item.classList.toggle("is-active", i === currentIndex);
    });
  }

  window.addEventListener("scroll", updateActive, { passive: true });
  updateActive();
}

// =============================================
// SCROLL REVEAL (IntersectionObserver)
// =============================================
function revealOnScroll() {
  const revealEls = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => observer.observe(el));
}

// =============================================
// GALLERY LIGHTBOX
// =============================================
function initLightbox() {
  const items = document.querySelectorAll(".gallery__item");
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const closeBtn = document.getElementById("lightboxClose");

  items.forEach((item) => {
    item.addEventListener("click", () => {
      const img = item.querySelector("img");
      lightboxImage.src = img.src;
      lightboxImage.alt = img.alt;
      lightbox.hidden = false;
    });
  });

  function close() {
    lightbox.hidden = true;
    lightboxImage.src = "";
  }

  closeBtn.addEventListener("click", close);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !lightbox.hidden) close();
  });
}

// =============================================
// EASTER EGG: MONKEY ICON
// =============================================
function initMonkeyEgg() {
  const monkey = document.getElementById("monkeyEgg");
  const toast = document.getElementById("easterEggToast");
  let clicks = 0;
  let toastTimeout;

  monkey.addEventListener("click", () => {
    clicks++;
    if (clicks >= 1) {
      toast.hidden = false;
      clearTimeout(toastTimeout);
      toastTimeout = setTimeout(() => {
        toast.hidden = true;
      }, 2500);
      clicks = 0;
    }
  });
}

// =============================================
// CONFETTI (ringan, tanpa library)
// =============================================
function fireConfetti() {
  const colors = ["#e8934a", "#f4c542", "#7fa563", "#3f6b45", "#fbf3e2"];
  const count = 40;

  for (let i = 0; i < count; i++) {
    const piece = document.createElement("div");
    const size = Math.random() * 8 + 6;
    piece.style.position = "fixed";
    piece.style.top = "-20px";
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.width = size + "px";
    piece.style.height = size * 0.6 + "px";
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.opacity = "0.9";
    piece.style.borderRadius = "3px";
    piece.style.zIndex = "200";
    piece.style.pointerEvents = "none";
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    document.body.appendChild(piece);

    const duration = Math.random() * 1500 + 1800;
    const drift = (Math.random() - 0.5) * 200;

    piece.animate(
      [
        { transform: piece.style.transform, top: "-20px" },
        {
          transform: `translateX(${drift}px) rotate(${Math.random() * 720}deg)`,
          top: "100vh",
        },
      ],
      { duration, easing: "ease-in", fill: "forwards" }
    );

    setTimeout(() => piece.remove(), duration + 100);
  }
}

// =============================================
// INIT
// =============================================
document.addEventListener("DOMContentLoaded", () => {
  populateData();
  initOpenInvitation();
  initBackToCover();
  initCountdown();
  initMusicToggle();
  initNav();
  initLightbox();
  initMonkeyEgg();
});
