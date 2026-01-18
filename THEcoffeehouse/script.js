'use strict';

(() => {
    document.addEventListener('DOMContentLoaded', () => {

        //humburgermenu
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.navigation ul');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('is-open');
            navMenu.classList.toggle('is-open');
        });

        document.querySelectorAll('.navigation a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('is-open');
                navMenu.classList.remove('is-open');
            });
        });

        //carousel
        (() => {
            const carousel = document.querySelector('.carousel');
            const imageContainer = carousel.querySelector('.image-container');
            const images = Array.from(imageContainer.querySelectorAll('img'));
            const indicator = carousel.querySelector('.indicator');
            const indicatorItems = [];
            const touchArea = carousel.querySelector('.touch-area');

            let current = 0;

            function prev() {
                let target = current - 1;
                if (target <0) {
                    target = images.length - 1;
                }
                to(target);
            }

            function next() {
                let target = current + 1;
                if (target >= images.length) {
                    target = 0;
                }
                to(target);
            }

            function to(target) {
                const slideWidth = imageContainer.querySelector('img').clientWidth;
                imageContainer.style.transform = `translateX(-${target * slideWidth}px)`;
                current = target;
                indicatorItems.forEach((item, index) => {
                    item.classList.toggle('current', index === target);
                });
                
                auto();
            }

            images.forEach((image, index) => {
                const li = document.createElement('li');
                if (index === 0) {
                    li.classList.add('current');
                }
                indicator.appendChild(li);

                indicatorItems.push(li);

                li.addEventListener('click', () => {
                    to(index);
                });
            });

            let touchStart;
            let touchMove;
            touchArea.addEventListener('touchstart', (event) => {
                touchStart = event.touches[0].clientX;
                touchMove = touchStart;
            });
            touchArea.addEventListener('touchmove', (event) => {
                event.preventDefault();
                touchMove = event.touches[0].clientX;
            });
            touchArea.addEventListener('touched', (event) => {
                if (touchMove < touchStart - 20) {
                    next();    
                } else if (touchMove > touchStart + 20) {
                    prev();
                }
            });

            let timer;
            function auto() {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    next();
                }, 5000);
            }

            auto();

        })();


//concept
const fadeUp = document.querySelectorAll(".fade-up");

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-show");
                observer.unobserve(entry.fadeUp);
            }
        });
    },
    {
        threshold: 0.2
    }
);

fadeUp.forEach(fadeUp => {
    observer.observe(fadeUp);
});

//bythenumber
const byTheNumberItemsContainer = document.querySelector(".bythenumbers-container");
const byTheNumberItems = byTheNumberItemsContainer.querySelectorAll('.fade-right');

const byTheNumberItemsObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                byTheNumberItems.forEach((item, index) => {
                    item.style.transitionDelay = `${index * 0.3}s`;
                    item.classList.add('is-show');
                });
                byTheNumberItemsObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.3
    }
);

byTheNumberItemsObserver.observe(byTheNumberItemsContainer);


//menu
const menuList = document.querySelector('.menu-list');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let isAnimating = false;
let direction = null;

function getItemWidth() {
    const item = menuList.querySelector('.menu-items');
    return item.offsetWidth;
}

function slideTo(offset) {
    isAnimating = true;
    menuList.style.transition = 'transform 0.6s ease';
    menuList.style.transform = `translateX(${offset}px)`;

} function resetPosition() {
    menuList.style.transition = 'none';

    if (direction === 'next') {
        const first = menuList.firstElementChild;
        menuList.appendChild(first);
    } else if ( direction === 'prev'){
        const last = menuList.lastElementChild;
        menuList.insertBefore(last, menuList.firstElementChild);
    }

    menuList.style.transform = `translateX(-${getItemWidth()}px)`;
    
    isAnimating = false;
    direction = null;
}

//初期化
function initCarousel() {
    const itemWidth = getItemWidth();
    const last = menuList.lastElementChild;
    menuList.insertBefore(last,menuList.firstElementChild);
    menuList.style.transition = 'none';
    menuList.style.transform = `translateX(-${getItemWidth()}px)`;
}

window.addEventListener('load', () => {
    initCarousel();
});

menuList.addEventListener('transitionend', (e)=> {
    if (e.propertyName === 'transform' && isAnimating) {
        resetPosition();
    }
}); 

//次へ
nextBtn.addEventListener('click', () => {
    if (isAnimating) return;
    direction = 'next';
    const itemWidth = getItemWidth();
    slideTo(-itemWidth * 2);
});

//前へ
prevBtn.addEventListener('click', () => {
    if (isAnimating) return;
    direction = 'prev';
    const itemWidth = getItemWidth();
    slideTo(0);
});
});
})()