function updateCountdown() {
    const targetDate = new Date('2025-01-01T00:00:00');
    const currentDate = new Date();
    const diff = targetDate - currentDate;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

    document.title = `距离2025年还有${days}天`;
}

setInterval(updateCountdown, 1000);
updateCountdown();

document.addEventListener('click', (e) => {
    const text = document.createElement('div');
    text.className = 'happy-text';
    text.textContent = 'Happy!';
    text.style.left = e.clientX + 'px';
    text.style.top = e.clientY + 'px';
    document.body.appendChild(text);

    setTimeout(() => {
        text.remove();
    }, 1500);
}); 