// Smooth scrolling for navigation links
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

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.concept-card, .impact-card, .solution-card, .conclusion-content').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Counter animation for hero stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '%';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '%';
        }
    }
    
    updateCounter();
}

// Animate counters when hero section is visible
const heroObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = document.querySelectorAll('.stat-number');
            statNumbers.forEach((stat, index) => {
                const targets = [70, 85, 95];
                setTimeout(() => {
                    animateCounter(stat, targets[index]);
                }, index * 200);
            });
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroObserver.observe(heroSection);
}

// CTA Button functionality
function downloadReport() {
    // Create a simple modal or alert for demonstration
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 15px;
        text-align: center;
        max-width: 400px;
        margin: 0 20px;
    `;
    
    modalContent.innerHTML = `
        <h3 style="margin-bottom: 1rem; color: #1f2937;">Báo Cáo Chi Tiết</h3>
        <p style="margin-bottom: 1.5rem; color: #6b7280;">
            Cảm ơn bạn đã quan tâm! Báo cáo chi tiết sẽ được gửi đến email của bạn.
        </p>
        <div style="margin-bottom: 1.5rem;">
            <input type="email" placeholder="Nhập email của bạn" 
                   style="width: 100%; padding: 0.8rem; border: 1px solid #d1d5db; border-radius: 8px; margin-bottom: 1rem;">
        </div>
        <div style="display: flex; gap: 1rem; justify-content: center;">
            <button onclick="submitEmail()" 
                    style="background: #667eea; color: white; border: none; padding: 0.8rem 1.5rem; border-radius: 8px; cursor: pointer;">
                Gửi
            </button>
            <button onclick="closeModal()" 
                    style="background: #6b7280; color: white; border: none; padding: 0.8rem 1.5rem; border-radius: 8px; cursor: pointer;">
                Đóng
            </button>
        </div>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Close modal function
    window.closeModal = function() {
        document.body.removeChild(modal);
    };
    
    // Submit email function
    window.submitEmail = function() {
        const email = modal.querySelector('input[type="email"]').value;
        if (email && email.includes('@')) {
            alert('Cảm ơn bạn! Báo cáo sẽ được gửi đến ' + email);
            closeModal();
        } else {
            alert('Vui lòng nhập email hợp lệ');
        }
    };
    
    // Close on outside click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease';
});

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Add any initialization code here
    console.log('Landing page loaded successfully!');
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.concept-card, .impact-card, .solution-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Mobile menu toggle (if needed)
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// Add mobile menu styles if needed
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            top: 70px;
            left: -100%;
            width: 100%;
            height: calc(100vh - 70px);
            background: white;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            padding-top: 2rem;
            transition: left 0.3s ease;
        }
        
        .nav-menu.active {
            left: 0;
        }
        
        .mobile-menu-toggle {
            display: block;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
        }
    }
    
    @media (min-width: 769px) {
        .mobile-menu-toggle {
            display: none;
        }
    }
