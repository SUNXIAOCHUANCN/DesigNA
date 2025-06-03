// 初始化全屏滚动
new fullpage('#fullpage', {
    // 导航
    navigation: true,
    navigationPosition: 'right',
    navigationTooltips: ['首页', '项目展示', '视频展示', '提问'],
    showActiveTooltip: true,
    
    // 滚动设置
    scrollingSpeed: 1000,
    easing: 'easeInOutCubic',
    easingcss3: 'ease',
    
    // 自动播放
    autoScrolling: true,
    fitToSection: true,
    scrollBar: false,
    
    // 回调函数
    afterLoad: function(origin, destination, direction) {
        // 更新导航栏激活状态
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + destination.anchor) {
                link.classList.add('active');
            }
        });
        // 移除所有section的active类
        document.querySelectorAll('.section').forEach(function(sec) {
            sec.classList.remove('active');
        });
        // 当前section添加active类
        var sections = document.querySelectorAll('.section');
        if (sections[destination.index]) {
            sections[destination.index].classList.add('active');
        }
    }
});

// 初始化首页轮播图
const heroSwiper = new Swiper('.hero-swiper', {
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    }
});

// 初始化优势展示轮播图
const featuresSwiper = new Swiper('.features-swiper', {
    loop: true,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
});

// 初始化项目展示轮播图
const projectSwiper = new Swiper('.project-swiper', {
    loop: true,
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    pagination: {
        el: '.project-pagination',
        clickable: true,
    },
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    }
});

// 为项目展示图片添加点击事件
document.querySelectorAll('#features .feature-image').forEach(image => {
    image.addEventListener('click', () => {
        projectSwiper.slideNext();
    });
});

// 处理提问表单提交
const questionForm = document.getElementById('questionForm');
const questionsList = document.getElementById('questionsList');

if (questionForm) {
    questionForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 获取表单数据
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const question = this.querySelector('textarea').value;
        
        // 创建新的提问项
        const questionItem = document.createElement('div');
        questionItem.className = 'question-item';
        
        // 获取当前时间
        const now = new Date();
        const timeString = now.toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        // 设置提问内容
        questionItem.innerHTML = `
            <div class="question-header">
                <span>${name}</span>
                <span>${timeString}</span>
            </div>
            <div class="question-content">${question}</div>
        `;
        
        // 添加到列表开头
        questionsList.insertBefore(questionItem, questionsList.firstChild);
        
        // 显示成功消息
        alert('感谢您的提问，我们会尽快回复！');
        
        // 重置表单
        this.reset();
    });
}

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}); 

// 导航栏滚动效果
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(0,0,0, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(0,0,0, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// 滚动渐入动画
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// 为所有需要动画的元素添加观察
document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
});

// 为特性卡片添加动画类
document.querySelectorAll('.feature-item').forEach(item => {
    item.classList.add('fade-in');
});

// 为团队成员卡片添加动画类
document.querySelectorAll('.member-card').forEach(card => {
    card.classList.add('fade-in');
});

// 为按钮添加波纹效果
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const x = e.clientX - e.target.offsetLeft;
        const y = e.clientY - e.target.offsetTop;
        
        const ripple = document.createElement('span');
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
}); 

document.addEventListener('DOMContentLoaded', function() {
    // 初始化 Fullpage.js 并禁用导航点
    new fullpage('#fullpage', {
        autoScrolling: true,
        scrollHorizontally: true,
        navigation: false, // 关键设置：禁用纵向分页器
        navigationPosition: 'right' // 可选：明确指定要禁用的位置
    });
    const watermark = document.querySelector('.fp-watermark');
    if (watermark) {
        watermark.remove();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // 初始化 Fullpage.js 并完全禁用导航
    new fullpage('#fullpage', {
        autoScrolling: true,
        scrollHorizontally: true,
        navigation: false,
        navigationPosition: 'right',
        showActiveTooltip: false,
        slidesNavigation: false,
        slidesNavPosition: 'bottom',
        controlArrows: false,
        loopHorizontal: false
    });
    
    // 移除水印
    const watermark = document.querySelector('.fp-watermark');
    if (watermark) {
        watermark.remove();
    }
});

// fullpage.js 页面切换时添加背景动画
if (window.fullpage_api) {
    fullpage_api.setAllowScrolling(true);
}
