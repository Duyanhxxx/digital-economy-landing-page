// AI Chatbox Handler với Gemini API Integration
class ChatboxHandler {
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
        
        this.init();
        
        // Check API key
        if (!this.apiKey) {
            console.warn('API key not found. Using demo mode.');
        } else {
            console.log('API key found, will attempt to use Gemini API');
        }
    }

    init() {
        // Use setTimeout to ensure DOM elements are available
        setTimeout(() => {
            this.initializeEventListeners();
            this.setupAIResponses();
        }, 50);
    }

    initializeEventListeners() {
        console.log('Setting up chatbox listeners:', { 
            toggle: this.toggle, 
            closeBtn: this.closeBtn, 
            sendBtn: this.sendBtn, 
            input: this.input 
        });

        if (this.toggle) {
            this.toggle.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleChatbox();
            });
        }

        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeChatbox();
            });
        }

        if (this.sendBtn) {
            this.sendBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.sendMessage();
            });
        }

        if (this.input) {
            this.input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });
        }
        
        // Close on outside click
        document.addEventListener('click', (e) => {
            if (this.isOpen && this.chatbox && !this.chatbox.contains(e.target) && !this.toggle.contains(e.target)) {
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
        if (this.chatbox) {
            this.chatbox.classList.add('active');
            this.chatbox.style.display = 'flex';
            this.isOpen = true;
            
            if (this.input) {
                setTimeout(() => this.input.focus(), 100);
            }
        }
    }
    
    closeChatbox() {
        if (this.chatbox) {
            this.chatbox.classList.remove('active');
            this.chatbox.style.display = 'none';
            this.isOpen = false;
        }
    }

    async sendMessage() {
        if (!this.input || !this.messages) return;
        
        const message = this.input.value.trim();
        if (!message || this.isTyping) return;
        
        // Add user message
        this.addMessage(message, 'user');
        this.input.value = '';
        
        if (this.sendBtn) {
            this.sendBtn.disabled = true;
        }
        
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
        
        if (this.sendBtn) {
            this.sendBtn.disabled = false;
        }
    }

    async callGeminiAPI(message) {
        try {
            const { GoogleGenerativeAI } = await import('https://esm.run/@google/generative-ai');
            
            const genAI = new GoogleGenerativeAI(this.apiKey);
            
            // Use Gemini 2.0 Flash - the latest and most powerful model
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
                    
                    // Try different model names for Gemini Flash
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
            if (key !== 'default' && lowerMessage.includes(key)) {
                return response;
            }
        }
        return responses.default;
    }

    addMessage(content, type) {
        if (!this.messages) return;

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
        if (!this.messages) return;
        
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
        const typingIndicator = this.messages && this.messages.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    setupAIResponses() {
        // This method is kept for backward compatibility
        // The actual responses are now handled in getDemoResponse()
        console.log('AI responses setup completed');
    }
}

export default ChatboxHandler;