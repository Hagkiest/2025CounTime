const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let isPageVisible = true;
let particles = [];
const MAX_PARTICLES = 1000; // 限制最大粒子数

// 添加页面可见性检测
document.addEventListener('visibilitychange', () => {
    isPageVisible = document.visibilityState === 'visible';
    if (!isPageVisible) {
        // 当页面不可见时清除所有粒子
        particles = [];
    }
});

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.velocity = {
            x: (Math.random() - 0.5) * 12,
            y: (Math.random() - 0.5) * 12
        };
        this.alpha = 1;
        this.friction = 0.98;
        this.size = Math.random() * 3 + 1;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.restore();
    }

    update() {
        this.velocity.x *= this.friction;
        this.velocity.y *= this.friction;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= 0.005;
    }
}

function createFirework(x, y) {
    // 如果页面不可见或粒子数超过限制，则不创建新烟花
    if (!isPageVisible || particles.length >= MAX_PARTICLES) {
        return;
    }

    const colors = [
        '#ff0', '#f0f', '#0ff', '#f00', '#0f0', 
        '#fff', '#ff69b4', '#00ffff', '#ffa500', 
        '#9400d3', '#00ff7f'
    ];
    
    // 减少每个烟花的粒子数量
    const particleCount = shouldReduceFireworks() ? 50 : 100;
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(
            x,
            y,
            colors[Math.floor(Math.random() * colors.length)]
        ));
    }
}

function animate() {
    if (!isPageVisible) {
        requestAnimationFrame(animate);
        return;
    }

    requestAnimationFrame(animate);
    if (shouldReduceFireworks()) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    } else {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    }
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles = particles.filter(particle => particle.alpha > 0);
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
}

function getRandomFireworkPosition() {
    const width = canvas.width;
    const height = canvas.height;
    
    // 将屏幕划分为几个区域
    const zone = Math.floor(Math.random() * 4); // 0-3的随机数
    let x, y;
    
    switch(zone) {
        case 0: // 左侧区域
            x = Math.random() * (width * 0.3);
            y = Math.random() * height * 0.8;
            break;
        case 1: // 右侧区域
            x = width * 0.7 + Math.random() * (width * 0.3);
            y = Math.random() * height * 0.8;
            break;
        case 2: // 上部区域
            x = Math.random() * width;
            y = Math.random() * (height * 0.3);
            break;
        case 3: // 下部区域
            x = Math.random() * width;
            y = height * 0.7 + Math.random() * (height * 0.3);
            break;
    }
    
    return { x, y };
}

// 检测滚动位置并添加模糊效果
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    
    if (scrollPosition > windowHeight * 0.5) {
        canvas.classList.add('blur');
    } else {
        canvas.classList.remove('blur');
    }
});

// 优化烟花效果，当页面滚动到第二页时减少烟花数量
function shouldReduceFireworks() {
    return window.scrollY > window.innerHeight * 0.5;
}

// 修改现有的setInterval函数
let fireworkInterval = setInterval(() => {
    if (!isPageVisible || particles.length >= MAX_PARTICLES) {
        return;
    }

    if (shouldReduceFireworks()) {
        // 在第二页时减少烟花数量
        const count = Math.floor(Math.random() * 1) + 1;
        for(let i = 0; i < count; i++) {
            const position = getRandomFireworkPosition();
            createFirework(position.x, position.y);
        }
    } else {
        // 第一页减少烟花数量
        const count = Math.floor(Math.random() * 2) + 1;
        for(let i = 0; i < count; i++) {
            const position = getRandomFireworkPosition();
            createFirework(position.x, position.y);
        }
    }
}, 600); // 增加间隔时间

canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    createFirework(x, y);
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

animate(); 