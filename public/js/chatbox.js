// AI Chatbox Handler cho Ý Thức Xã Hội Số
class ChatboxHandler {
    constructor() {
        this.apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        this.model = import.meta.env.VITE_GEMINI_MODEL || 'gemini-2.0-flash';
        this.isOpen = false;
        this.isTyping = false;
        
        // Initialize elements
        this.chatbox = document.getElementById('ai-chatbox');
        this.toggle = document.getElementById('chatbox-toggle');
        this.closeBtn = document.getElementById('chatbox-close');
        this.messages = document.getElementById('chatbox-messages');
        this.input = document.getElementById('chatbox-input-field');
        this.sendBtn = document.getElementById('chatbox-send');
        
        // Define relevant topics
        this.relevantTopics = [
            // Môn học liên quan
            'ý thức xã hội', 'triết học', 'chính trị', 'xã hội học', 'tâm lý học xã hội',
            'truyền thông', 'mạng xã hội', 'thông tin', 'tin giả', 'fake news',
            'thuật toán', 'algorithm', 'công nghệ', 'số hóa', 'digital',
            'tư duy phản biện', 'critical thinking', 'phân tích', 'đánh giá',
            'xu hướng', 'trend', 'viral', 'ảnh hưởng xã hội', 'dư luận',
            'quyền lực', 'thao túng', 'propaganda', 'ideology', 'ý thức hệ',
            'văn hóa', 'giá trị', 'chuẩn mực', 'đạo đức', 'ethics',
            'sinh viên', 'giáo dục', 'học tập', 'nghiên cứu',
            'cộng đồng', 'xã hội', 'tập thể', 'cá nhân',
            'thực tế', 'ảo tưởng', 'nhận thức', 'ý thức',
            'marx', 'marxism', 'hạ tầng', 'thượng tầng', 'kinh tế chính trị',
            'dân chủ', 'tự do', 'nhân quyền', 'công bằng xã hội',
            'toàn cầu hóa', 'hiện đại hóa', 'phát triển bền vững'
        ];
        
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
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.sendMessage();
                }
            });
        }
    }

    toggleChatbox() {
        if (this.isOpen) {
            this.closeChatbox();
        } else {
            this.openChatbox();
        }
    }
    
    openChatbox() {
        this.isOpen = true;
        if (this.chatbox) {
            this.chatbox.classList.add('active');
            setTimeout(() => {
                if (this.input) this.input.focus();
            }, 300);
        }
    }

    closeChatbox() {
        this.isOpen = false;
        if (this.chatbox) {
            this.chatbox.classList.remove('active');
        }
    }

    // Check if message is relevant to academic topics
    isRelevantTopic(message) {
        const lowerMessage = message.toLowerCase();
        
        // Check if message contains any relevant keywords
        const hasRelevantKeyword = this.relevantTopics.some(topic => 
            lowerMessage.includes(topic.toLowerCase())
        );
        
        // Additional context checks
        const academicContexts = [
            'môn học', 'bài tập', 'nghiên cứu', 'luận văn', 'báo cáo',
            'phân tích', 'đánh giá', 'so sánh', 'giải thích', 'tại sao',
            'như thế nào', 'ảnh hưởng', 'tác động', 'nguyên nhân', 'hậu quả',
            'quan điểm', 'lý thuyết', 'khái niệm', 'định nghĩa'
        ];
        
        const hasAcademicContext = academicContexts.some(context => 
            lowerMessage.includes(context)
        );
        
        return hasRelevantKeyword || hasAcademicContext;
    }

    async sendMessage() {
        const message = this.input?.value.trim();
        if (!message || this.isTyping) return;

        this.addMessage(message, 'user');
        this.input.value = '';
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
            console.error('Error getting AI response:', error);
            this.hideTyping();
            const fallbackResponse = this.getDemoResponse(message);
            this.addMessage(fallbackResponse, 'ai');
        }
    }

    getOffTopicResponse() {
        const responses = [
            `Xin lỗi, tôi chỉ có thể trả lời các câu hỏi liên quan đến:

📚 **Môn học**: Ý thức xã hội, triết học, chính trị học, xã hội học
🧠 **Chủ đề chính**: 
- Ý thức xã hội trong thời đại số
- Tác động của mạng xã hội đến tư duy
- Tư duy phản biện và phân tích thông tin
- Triết học chính trị và xã hội

Bạn có thể hỏi lại về những chủ đề này không?`,

            `Tôi được thiết kế để hỗ trợ học tập về **ý thức xã hội trong bối cảnh số** và các môn học liên quan như triết học, chính trị học.

Hãy hỏi tôi về:
- Cách phân tích xu hướng xã hội
- Lý thuyết triết học về ý thức
- Tác động chính trị của công nghệ số
- Phương pháp nghiên cứu xã hội học

Bạn muốn tìm hiểu điều gì trong những lĩnh vực này?`,

            `Câu hỏi của bạn nằm ngoài phạm vi chuyên môn của tôi. 

Tôi chỉ hỗ trợ các vấn đề học thuật về:
🔍 Phân tích ý thức xã hội
📱 Tác động của công nghệ số
🤔 Triết học và tư duy phản biện  
🏛️ Chính trị học và quyền lực

Bạn có câu hỏi nào khác về những chủ đề này không?`
        ];
        
        return responses[Math.floor(Math.random() * responses.length)];
    }

    async callGeminiAPI(message) {
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent?key=${this.apiKey}`;
        
        const prompt = `Bạn là một chuyên gia triết học, có kiến thức sâu về ý thức xã hội và chính trị trong thời đại số.

Nhiệm vụ: Trả lời mọi câu hỏi bằng tiếng Việt, theo góc nhìn triết học-xã hội, rõ ràng và ngắn gọn (tối đa 250 từ). 
- Nêu luận điểm chính và lý thuyết liên quan (ví dụ: Marx, Foucault, Habermas, Kant...).
- Liên hệ bối cảnh công nghệ số và tác động xã hội.
- Đề xuất cách tư duy/phản biện hoặc hành động có trách nhiệm.

Nếu câu hỏi không trực tiếp thuộc phạm vi, hãy tái diễn dịch nó từ góc nhìn triết học và cung cấp phân tích liên quan, không từ chối.

Câu hỏi: ${message}`;

        const requestBody = {
            contents: [{
                parts: [{
                    text: prompt
                }]
            }],
            generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 350,
            }
        };

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.candidates && data.candidates[0] && data.candidates[0].content) {
            return data.candidates[0].content.parts[0].text;
        } else {
            throw new Error('Invalid API response format');
        }
    }

    getDemoResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Responses about fake news and information analysis
        if (lowerMessage.includes('tin giả') || lowerMessage.includes('fake news') || lowerMessage.includes('thông tin sai')) {
            return `**Phân tích tin giả từ góc độ triết học nhận thức:**

🔍 **Bản chất nhận thức**: Tin giả khai thác khuynh hướng xác nhận (confirmation bias) - con người có xu hướng tin những thông tin phù hợp với quan điểm có sẵn.

📚 **Phương pháp luận**:
- **Nghi ngờ có phương pháp** (Descartes): Đặt câu hỏi về mọi thông tin
- **Kiểm chứng thực nghiệm**: Tìm bằng chứng cụ thể, có thể đo lường
- **Đối thoại Socrates**: Đặt câu hỏi liên tiếp để khám pháa sự thật

🏛️ **Góc độ chính trị**: Tin giả là công cụ quyền lực để định hướng dư luận, tạo ra "sự thật" phục vụ lợi ích nhóm.`;
        }
        
        // Responses about algorithms and social media from political perspective
        if (lowerMessage.includes('thuật toán') || lowerMessage.includes('algorithm') || lowerMessage.includes('mạng xã hội')) {
            return `**Thuật toán mạng xã hội: Phân tích chính trị học**

🏛️ **Quyền lực số**: Thuật toán là hình thức quyền lực mới - "algorithmic governance" (Foucault hiện đại)

📊 **Cơ chế hoạt động**:
- **Panopticon số**: Giám sát hành vi không người dùng nhận ra
- **Hegemony văn hóa** (Gramsci): Tạo đồng thuận qua nội dung đường để lựa chọn
- **Bong bóng thông tin**: Chia rẽ xã hội thành các nhóm tách biệt

🤔 **Triết học**: Thuật toán đặt ra câu hỏi về tự do ý chí - liệu chúng ta có thực sự tự do lựa chọn khi suy nghĩng?

**Ý nghĩa chính trị**: Ai kiểm soát thuật toán sẽ kiểm soát ý thức xã hội.`;
        }
        
        // Responses about critical thinking from philosophical perspective
        if (lowerMessage.includes('tư duy phản biện') || lowerMessage.includes('phân tích') || lowerMessage.includes('critical thinking')) {
            return `**Tư duy phản biện: Nền tảng triết học**

🧠 **Kant và "Sapere aude!"**: "Hãy dám sử dụng lý trí của chính mình"

📚 **Phương pháp triết học**:
- **Biện chứng** (Hegel): Thesis → Antithesis → Synthesis
- **Hiện tượng học** (Husserl): "Đặt trong ngoặc" các định kiến
- **Hermeneutics**: Hiểu nghĩa trong bối cảnh

🔍 **Ứng dụng thực tế**:
1. **Phân tích ngôn ngữ**: Từ ngữ nào được sử dụng? Tại sao?
2. **Tìm hiểu bối cảnh**: Ai nói? Khi nào? Vì mục đích gì?
3. **Đối chiếu quan điểm**: Có tiếng nói đối lập nào không?
4. **Phản tư về bản thân**: Tôi có định kiến gì không?

**Mục tiêu**: Đạt được "epoché" - trạng thái treo lơ lửng phán đoán để nhìn nhận khách quan.`;
        }
        
        // Responses about social consciousness from Marxist perspective
        if (lowerMessage.includes('ý thức xã hội') || lowerMessage.includes('ý thức hệ') || lowerMessage.includes('ideology')) {
            return `**Ý thức xã hội: Phân tích Marxist**

🏭 **Marx và ý thức xã hội**:
- "Tồn tại xã hội quyết định ý thức xã hội"
- Ý thức là sản phẩm của điều kiện vật chất

📱 **Trong thời đại số**:
- **Hạ tầng mới**: Nền tảng công nghệ, thuật toán
- **Thượng tầng mới**: Văn hóa mạng, giá trị số

🤔 **Câu hỏi triết học**: Liệu ý thức số có còn phản ánh thực tại hay đã trở thành "ý thức giả tạo" (false consciousness)?

🔄 **Mối quan hệ biện chứng**:
- Công nghệ định hình ý thức
- Ý thức lại tác động ngược lại công nghệ
- Tạo ra chu trình phản hồi phức tạp

**Kết luận**: Cần phân biệt ý thức "tự phát" và ý thức "được sản xuất" bởi các lực lượng kinh tế-chính trị.`;
        }
        
        // Responses about power and manipulation
        if (lowerMessage.includes('quyền lực') || lowerMessage.includes('thao túng') || lowerMessage.includes('propaganda')) {
            return `**Quyền lực và thao túng trong thời đại số**

🏛️ **Foucault và quyền lực**:
- Quyền lực không chỉ là áp bức mà còn là "sản xuất" tri thức
- "Biopower": Kiểm soát qua dữ liệu và thuật toán

📊 **Các hình thức thao túng**:
- **Soft power**: Ảnh hưởng qua văn hóa, giải trí
- **Astroturfing**: Tạo ra phong trào "cỏ rễ" giả
- **Gaslighting tập thể**: Làm xã hội nghi ngờ nhận thức của chính mình

🧠 **Chomsky và "Manufacturing Consent"**:
- Truyền thông tạo ra sự đồng thuận
- 5 bộ lọc thông tin trong xã hội

**Phòng chống**: Phát triển "ý thức giai cấp" mới - nhận thức về cách thức hoạt động của quyền lực số.`;
        }
        
        // Responses about education and research methodology
        if (lowerMessage.includes('nghiên cứu') || lowerMessage.includes('phương pháp') || lowerMessage.includes('học thuật')) {
            return `**Phương pháp nghiên cứu ý thức xã hội số**

📚 **Đa ngành tích hợp**:
- **Xã hội học**: Khảo sát, phỏng vấn về hành vi số
- **Tâm lý học**: Nghiên cứu tác động nhận thức
- **Chính trị học**: Phân tích quyền lực và ảnh hưởng
- **Triết học**: Phản tư về bản chất và ý nghĩa

🔍 **Phương pháp cụ thể**:
- **Ethnography số**: Quan sát tham gia trong cộng đồng online
- **Phân tích diễn ngôn**: Nghiên cứu ngôn ngữ và ý nghĩa
- **Big data analysis**: Phân tích xu hướng quy mô lớn
- **Phenomenology**: Nghiên cứu trải nghiệm chủ quan

📊 **Thách thức đạo đức**:
- Quyền riêng tư vs nghiên cứu
- Tính khách quan trong môi trường bị thuật toán định hướng
- Trách nhiệm của nhà nghiên cứu với xã hội`;
        }
        
        // Responses about Vietnamese context and students
        if (lowerMessage.includes('sinh viên') || lowerMessage.includes('việt nam') || lowerMessage.includes('giáo dục')) {
            return `**Ý thức xã hội số trong bối cảnh Việt Nam**

🇻🇳 **Đặc thù văn hóa**:
- **Tập thể vs cá nhân**: Mạng xã hội tăng cường cá nhân hóa
- **Tôn trọng thầy cô vs tư duy độc lập**: Cần cân bằng
- **Truyền thống vs hiện đại**: Xung đột giá trị

📚 **Thách thức giáo dục**:
- Từ "học thuộc lòng" sang "tư duy phản biện"
- Phát triển khả năng phân tích thông tin
- Giữ gìn bản sắc trong toàn cầu hóa số

🎯 **Mục tiêu cho sinh viên**:
- **Ý thức phê phán**: Không tiếp nhận thông tin một cách thụ động
- **Trách nhiệm xã hội**: Sử dụng công nghệ có ý thức
- **Cân bằng**: Hưởng lợi từ công nghệ nhưng không bị chi phối

**Lời khuyên**: Hãy trở thành "công dân số" có trách nhiệm, không chỉ là "người tiêu dùng số".`;
        }
        
        // Default academic response
        return `Cảm ơn bạn đã quan tâm đến nghiên cứu về ý thức xã hội trong thời đại số! 

📚 **Tôi có thể hỗ trợ bạn về**:
- **Triết học**: Nhận thức luận, triết học xã hội, đạo đức học
- **Chính trị học**: Quyền lực, dư luận, thao túng thông tin  
- **Xã hội học**: Xu hướng, cộng đồng, văn hóa số
- **Phương pháp nghiên cứu**: Cách phân tích và đánh giá thông tin

🎯 **Chủ đề chính**: Ý thức xã hội có còn phản ánh thực tại hay đã bị "sản xuất" bởi các nhóm quyền lực?

Hãy đặt câu hỏi cụ thể về những lĩnh vực này để tôi có thể hỗ trợ bạn tốt nhất trong việc học tập và nghiên cứu! 🤔`;
    }

    addMessage(content, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.innerHTML = content.replace(/\n/g, '<br>');
        
        messageDiv.appendChild(contentDiv);
        this.messages?.appendChild(messageDiv);
        
        // Scroll to bottom
        if (this.messages) {
            this.messages.scrollTop = this.messages.scrollHeight;
        }
    }

    showTyping() {
        this.isTyping = true;
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message ai-message typing-indicator';
        typingDiv.id = 'typing-indicator';
        typingDiv.innerHTML = `
            <div class="message-content">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        this.messages?.appendChild(typingDiv);
        if (this.messages) {
            this.messages.scrollTop = this.messages.scrollHeight;
        }
    }

    hideTyping() {
        this.isTyping = false;
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    setupAIResponses() {
        // Additional setup if needed
        console.log('Academic AI Chatbox for Social Consciousness initialized');
    }
}

export default ChatboxHandler;