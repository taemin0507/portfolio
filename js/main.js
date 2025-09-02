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
const sections = ["#intro", "#about", "#skills", "#projects", "#contact"].map((s) =>
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

// Scroll reveal (IntersectionObserver)
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
      observer.unobserve(entry.target); // 한 번만 실행
    }
  });
}, { threshold: 0.1, rootMargin: "0px 0px -10% 0px" });


// 맨위로
const toTopEl = document.querySelector('#toTop');

window.addEventListener('scroll', function () {

  if (window.scrollY > 500){
    toTopEl.style.opacity = '1';
    toTopEl.style.transform = 'translateX(0)';



  } else {
    toTopEl.style.opacity = '0';
    toTopEl.style.transform = 'translateX(100px)';


  }
  
});

document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right, .reveal-scale")
  .forEach((el) => observer.observe(el));

  // ScrollMagic 사용
// 그 외 scrollreveal
const spyEls = document.querySelectorAll('section.scroll-spy');

  // init controller
const controller = new ScrollMagic.Controller();

spyEls.forEach(function (spyEl) {
  // create a scene
  new ScrollMagic.Scene({ // 감시할 장면 추가 및 옵션 지정
    triggerElement: spyEl, // 보여짐 여부를 감시할 요소를 지정
    triggerHook: 0.5 // 화면의 50% 지점에서 보여짐 여부 감시(0~1사이 지정)
  })
  .setClassToggle(spyEl, 'show') // 요소가 화면에 보이면 show 클래스 추가
  .addTo(controller); // 컨트롤러에 장면을 할당(필수!)
});

// 현재 연도 표시
// 날짜 정보를 가진 JS의 Date 객체를 활용
console.log(new Date().getFullYear());
const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear();