`;
document.head.appendChild(style);

// Add mobile menu button to navbar
const navContainer = document.querySelector('.nav-container');
const mobileMenuButton = document.createElement('button');
mobileMenuButton.className = 'mobile-menu-toggle';
mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
mobileMenuButton.onclick = toggleMobileMenu;
navContainer.appendChild(mobileMenuButton);

// AI Chatbox Implementation
class AIAssistant {
    constructor() {
        this.apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        this.isOpen = false;
        this.isTyping = false;
        
        // Initialize elements
        this.chatbox = document.getElementById('ai-chatbox');
        this.toggle = document.getElementById('chatbox-toggle');
        this.closeBtn = document.getElementById('chatbox-close');
        this.messages = document.getElementById('chatbox-messages');
        this.input = document.getElementById('chatbox-input-field');
        this.sendBtn = document.getElementById('chatbox-send');
        
        this.initializeEventListeners();
        
        // Check API key
        if (!this.apiKey) {
            console.warn('API key not found. Using demo mode.');
        } else {
            console.log('API key found, will attempt to use Gemini API');
        }
    }
    
    initializeEventListeners() {
        this.toggle.addEventListener('click', () => this.toggleChatbox());
        this.closeBtn.addEventListener('click', () => this.closeChatbox());
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
        
        // Close on outside click
        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.chatbox.contains(e.target) && !this.toggle.contains(e.target)) {
                this.closeChatbox();
            }
        });
    }
    
    toggleChatbox() {
        if (this.isOpen) {
            this.closeChatbox();
        } else {
            this.openChatbox();
        }
    }
    
    openChatbox() {
        this.chatbox.classList.add('active');
        this.isOpen = true;
        this.input.focus();
    }
    
    closeChatbox() {
        this.chatbox.classList.remove('active');
        this.isOpen = false;
    }
    
    async sendMessage() {
        const message = this.input.value.trim();
        if (!message || this.isTyping) return;
        
        // Add user message
        this.addMessage(message, 'user');
        this.input.value = '';
        this.sendBtn.disabled = true;
        
        // Show typing indicator
        this.showTyping();
        
        try {
            let response;
            if (this.apiKey) {
                response = await this.callGeminiAPI(message);
            } else {
                response = this.getDemoResponse(message);
            }
            
            this.hideTyping();
            this.addMessage(response, 'ai');
        } catch (error) {
            console.error('Error:', error);
            this.hideTyping();
            
            // Check if it's an API-related error and fallback to demo
            if (error.message && (error.message.includes('404') || error.message.includes('403') || error.message.includes('not found'))) {
                console.log('API error detected, falling back to demo mode');
                const demoResponse = this.getDemoResponse(message);
                this.addMessage(`[Demo Mode] ${demoResponse}`, 'ai');
            } else {
                this.addMessage('Xin lỗi, tôi gặp sự cố kỹ thuật. Đang chuyển sang chế độ demo...', 'ai');
                setTimeout(() => {
                    const demoResponse = this.getDemoResponse(message);
                    this.addMessage(demoResponse, 'ai');
                }, 1000);
            }
        }
        
        this.sendBtn.disabled = false;
    }
    
    async callGeminiAPI(message) {
        try {
            const { GoogleGenerativeAI } = await import('https://esm.run/@google/generative-ai');
            
            const genAI = new GoogleGenerativeAI(this.apiKey);
            
            // Use Gemini 2.5 Flash - the latest and most powerful model
            const model = genAI.getGenerativeModel({ 
                model: "gemini-2.0-flash-exp",
                generationConfig: {
                    temperature: 0.7,
                    topP: 0.8,
                    topK: 40,
                    maxOutputTokens: 1024,
                }
            });
            
            const prompt = `Bạn là một chuyên gia triết học chính trị và kinh tế chính trị, có chuyên môn sâu về:
            - Triết học Mác-Lênin về mối quan hệ hạ tầng - thượng tầng
            - Kinh tế chính trị học về chuyển đổi số
            - Triết học về tác động của công nghệ đến xã hội
            - Lý thuyết chính trị về kinh tế số
            
            Hãy trả lời câu hỏi sau từ góc độ triết học chính trị, với phân tích sâu sắc về bản chất và quy luật (tối đa 250 từ):
            
            Câu hỏi: ${message}
            
            Lưu ý: 
            - CHỈ trả lời các câu hỏi liên quan đến triết học, chính trị, kinh tế chính trị, và kinh tế số
            - Nếu câu hỏi không liên quan, hãy từ chối một cách lịch sự và hướng dẫn về chủ đề phù hợp
            - Sử dụng thuật ngữ triết học và chính trị học chính xác
            - Phân tích theo phương pháp luận duy vật biện chứng`;
            
            const result = await model.generateContent(prompt);
            const response = await result.response;
            return response.text();
            
        } catch (error) {
            console.error('Gemini API Error:', error);
            
            // If 2.0 flash doesn't work, try other versions
            if (error.message && error.message.includes('not found')) {
                try {
                    console.log('Trying alternative model names...');
                    const { GoogleGenerativeAI } = await import('https://esm.run/@google/generative-ai');
                    const genAI = new GoogleGenerativeAI(this.apiKey);
                    
                    // Try different model names for Gemini 2.5 Flash
                    const modelNames = [
                        "gemini-2.0-flash",
                        "gemini-1.5-flash",
                        "gemini-1.5-flash-latest",
                        "models/gemini-1.5-flash"
                    ];
                    
                    for (const modelName of modelNames) {
                        try {
                            const model = genAI.getGenerativeModel({ model: modelName });
                            const result = await model.generateContent(prompt);
                            const response = await result.response;
                            console.log(`Successfully used model: ${modelName}`);
                            return response.text();
                        } catch (e) {
                            console.log(`Model ${modelName} failed:`, e.message);
                            continue;
                        }
                    }
                } catch (fallbackError) {
                    console.error('All model attempts failed:', fallbackError);
                }
            }
            
            throw error;
        }
    }
    
    getDemoResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Check if question is related to allowed topics
        const allowedTopics = ['kinh tế', 'chính trị', 'triết học', 'hạ tầng', 'thượng tầng', 'xã hội', 'công nghệ', 'số hóa', 'chuyển đổi', 'mác', 'lênin', 'duy vật'];
        const isRelevant = allowedTopics.some(topic => lowerMessage.includes(topic));
        
        if (!isRelevant) {
            return 'Xin lỗi, tôi chỉ có thể thảo luận về các chủ đề liên quan đến triết học chính trị, kinh tế chính trị, và mối quan hệ hạ tầng - thượng tầng trong kinh tế số. Bạn có thể hỏi về: triết học Mác-Lênin, kinh tế chính trị số, tác động xã hội của công nghệ, hay lý thuyết về chuyển đổi số.';
        }
        
        const responses = {
            'hạ tầng': 'Theo quan điểm triết học Mác-Lênin, hạ tầng kinh tế số bao gồm các lực lượng sản xuất công nghệ và quan hệ sản xuất số. Đây là nền tảng vật chất quyết định kiến trúc thượng tầng chính trị-xã hội, tạo ra những biến đổi căn bản trong cấu trúc xã hội hiện đại.',
            
            'thượng tầng': 'Kiến trúc thượng tầng trong kỷ nguyên số bao gồm hệ thống chính trị, pháp luật, ý thức hệ và văn hóa được định hình bởi hạ tầng công nghệ. Sự tác động ngược của thượng tầng lên hạ tầng thể hiện qua các chính sách số hóa và quản trị công nghệ.',
            
            'kinh tế số': 'Kinh tế số là hình thái mới của phương thức sản xuất, thể hiện sự phát triển của lực lượng sản xuất công nghệ. Nó tạo ra những mâu thuẫn mới giữa tính chất xã hội của sản xuất và tính chất tư nhân của chiếm hữu trong không gian số.',
            
            'chuyển đổi số': 'Chuyển đổi số là quá trình cách mạng công nghệ, thể hiện quy luật phát triển của lực lượng sản xuất. Đây là bước nhảy vọt chất lượng trong phương thức sản xuất, tạo ra những biến đổi sâu sắc trong quan hệ sản xuất và cấu trúc xã hội.',
            
            'triết học': 'Triết học về kinh tế số nghiên cứu những quy luật khách quan của sự phát triển xã hội trong kỷ nguyên công nghệ. Nó vận dụng phương pháp luận duy vật biện chứng để phân tích mâu thuẫn giữa hạ tầng công nghệ và thượng tầng chính trị.',
            
            'chính trị': 'Chính trị trong kinh tế số phản ánh lợi ích của các giai cấp xã hội trong việc kiểm soát và phân phối tài nguyên công nghệ. Quyền lực chính trị được tái cấu trúc thông qua việc nắm giữ dữ liệu và công nghệ số.',
            
            'mác': 'Lý thuyết Mác về mối quan hệ hạ tầng - thượng tầng vẫn có giá trị trong việc phân tích kinh tế số. Hạ tầng công nghệ số quyết định thượng tầng chính trị-pháp lý, đồng thời chịu tác động ngược từ các chính sách và thể chế.',
            
            'default': 'Tôi là chuyên gia triết học chính trị, chuyên nghiên cứu mối quan hệ hạ tầng - thượng tầng trong kinh tế số. Bạn có thể hỏi tôi về: triết học Mác-Lênin, kinh tế chính trị số, lý thuyết xã hội về công nghệ, hay phân tích triết học về chuyển đổi số.'
        };
        
        for (const [key, response] of Object.entries(responses)) {
            if (lowerMessage.includes(key)) {
                return response;
            }
        }
        return responses.default;
    }
    
    addMessage(content, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.textContent = content;
        
        messageDiv.appendChild(contentDiv);
        this.messages.appendChild(messageDiv);
        this.messages.scrollTop = this.messages.scrollHeight;
    }
    
    showTyping() {
        this.isTyping = true;
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.innerHTML = `
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        `;
        this.messages.appendChild(typingDiv);
        this.messages.scrollTop = this.messages.scrollHeight;
    }
    
    hideTyping() {
        this.isTyping = false;
        const typingIndicator = this.messages.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
}

// Initialize AI Assistant when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add any initialization code here
    
    // Initialize AI Chatbox
    const aiAssistant = new AIAssistant();
    
    console.log('Landing page with AI Assistant loaded successfully!');
});