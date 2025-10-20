const slidesContainer = document.querySelector('.slideshow-container');
const slideItems = document.querySelectorAll('.slideshow-container > div');
const next = document.querySelector('.next-btn');
const prev = document.querySelector('.prev-btn');
const anchors = document.querySelectorAll('.slideshow-thumbnails > a');

let index = 0;
const delay = 5000;
let autoSlide;
let scrollTimeout;
let isScrolling = false;

// === 2️⃣ Hàm scroll đến slide hiện tại ===
function showSlide(i) {
  isScrolling = true;
  slideItems[i].scrollIntoView({ behavior: 'smooth', inline: 'center' });

  // debounce để reset isScrolling sau khi scroll hoàn tất
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    updateIndexByScroll(); // cập nhật index sau khi scroll
    isScrolling = false;
  }, 200); // 200ms sau scroll xong
}

// === 3️⃣ Cập nhật index theo scroll hiện tại ===
function updateIndexByScroll() {
  const containerCenter = slidesContainer.scrollLeft + slidesContainer.clientWidth / 2;

  let closestIndex = 0;
  let closestDistance = Infinity;

  slideItems.forEach((slide, i) => {
    const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
    const distance = Math.abs(containerCenter - slideCenter);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = i;
    }
  });
    index = closestIndex;
}

// === 5️⃣ Next / Prev button ===
next.addEventListener('click', () => {
  if (isScrolling) return; // tránh skip slide
  index = (index + 1) % slideItems.length;
  showSlide(index);
  startAutoSlide();
});

prev.addEventListener('click', () => {
  if (isScrolling) return;
  index = (index - 1 + slideItems.length) % slideItems.length;
  showSlide(index);
  startAutoSlide();
});

// === 6️⃣ Anchor click đồng bộ index ===
anchors.forEach(a => {
  a.addEventListener('click', (e) => {
    e.preventDefault();

    const targetId = a.dataset.target; // lấy giá trị data-target
    // const targetId = a.getAttribute('href').replace('#', '');
    const targetSlide = document.getElementById(targetId);
    index = Array.from(slideItems).indexOf(targetSlide);
    showSlide(index);
    startAutoSlide();
  });
});

// === 7️⃣ Sticky boundary khi vuốt mobile ===
slidesContainer.addEventListener('touchend', () => {
  const scrollLeft = slidesContainer.scrollLeft;
  const maxScroll = slidesContainer.scrollWidth - slidesContainer.clientWidth;

  if (scrollLeft < 0) {
    slidesContainer.scrollTo({ left: 0, behavior: 'smooth' });
  } else if (scrollLeft > maxScroll) {
    slidesContainer.scrollTo({ left: maxScroll, behavior: 'smooth' });
  }
});

// === 8️⃣ Đồng bộ index khi scroll bằng tay ===
slidesContainer.addEventListener('scroll', () => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    updateIndexByScroll();
    isScrolling = false;
  }, 100); // debounce 100ms
});

// === 9️⃣ Khởi động autoplay khi load trang ===
// startAutoSlide();


