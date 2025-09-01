// 부드러운 스크롤 이동 (버튼/링크 data-scroll)
document.addEventListener("click", (e) => {
  const t = e.target.closest("[data-scroll]");
  if (!t) return;
  const sel = t.getAttribute("data-scroll");
  const el = document.querySelector(sel);
  if (!el) return;
  e.preventDefault();
  el.scrollIntoView({ behavior: "smooth", block: "start" });
});

// 네비게이션 active 처리 + 스크롤 위치 반영
const sections = ["#intro", "#roadmap", "#skills", "#projects", "#contact"].map((s) =>
  document.querySelector(s)
);
const navLinks = Array.from(document.querySelectorAll(".main-nav a"));

const onScroll = () => {
  const pos = window.scrollY + 80; // 헤더 높이 보정
  let current = sections[0].id;
  for (const sec of sections) {
    if (!sec) continue;
    if (pos >= sec.offsetTop) current = sec.id;
  }
  navLinks.forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === `#${current}`);
  });
};
window.addEventListener("scroll", onScroll);
onScroll();

// 맨 위로 버튼
document.getElementById("goTop")?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Scroll reveal (IntersectionObserver)
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
      observer.unobserve(entry.target); // 한 번만 실행
    }
  });
}, { threshold: 0.1, rootMargin: "0px 0px -10% 0px" });

document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right, .reveal-scale")
  .forEach((el) => observer.observe(el));
