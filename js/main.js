// 메인 JavaScript - 새로운 디자인

document.addEventListener('DOMContentLoaded', function() {
    // 스크롤 애니메이션 초기화
    initScrollAnimation();

    // 네비게이션 활성화 상태 관리
    initNavigation();

    // 부드러운 스크롤
    initSmoothScroll();
});

// 스크롤 애니메이션 (Intersection Observer)
function initScrollAnimation() {
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(function(element) {
        observer.observe(element);
    });
}

// 네비게이션 활성화 상태
function initNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    function updateActiveNav() {
        const scrollPos = window.scrollY + 100;

        sections.forEach(function(section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                // 데스크톱 네비게이션
                navLinks.forEach(function(link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });

                // 모바일 네비게이션
                mobileNavLinks.forEach(function(link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();
}

// 부드러운 스크롤
function initSmoothScroll() {
    const allNavLinks = document.querySelectorAll('a[href^="#"]');

    allNavLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 스크롤 시 네비게이션 효과
let lastScroll = 0;

window.addEventListener('scroll', function() {
    const currentScroll = window.scrollY;
    const mobileNav = document.querySelector('nav.fixed.bottom-4');

    if (mobileNav) {
        if (currentScroll > lastScroll && currentScroll > 100) {
            // 아래로 스크롤 - 모바일 네비게이션 숨김
            mobileNav.style.transform = 'translateY(100px)';
        } else {
            // 위로 스크롤 - 모바일 네비게이션 표시
            mobileNav.style.transform = 'translateY(0)';
        }
    }

    lastScroll = currentScroll;
});
