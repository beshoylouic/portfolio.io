// Canvas خلفية متحركة
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
canvas.style.position = 'fixed';
canvas.style.top = 0;
canvas.style.left = 0;
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.zIndex = '-1'; // عشان يكون خلف كل العناصر
canvas.style.background = '#0f172a'; // لون خلفية ثابت
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});

// ===== نقاط متحركة =====
const particles = [];
const numParticles = 80;

for(let i=0; i<numParticles; i++){
    particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random()-0.5) * 1.2,
        vy: (Math.random()-0.5) * 1.2,
        size: Math.random() * 3 + 1
    });
}

function draw(){
    ctx.clearRect(0,0,width,height);
    ctx.fillStyle = '#00ff88'; // لون النقاط
    ctx.strokeStyle = 'rgba(0,255,136,0.2)'; // لون الخطوط بين النقاط
    ctx.lineWidth = 1;

    // رسم النقاط
    particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
        ctx.fill();
    });

    // رسم خطوط بين النقاط القريبة
    for(let i=0; i<particles.length; i++){
        for(let j=i+1; j<particles.length; j++){
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            if(dist < 120){
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }

    // تحريك النقاط
    particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if(p.x<0 || p.x>width) p.vx *= -1;
        if(p.y<0 || p.y>height) p.vy *= -1;
    });

    requestAnimationFrame(draw);
}


draw();
