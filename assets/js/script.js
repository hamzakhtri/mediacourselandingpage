document.addEventListener("scroll", () => {
    const heroSection = document.querySelector(".hero-section");
    const scrollPosition = window.scrollY;
    const maxScroll = window.innerHeight;

    // Calculate the spread percentage based on scroll position
    const spreadValue = Math.min(30 + (scrollPosition / maxScroll) * 50, 80); // Max spread 80%

    // Update CSS variables
    heroSection.style.setProperty("--spread-top-left", `${spreadValue}%`);
    heroSection.style.setProperty("--spread-bottom-right", `${spreadValue}%`);
});


const Confettiful = function (el) {
    this.el = el;
    this.containerEl = null;

    this.confettiFrequency = 3;
    this.confettiColors = ['#ED2C13', '#00F5C3', '#38A9FF', '#60608C', '#FFFF33'];
    this.confettiAnimations = ['slow', 'medium', 'fast'];

    this._setupElements();
    this._renderConfetti();
};

Confettiful.prototype._setupElements = function () {
    const containerEl = document.createElement('div');
    const elPosition = this.el.style.position;

    if (elPosition !== 'relative' || elPosition !== 'absolute') {
        this.el.style.position = 'relative';
    }

    containerEl.classList.add('confetti-container');

    this.el.appendChild(containerEl);

    this.containerEl = containerEl;
};

Confettiful.prototype._renderConfetti = function () {
    this.confettiInterval = setInterval(() => {
        const confettiEl = document.createElement('div');
        const confettiSize = (Math.floor(Math.random() * 5) + 10) + 'px'; // Increased size
        const confettiBackground = this.confettiColors[Math.floor(Math.random() * this.confettiColors.length)];
        const confettiLeft = (Math.floor(Math.random() * this.el.offsetWidth)) + 'px';
        const confettiAnimation = this.confettiAnimations[Math.floor(Math.random() * this.confettiAnimations.length)];

        confettiEl.classList.add('confetti', 'confetti--animation-' + confettiAnimation);
        confettiEl.style.left = confettiLeft;
        confettiEl.style.width = confettiSize;
        confettiEl.style.height = confettiSize;
        confettiEl.style.backgroundColor = confettiBackground;

        confettiEl.removeTimeout = setTimeout(function () {
            confettiEl.parentNode.removeChild(confettiEl);
        }, 5000); // Increased duration

        this.containerEl.appendChild(confettiEl);
    }, 50);
};

window.confettiful = new Confettiful(document.querySelector('.js-container'));
