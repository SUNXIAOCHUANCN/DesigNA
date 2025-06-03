// 初始化全屏滚动
new fullpage('#fullpage', {
    
    // 导航
    navigation: true,
    navigationPosition: 'right',
    navigationTooltips: ['首页', '创新思维', '专业团队', '品质保证'],
    showActiveTooltip: true,
    
    // 滚动设置
    scrollingSpeed: 1000,
    easing: 'easeInOutCubic',
    easingcss3: 'ease',
    
    // 自动播放
    autoScrolling: true,
    fitToSection: true,
    scrollBar: false,

    // 禁用水印
    credits: { enabled: false },
    
    // 回调函数
    afterLoad: function(origin, destination, direction) {
        // 更新导航栏激活状态
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === 'about.html') {
                link.classList.add('active');
            }
        });

        // 重置所有内容面板
        document.querySelectorAll('.right-content').forEach(content => {
            content.classList.remove('active');
        });
    }
    
});

// 显示特性内容
function showFeature(featureId) {
    // 隐藏所有内容面板
    document.querySelectorAll('.right-content').forEach(content => {
        content.classList.remove('active');
        content.style.opacity = '0';
        content.style.transform = 'translateX(50px)';
    });

    // 显示选中的内容面板
    const content = document.getElementById(`${featureId}-content`);
    if (content) {
        content.classList.add('active');
        // 添加动画效果
        setTimeout(() => {
            content.style.opacity = '1';
            content.style.transform = 'translateX(0)';
        }, 50);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const watermark = document.querySelector('.fp-watermark');
    if (watermark) {
        watermark.remove();
    }
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