import '../styles/index.scss';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
document.addEventListener('DOMContentLoaded', () => {
  try {
    const getWidth = () => {
      return Math.max(
        document.documentElement?.clientWidth,
        window.innerWidth || 0,
      );
    };

    const onResize = (resizeFunc) => {
      window.addEventListener('resize', () => {
        const width = getWidth();
        resizeFunc(width);
      });

      return getWidth();
    };

    AOS.init();

    const langMenu = () => {
      const languageButton = document.querySelector('.language--button-open');
      const languageMenu = document.querySelector('.language--menu');
      const languages = document.querySelectorAll('.language--menu li');

      const updateMenu = (selectedLang = 'ru') => {
        languages.forEach((lang) => {
          if (lang.getAttribute('data-lang') === selectedLang) {
            lang.style.display = 'none';
          } else {
            lang.style.display = 'block';
          }
        });
      };

      languageButton.addEventListener('click', function () {
        const selectedLang = languageButton.getAttribute('data-lang');
        updateMenu(selectedLang);
        languageMenu.style.display =
          languageMenu.style.display === 'block' ? 'none' : 'block';
      });

      languageMenu.addEventListener('click', function (event) {
        const selectedLang = event.target.getAttribute('data-lang');
        if (selectedLang) {
          languageButton.innerHTML =
            event.target.innerHTML + ' <span>&darr;</span>';
          languageButton.setAttribute('data-lang', selectedLang);
          languageMenu.style.display = 'none';
          updateMenu(selectedLang);
        }
      });

      document.addEventListener('click', function (event) {
        if (
          !languageButton.contains(event.target) &&
          !languageMenu.contains(event.target)
        ) {
          languageMenu.style.display = 'none';
        }
      });

      const initialLang =
        languageButton.getAttribute('data-lang') ||
        languages[0].getAttribute('data-lang');
      languageButton.setAttribute('data-lang', initialLang);
      updateMenu(initialLang);
    };

    const navTab = () => {
      const tabs = document.querySelectorAll('.nav--tab');

      tabs.forEach((tab) =>
        tab.addEventListener('click', (e) => {
          tabs.forEach((t) => t.classList.remove('nav--tab_active'));
          e.currentTarget.classList.add('nav--tab_active');
        }),
      );
    };

    const burgerMenu = () => {
      const btn = document.querySelector('.btn-nav_static');
      const nav = document.querySelector('.nav');
      const tabs = document.querySelectorAll('.nav--tab');

      const toggleMenu = () => {
        btn.classList.toggle('btn-nav_close');
        nav.classList.toggle('nav_active');

        if (nav.classList.contains('nav_active'))
          return (document.querySelector('body').style.overflow = 'hidden');
        return (document.querySelector('body').style.overflow = 'auto');
      };

      const closeMenu = () => {
        btn.classList.remove('btn-nav_close');
        nav.classList.remove('nav_active');
        document.querySelector('body').style.overflow = 'auto';
      };

      btn.addEventListener('click', toggleMenu);
      tabs.forEach((tab) => tab.addEventListener('click', closeMenu));
    };

    new Swiper('.ideas .swiper', {
      modules: [Navigation, Pagination],
      loop: true,
      spaceBetween: 16,
      autoHeight: true,
      pagination: {
        el: '.ideas--slider-btns .swiper-pagination',
        clickable: true,
        bulletClass: 'slider__pagination-bullet',
        bulletActiveClass: 'slider__pagination-bullet-active',
      },
      navigation: {
        nextEl: '.ideas--slider-btns .swiper-button-next',
        prevEl: '.ideas--slider-btns .swiper-button-prev',
      },
    });

    new Swiper('.business--slider .swiper', {
      modules: [Navigation, Pagination],
      loop: true,
      spaceBetween: 24,
      autoHeight: true,
      breakpoints: {
        320: {
          slidesPerView: 1.5,
          slidesPerGroup: 1,
        },
        1280: {
          slidesPerView: 3,
          slidesPerGroup: 3,
        },
      },
      pagination: {
        el: '.business--slider-btns .swiper-pagination',
        clickable: true,
        bulletClass: 'slider__pagination-bullet',
        bulletActiveClass: 'slider__pagination-bullet-active',
      },
      navigation: {
        nextEl: '.business--slider-btns .swiper-button-next',
        prevEl: '.business--slider-btns .swiper-button-prev',
      },
    });

    const activeSlider = (currentWidth) => {
      let newSliders = null;

      const newSlidersInit = () => {
        if (!newSliders) {
          newSliders = new Swiper('.mobile-slider .swiper', {
            loop: true,
            autoHeight: true,
            slidesPerView: 1.5,
            slidesPerGroup: 1,
          });
        }
      };

      const newSlidersDestroy = () => {
        if (newSliders) {
          newSliders.forEach((slider) => slider.destroy());
          newSliders = null;
        }
      };

      const checkWidth = () => {
        const width = getWidth();
        if (width <= currentWidth) {
          newSlidersInit();
        } else {
          newSlidersDestroy();
        }
      };

      const checkResize = (width) => {
        if (width <= currentWidth) {
          newSlidersInit();
        } else {
          newSlidersDestroy();
        }
      };

      checkWidth();
      onResize(checkResize);
    };

    langMenu();
    navTab();
    burgerMenu();
    activeSlider(1280);
  } catch (error) {
    console.log(error);
  }
});
