const imgs = document.querySelectorAll('.header-slider ul img');
const prev_btn = document.querySelector('.control_prev');
const next_btn = document.querySelector('.control_next');

let n = 0;

function changeSlide() {
    imgs.forEach(img => img.style.display = 'none');
    imgs[n].style.display = 'block';
}

function nextSlide() {
    if (n < imgs.length - 1) {
        n++;
    } else {
        n = 0;
    }
    changeSlide();
}

changeSlide();

let autoSlide = setInterval(nextSlide, 3000);

prev_btn.addEventListener('click', () => {
    clearInterval(autoSlide);
    if (n > 0) {
        n--;
    } else {
        n = imgs.length - 1;
    }
    changeSlide();
    autoSlide = setInterval(nextSlide, 3000);
});

next_btn.addEventListener('click', () => {
    clearInterval(autoSlide);
    nextSlide();
    autoSlide = setInterval(nextSlide, 3000);
});

const scrollContainer = document.querySelectorAll('.products');

for (const item of scrollContainer) {
    item.addEventListener('wheel', (evt) => {
        evt.preventDefault();
        item.scrollLeft += evt.deltaY * 1.5;

    }, { passive: false });
}

