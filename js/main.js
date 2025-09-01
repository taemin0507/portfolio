// === Smooth scroll for [data-scroll] triggers ===============================
document.addEventListener("click", (e) => {
  const t = e.target.closest("[data-scroll]");
  if (!t) return;

  const sel = t.getAttribute("data-scroll");
  const el = sel && document.querySelector(sel);
  if (!el) return;

  e.preventDefault();
  // 고정 헤더 보정: CSS에서 section에 scroll-margin-top을 주면 더 깔끔합니다.
  // (예: .section { scroll-margin-top: 70px; })
  el.scrollIntoView({ behavior: "smooth", block: "start" });
});

// === Active state for nav links ============================================
const sectionSelectors = ["#intro", "#roadmap", "#skills", "#projects", "#contact"];
let sections = [];
let navLinks = [];

function initNavTracking() {
  sections = sectionSelectors
    .map((sel) => document.querySelector(sel))
    .filter(Boolean);

  navLinks = Array.from(document.querySelectorAll(".main-nav a"));

  // 초기 계산 및 바인딩
  recalcSectionTops();
  onScroll(); // 초기 활성화 상태 적용
}

let sectionTops = [];
function recalcSectionTops() {
  // 각 섹션의 문서 기준 Y좌표 캐시
  sectionTops = sections.map((sec) => sec.offsetTop);
}

let ticking = false;
function handleScroll() {
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(() => {
      onScroll();
      ticking = false;
    });
  }
}

function onScroll() {
  if (!sections.length) return;

  // 헤더 높이 보정
  const pos = window.scrollY + 70;
  const docBottom = window.scrollY + window.innerHeight;
  const isAtBottom = Math.abs(docBottom - document.documentElement.scrollHeight) < 2;

  let currentIdx = 0;

  // 현재 스크롤 위치에 가장 가까운 섹션 인덱스 찾기
  for (let i = 0; i < sectionTops.length; i++) {
    if (pos >= sectionTops[i]) currentIdx = i;
    else break;
  }

  // 페이지 맨 하단에 닿았을 때 마지막 섹션을 확실히 활성화
  if (isAtBottom) currentIdx = sections.length - 1;

  const currentId = sections[currentIdx].id;

  navLinks.forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === `#${currentId}`);
  });
}

// 바인딩
window.addEventListener("scroll", handleScroll);
window.addEventListener("resize", () => {
  recalcSectionTops();
  onScroll();
});

// 폰트/이미지 로드 후 레이아웃 변동을 대비해서 한 번 더 계산
window.addEventListener("load", () => {
  recalcSectionTops();
  onScroll();
});

// 해시 진입 시 초기 활성화
if (location.hash) {
  window.addEventListener("DOMContentLoaded", onScroll);
}

// === Go to top button =======================================================
const goTopBtn = document.getElementById("goTop");
if (goTopBtn) {
  goTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
