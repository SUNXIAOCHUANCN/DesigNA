// 团队成员数据
const teamMembers = [
    {
        name: "王康展",
        title: "项目总监",
        avatar: "images/members/member1.jpg",
        description: "拥有6年设计经验，多次担任项目负责人，负责项目整体规划和设计和项目开发。"
    },
    {
        name: "黄俊荣",
        title: "浪子肥三少",
        avatar: "images/members/member2.jpg",
        description: "浪子肥三少，性疏狂而善交游，纵马江湖间颇谙人情脉络。尝执折扇笑谈中调度群豪，凭机敏斡旋解难于瞬息，虽行事不羁却每能遂愿，江湖道上皆称其有孟尝之风、子房之智。"
    },
    {
        name: "刘景天",
        title: "产品总监",
        avatar: "images/members/member3.jpg",
        description: "产品总监，擅长客户体验体系搭建与全流程优化。聚焦用户需求洞察与体验升级，通过跨部门协作提升服务质量，以数据驱动决策打造差异化体验，兼具战略视野与落地执行能力。"
    }
];

// 初始化全屏滚动
new fullpage('#fullpage', {
    // 导航
    navigation: true,
    navigationPosition: 'right',
    navigationTooltips: ['核心团队', '用户评价'],
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
            if (link.getAttribute('href') === 'partners.html') {
                link.classList.add('active');
            }
        });
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

// 显示成员详情
function showMemberDetail(index) {
    const member = teamMembers[index];
    const modal = document.getElementById('memberModal');
    const modalAvatar = document.getElementById('modalAvatar');
    const modalName = document.getElementById('modalName');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');

    modalAvatar.src = member.avatar;
    modalAvatar.alt = member.name;
    modalName.textContent = member.name;
    modalTitle.textContent = member.title;
    modalDescription.textContent = member.description;

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// 关闭成员详情
function closeMemberDetail() {
    const modal = document.getElementById('memberModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// 点击模态框外部关闭
window.onclick = function(event) {
    const modal = document.getElementById('memberModal');
    if (event.target == modal) {
        closeMemberDetail();
    }
}

// 主题切换相关
const themeSwitcher = document.getElementById('themeSwitcher');
let isDragging = false;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;

// 主题颜色配置
const themes = {
    orange: {
        primary: 'var(--theme-orange-primary)',
        secondary: 'var(--theme-orange-secondary)',
        accent: 'var(--theme-orange-accent)'
    },
    pink: {
        primary: 'var(--theme-pink-primary)',
        secondary: 'var(--theme-pink-secondary)',
        accent: 'var(--theme-pink-accent)'
    },
    blue: {
        primary: 'var(--theme-blue-primary)',
        secondary: 'var(--theme-blue-secondary)',
        accent: 'var(--theme-blue-accent)'
    },
    green: {
        primary: 'var(--theme-green-primary)',
        secondary: 'var(--theme-green-secondary)',
        accent: 'var(--theme-green-accent)'
    }
};

// 切换主题面板显示
function toggleThemePanel() {
    const panel = document.querySelector('.theme-panel');
    panel.classList.toggle('show');
}

// 更改主题
function changeTheme(theme) {
    const root = document.documentElement;
    switch(theme) {
        case 'orange':
            root.style.setProperty('--primary-color', 'var(--theme-orange-primary)');
            root.style.setProperty('--secondary-color', 'var(--theme-orange-secondary)');
            root.style.setProperty('--accent-color', 'var(--theme-orange-accent)');
            break;
        case 'pink':
            root.style.setProperty('--primary-color', 'var(--theme-pink-primary)');
            root.style.setProperty('--secondary-color', 'var(--theme-pink-secondary)');
            root.style.setProperty('--accent-color', 'var(--theme-pink-accent)');
            break;
        case 'blue':
            root.style.setProperty('--primary-color', 'var(--theme-blue-primary)');
            root.style.setProperty('--secondary-color', 'var(--theme-blue-secondary)');
            root.style.setProperty('--accent-color', 'var(--theme-blue-accent)');
            break;
        case 'green':
            root.style.setProperty('--primary-color', 'var(--theme-green-primary)');
            root.style.setProperty('--secondary-color', 'var(--theme-green-secondary)');
            root.style.setProperty('--accent-color', 'var(--theme-green-accent)');
            break;
    }
    toggleThemePanel();
}

// 拖动功能
function dragStart(e) {
    if (e.type === "touchstart") {
        initialX = e.touches[0].clientX - xOffset;
        initialY = e.touches[0].clientY - yOffset;
    } else {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
    }

    if (e.target === themeSwitcher || themeSwitcher.contains(e.target)) {
        isDragging = true;
    }
}

function dragEnd() {
    initialX = currentX;
    initialY = currentY;
    isDragging = false;

    // 吸附到最近的角落
    const rect = themeSwitcher.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    let targetX = rect.left;
    let targetY = rect.top;
    
    if (rect.left > windowWidth / 2) {
        targetX = windowWidth - rect.width - 20;
    } else {
        targetX = 20;
    }
    
    if (rect.top > windowHeight / 2) {
        targetY = windowHeight - rect.height - 20;
    } else {
        targetY = 20;
    }
    
    themeSwitcher.style.transition = 'all 0.3s ease';
    themeSwitcher.style.transform = `translate(${targetX}px, ${targetY}px)`;
    setTimeout(() => {
        themeSwitcher.style.transition = 'none';
    }, 300);
    
    xOffset = targetX;
    yOffset = targetY;
}

function drag(e) {
    if (isDragging) {
        e.preventDefault();
        
        if (e.type === "touchmove") {
            currentX = e.touches[0].clientX - initialX;
            currentY = e.touches[0].clientY - initialY;
        } else {
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
        }

        xOffset = currentX;
        yOffset = currentY;
        
        themeSwitcher.style.transform = `translate(${currentX}px, ${currentY}px)`;
    }
}

// 初始化主题切换器的拖动功能
themeSwitcher.addEventListener('touchstart', dragStart, false);
themeSwitcher.addEventListener('touchend', dragEnd, false);
themeSwitcher.addEventListener('touchmove', drag, false);
themeSwitcher.addEventListener('mousedown', dragStart, false);
document.addEventListener('mouseup', dragEnd, false);
document.addEventListener('mousemove', drag, false);

// 加载保存的主题
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
        changeTheme(savedTheme);
    }
});

// 显示用户评价
function showTestimonial(index) {
    // 获取所有评价文本
    const testimonials = document.querySelectorAll('.testimonial-text');
    const currentTestimonial = document.getElementById(`testimonial-${index}`);
    
    // 如果当前评价已经显示，则隐藏它
    if (currentTestimonial.classList.contains('active')) {
        currentTestimonial.classList.remove('active');
        return;
    }
    
    // 隐藏所有评价
    testimonials.forEach(testimonial => {
        testimonial.classList.remove('active');
    });
    
    // 显示选中的评价
    currentTestimonial.classList.add('active');
} 

document.addEventListener('DOMContentLoaded', function() {
    const watermark = document.querySelector('.fp-watermark');
    if (watermark) {
        watermark.remove();
    }
});
