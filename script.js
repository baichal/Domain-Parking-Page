// 复制邮箱功能
function copyEmail() {
    const email = 'itifl@qq.com';
    
    // 使用现代API复制到剪贴板
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email).then(() => {
            showToast('邮箱已复制到剪贴板！');
        }).catch(err => {
            console.error('复制失败:', err);
            fallbackCopy(email);
        });
    } else {
        // 降级方案
        fallbackCopy(email);
    }
}

// 降级复制方案
function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    textArea.style.top = '-9999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showToast('邮箱已复制到剪贴板！');
    } catch (err) {
        console.error('复制失败:', err);
        showToast('复制失败，请手动复制');
    }
    
    document.body.removeChild(textArea);
}

// 发送邮件功能
function sendEmail() {
    const email = 'itifl@qq.com';
    const subject = '关于域名合作的咨询';
    const body = '您好，我对您的域名很感兴趣，希望能够了解更多合作详情。';
    
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // 创建临时链接并点击
    const link = document.createElement('a');
    link.href = mailtoLink;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// 显示提示消息
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = toast.querySelector('span');
    
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    // 3秒后隐藏
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// 添加滚动效果
function addScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // 观察元素
    const elementsToObserve = document.querySelectorAll('.contact-card, .feature-item');
    elementsToObserve.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// 添加鼠标跟随效果
function addMouseFollowEffect() {
    const shapes = document.querySelectorAll('.shape');
    
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.5;
            const x = (mouseX - 0.5) * speed * 20;
            const y = (mouseY - 0.5) * speed * 20;
            
            shape.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

// 添加键盘快捷键
function addKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ctrl+C 或 Cmd+C 复制邮箱
        if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
            e.preventDefault();
            copyEmail();
        }
        
        // Ctrl+M 或 Cmd+M 发送邮件
        if ((e.ctrlKey || e.metaKey) && e.key === 'm') {
            e.preventDefault();
            sendEmail();
        }
    });
}

// 添加页面加载动画
function addLoadingAnimation() {
    const elements = document.querySelectorAll('.logo-section, .contact-section, .features-section');
    
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// 添加点击波纹效果
function addRippleEffect() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// 添加CSS动画
function addCSSAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        @keyframes pulse {
            0% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.05);
            }
            100% {
                transform: scale(1);
            }
        }
        
        .logo-placeholder:hover {
            animation: pulse 2s infinite;
        }
    `;
    document.head.appendChild(style);
}

// 页面性能监控
function monitorPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('页面加载时间:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
            }, 0);
        });
    }
}

// 滚动复原逻辑 - 极简强制置顶
function resetScrollPosition() {
    // 阻止浏览器记住滚动位置
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    
    // 强制滚动到顶部
    window.scrollTo(0, 0);
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
}

// 页面显示时立即重置（包括往返缓存）
window.addEventListener('pageshow', function(event) {
    resetScrollPosition();
});

// 页面加载时重置
window.addEventListener('load', resetScrollPosition);

// DOM加载完成后立即重置
document.addEventListener('DOMContentLoaded', resetScrollPosition);

// 页面卸载前重置
window.addEventListener('beforeunload', resetScrollPosition);

// 初始化所有功能
document.addEventListener('DOMContentLoaded', function() {
    // 立即重置滚动位置（最高优先级）
    resetScrollPosition();
    
    // 延迟初始化其他功能，确保滚动重置完成
    setTimeout(() => {
        addLoadingAnimation();
        addScrollEffects();
        addMouseFollowEffect();
        addKeyboardShortcuts();
        addRippleEffect();
        addCSSAnimations();
        monitorPerformance();
        
        console.log('域名停靠页已加载完成！');
    }, 50);
});

// 添加触摸设备支持
if ('ontouchstart' in window) {
    document.addEventListener('touchstart', function() {}, { passive: true });
}

// 添加暗黑模式检测（可选）
function detectDarkMode() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark-mode');
    }
    
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (e.matches) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    });
}

// 初始化暗黑模式检测
detectDarkMode();