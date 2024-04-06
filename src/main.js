const zoom = document.querySelector('.zoom')
const list = document.querySelector('.product-detailed-info__list')
const links = document.querySelectorAll('.product-detailed-info__element')
const downloadButton = document.querySelector('.download')
let isZoomed = true

// slider
const swiper = new Swiper(".mySwiper", {
    loop: true,
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
});
const swiper2 = new Swiper(".mySwiper2", {
    loop: true,

    zoom: {
        maxRatio: 2,
        minRation: 1,
        toggle: false,
    },
    spaceBetween: 10,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    thumbs: {
        swiper: swiper,
    },
});

//zoom function
zoom.addEventListener('click', () => {
    isZoomed ? swiper2.zoom.in() : swiper2.zoom.out()
    isZoomed = !isZoomed
})


swiper2.on('sliderFirstMove', () => {
    isZoomed = true
})

const slider = document.querySelector('.mySwiper')
slider.addEventListener('mousedown', (event) => {
    event.stopPropagation();
    event.preventDefault();
    return false;
})

//download image
downloadButton.addEventListener('click', () => {
    const currentImage = document.querySelector('.swiper-slide-active img')
    let canvas = document.createElement('canvas');

    canvas.width = currentImage.clientWidth;
    canvas.height = currentImage.clientHeight;

    let context = canvas.getContext('2d');
    context.drawImage(currentImage, 0, 0);

    canvas.toBlob((blob) => {
        let link = document.createElement('a');
        link.download = '';
        link.href = URL.createObjectURL(blob);
        link.click();
        URL.revokeObjectURL(link.href);
    }, 'image/png');
})


//render html
list.addEventListener('click', async (e) => {
    e.preventDefault()

    links.forEach(link => {
        link.classList.remove('active');
    });

    e.target.closest('.product-detailed-info__element').classList.add('active');

    const className = e.target.className.split(' ')[1]

    if (className === 'about-model') {
        const about = await import('./about-model.js');
        about.render();
    }

    if (className === 'guarantee') {
        const guarantee = await import('./guarantee.js');
        guarantee.render();
    }

    if (className === 'instructions') {
        const instructions = await import('./instructions.js');
        instructions.render();
    }

    if (className === 'specifications') {
        const specifications = await import('./specifications.js');
        specifications.render();
    }

    if (className === 'technologies') {
        const technologies = await import('./technologies.js');
        technologies.render();
    }
})

export const loadPage = async (path) => {
    const app = document.querySelector('.content');
    const response = await fetch(path);
    const text = await response.text();
    app.innerHTML = text;
};

(async () => {
    const technologies = await import('./technologies.js');
    technologies.render();
})();
