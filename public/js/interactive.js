// Interactive Features Handler for Social Consciousness in Digital Age
class InteractiveHandler {
    constructor() {
        this.currentQuestion = 1;
        this.totalQuestions = 3;
        this.userAnswers = {};
        this.verificationScore = 0;
        this.init();
    }

    init() {
        this.initializeAssessment();
        this.initializeTrendAnalyzer();
        this.initializeVerificationGame();
    }

    // ===== SOCIAL CONSCIOUSNESS ASSESSMENT =====
    initializeAssessment() {
        const nextBtn = document.querySelector('.btn-next');
        const prevBtn = document.querySelector('.btn-prev');
        const resultBtn = document.querySelector('.btn-result');

        if (nextBtn) nextBtn.addEventListener('click', () => this.nextQuestion());
        if (prevBtn) prevBtn.addEventListener('click', () => this.previousQuestion());
        if (resultBtn) resultBtn.addEventListener('click', () => this.showResult());

        // Initialize radio button listeners
        document.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.userAnswers[e.target.name] = e.target.value;
                this.updateNavigationButtons();
            });
        });

        this.updateNavigationButtons();
    }

    nextQuestion() {
        if (this.currentQuestion < this.totalQuestions) {
            document.querySelector(`[data-question="${this.currentQuestion}"]`).classList.remove('active');
            this.currentQuestion++;
            document.querySelector(`[data-question="${this.currentQuestion}"]`).classList.add('active');
            this.updateNavigationButtons();
        }
    }

    previousQuestion() {
        if (this.currentQuestion > 1) {
            document.querySelector(`[data-question="${this.currentQuestion}"]`).classList.remove('active');
            this.currentQuestion--;
            document.querySelector(`[data-question="${this.currentQuestion}"]`).classList.add('active');
            this.updateNavigationButtons();
        }
    }

    updateNavigationButtons() {
        const nextBtn = document.querySelector('.btn-next');
        const prevBtn = document.querySelector('.btn-prev');
        const resultBtn = document.querySelector('.btn-result');

        if (prevBtn) prevBtn.style.display = this.currentQuestion === 1 ? 'none' : 'inline-block';
        
        if (this.currentQuestion === this.totalQuestions) {
            if (nextBtn) nextBtn.style.display = 'none';
            if (resultBtn) resultBtn.style.display = 'inline-block';
        } else {
            if (nextBtn) nextBtn.style.display = 'inline-block';
            if (resultBtn) resultBtn.style.display = 'none';
        }
    }

    showResult() {
        const resultContainer = document.querySelector('.result-container');
        const resultContent = document.querySelector('.result-content');
        
        if (!resultContainer || !resultContent) return;

        const result = this.calculateAssessmentResult();
        
        resultContent.innerHTML = `
            <div class="assessment-result">
                <h5>${result.title}</h5>
                <div class="result-score">
                    <div class="score-circle">
                        <span>${result.score}/100</span>
                    </div>
                </div>
                <p>${result.description}</p>
                <div class="result-recommendations">
                    <h6>Khuyến nghị:</h6>
                    <ul>
                        ${result.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
        
        resultContainer.style.display = 'block';
        resultContainer.scrollIntoView({ behavior: 'smooth' });
    }

    calculateAssessmentResult() {
        let score = 0;
        let criticalThinking = 0;
        let socialAwareness = 0;
        let actionOrientation = 0;

        // Analyze answers
        if (this.userAnswers.q1 === 'b') {
            score += 40;
            criticalThinking += 2;
        } else if (this.userAnswers.q1 === 'c') {
            score += 25;
            criticalThinking += 1;
        }

        if (this.userAnswers.q2 === 'b') {
            score += 35;
            socialAwareness += 2;
        } else if (this.userAnswers.q2 === 'c') {
            score += 20;
            socialAwareness += 1;
        }

        if (this.userAnswers.q3 === 'b') {
            score += 25;
            actionOrientation += 2;
        } else if (this.userAnswers.q3 === 'd') {
            score += 15;
            actionOrientation += 1;
        }

        // Determine result category
        if (score >= 80) {
            return {
                title: "Ý Thức Xã Hội Cao",
                score: score,
                description: "Bạn có khả năng tư duy phản biện tốt và ý thức xã hội chân thực. Bạn hiểu rõ sự khác biệt giữa xu hướng tự nhiên và xu hướng được tạo ra.",
                recommendations: [
                    "Tiếp tục phát triển kỹ năng phân tích thông tin",
                    "Chia sẻ kiến thức với bạn bè về cách nhận biết thông tin sai lệch",
                    "Tham gia các hoạt động cộng đồng có ý nghĩa"
                ]
            };
        } else if (score >= 50) {
            return {
                title: "Ý Thức Xã Hội Trung Bình",
                score: score,
                description: "Bạn có một số nhận thức về ý thức xã hội nhưng cần phát triển thêm kỹ năng tư duy phản biện và khả năng phân tích thông tin.",
                recommendations: [
                    "Học cách kiểm chứng thông tin từ nhiều nguồn",
                    "Tham gia các khóa học về tư duy phản biện",
                    "Thực hành đánh giá độ tin cậy của thông tin trên mạng xã hội"
                ]
            };
        } else {
            return {
                title: "Cần Phát Triển Ý Thức Xã Hội",
                score: score,
                description: "Bạn cần tăng cường nhận thức về ý thức xã hội và phát triển kỹ năng phân tích thông tin trong môi trường số.",
                recommendations: [
                    "Bắt đầu với việc đặt câu hỏi về nguồn gốc thông tin",
                    "Tìm hiểu về cách thức hoạt động của thuật toán mạng xã hội",
                    "Tham gia các hoạt động thực tế để hiểu rõ hơn về vấn đề xã hội"
                ]
            };
        }
    }

    // ===== TREND ANALYZER =====
    initializeTrendAnalyzer() {
        const analyzeBtn = document.querySelector('.trend-analyzer button');
        if (analyzeBtn) {
            analyzeBtn.addEventListener('click', () => this.analyzeTrend());
        }

        const trendInput = document.getElementById('trend-input');
        if (trendInput) {
            trendInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.analyzeTrend();
                }
            });
        }
    }

    analyzeTrend() {
        const trendInput = document.getElementById('trend-input');
        const resultDiv = document.getElementById('trend-result');
        
        if (!trendInput || !resultDiv) return;

        const trend = trendInput.value.trim();
        if (!trend) {
            alert('Vui lòng nhập một xu hướng để phân tích');
            return;
        }

        const analysis = this.performTrendAnalysis(trend);
        this.displayTrendAnalysis(analysis);
        resultDiv.style.display = 'block';
    }

    performTrendAnalysis(trend) {
        // Simulate trend analysis based on keywords
        const positiveKeywords = ['thiện nguyện', 'môi trường', 'học tập', 'sáng tạo', 'khởi nghiệp', 'zerowaste', 'digitaldetox'];
        const negativeKeywords = ['hưởng thụ', 'vật chất', 'sống ảo', 'fake', 'giả', 'luxury'];
        const commercialKeywords = ['mua', 'bán', 'sale', 'giảm giá', 'shopping', 'brand'];

        const lowerTrend = trend.toLowerCase();
        
        let naturalScore = 50;
        let manipulationScore = 30;
        let impactScore = 40;
        let tips = [];

        // Analyze based on keywords
        if (positiveKeywords.some(keyword => lowerTrend.includes(keyword))) {
            naturalScore += 30;
            impactScore += 25;
            manipulationScore -= 10;
            tips.push("Xu hướng này có vẻ tích cực và có thể mang lại giá trị thực sự");
        }

        if (negativeKeywords.some(keyword => lowerTrend.includes(keyword))) {
            naturalScore -= 20;
            manipulationScore += 25;
            tips.push("Cần cẩn thận với xu hướng này, có thể ảnh hưởng tiêu cực");
        }

        if (commercialKeywords.some(keyword => lowerTrend.includes(keyword))) {
            manipulationScore += 30;
            naturalScore -= 15;
            tips.push("Xu hướng này có thể có mục đích thương mại");
        }

        // Add general tips
        tips.push("Luôn kiểm tra nguồn gốc và động lực đằng sau xu hướng");
        tips.push("Quan sát xem ai là người khởi xướng và hưởng lợi từ xu hướng này");

        return {
            naturalScore: Math.max(0, Math.min(100, naturalScore)),
            manipulationScore: Math.max(0, Math.min(100, manipulationScore)),
            impactScore: Math.max(0, Math.min(100, impactScore)),
            tips: tips
        };
    }

    displayTrendAnalysis(analysis) {
        const naturalBar = document.getElementById('natural-score');
        const manipulationBar = document.getElementById('manipulation-score');
        const impactBar = document.getElementById('impact-score');
        const tipsList = document.getElementById('analysis-tips-list');

        if (naturalBar) {
            naturalBar.style.width = `${analysis.naturalScore}%`;
            naturalBar.style.backgroundColor = analysis.naturalScore > 60 ? '#4CAF50' : '#FF9800';
        }

        if (manipulationBar) {
            manipulationBar.style.width = `${analysis.manipulationScore}%`;
            manipulationBar.style.backgroundColor = analysis.manipulationScore > 60 ? '#F44336' : '#4CAF50';
        }

        if (impactBar) {
            impactBar.style.width = `${analysis.impactScore}%`;
            impactBar.style.backgroundColor = analysis.impactScore > 60 ? '#4CAF50' : '#FF9800';
        }

        if (tipsList) {
            tipsList.innerHTML = analysis.tips.map(tip => `<li>${tip}</li>`).join('');
        }
    }

    // ===== VERIFICATION GAME =====
    initializeVerificationGame() {
        const credibilityButtons = document.querySelectorAll('.credibility-buttons button');
        credibilityButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const newsCard = e.target.closest('.news-card');
                const credibility = newsCard.dataset.credibility;
                this.checkCredibility(e.target, credibility);
            });
        });
    }

    checkCredibility(button, actualCredibility) {
        const buttonText = button.textContent.toLowerCase();
        const newsCard = button.closest('.news-card');
        
        // Remove previous results
        const existingResult = newsCard.querySelector('.credibility-result');
        if (existingResult) {
            existingResult.remove();
        }

        let isCorrect = false;
        let feedback = '';

        // Determine if answer is correct
        if (actualCredibility === 'high' && buttonText === 'tin cậy') {
            isCorrect = true;
            feedback = 'Chính xác! Đây là nguồn tin đáng tin cậy với peer review.';
        } else if (actualCredibility === 'low' && buttonText === 'không tin cậy') {
            isCorrect = true;
            feedback = 'Chính xác! Thông tin này thiếu cơ sở khoa học và có dấu hiệu quảng cáo.';
        } else if (actualCredibility === 'medium' && buttonText === 'nghi ngờ') {
            isCorrect = true;
            feedback = 'Chính xác! Cần kiểm chứng thêm từ nguồn gốc của khảo sát.';
        } else {
            feedback = this.getIncorrectFeedback(actualCredibility);
        }

        // Update score
        if (isCorrect) {
            this.verificationScore++;
        }

        // Display result
        const resultDiv = document.createElement('div');
        resultDiv.className = `credibility-result ${isCorrect ? 'correct' : 'incorrect'}`;
        resultDiv.innerHTML = `
            <i class="fas ${isCorrect ? 'fa-check-circle' : 'fa-times-circle'}"></i>
            <span>${feedback}</span>
        `;
        
        newsCard.appendChild(resultDiv);

        // Disable buttons for this card
        const buttons = newsCard.querySelectorAll('.credibility-buttons button');
        buttons.forEach(btn => btn.disabled = true);

        // Update score display
        const scoreElement = document.getElementById('verification-score');
        if (scoreElement) {
            scoreElement.textContent = this.verificationScore;
        }
    }

    getIncorrectFeedback(actualCredibility) {
        switch (actualCredibility) {
            case 'high':
                return 'Không chính xác. Đây là nguồn tin đáng tin cậy từ tạp chí khoa học có uy tín.';
            case 'low':
                return 'Không chính xác. Thông tin này thiếu cơ sở khoa học và có dấu hiệu của quảng cáo.';
            case 'medium':
                return 'Không chính xác. Thông tin này cần được kiểm chứng thêm về nguồn gốc khảo sát.';
            default:
                return 'Hãy thử lại!';
        }
    }
}

// Global functions for HTML onclick events
window.nextQuestion = function() {
    if (window.interactiveHandler) {
        window.interactiveHandler.nextQuestion();
    }
};

window.previousQuestion = function() {
    if (window.interactiveHandler) {
        window.interactiveHandler.previousQuestion();
    }
};

window.showResult = function() {
    if (window.interactiveHandler) {
        window.interactiveHandler.showResult();
    }
};

window.analyzeTrend = function() {
    if (window.interactiveHandler) {
        window.interactiveHandler.analyzeTrend();
    }
};

window.checkCredibility = function(button, credibility) {
    if (window.interactiveHandler) {
        window.interactiveHandler.checkCredibility(button, credibility);
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.interactiveHandler = new InteractiveHandler();
});

export default InteractiveHandler;