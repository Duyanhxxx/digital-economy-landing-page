// Interactive Features Handler for Social Consciousness in Digital Age
class InteractiveHandler {
    constructor() {
        this.currentQuestion = 1;
        this.totalQuestions = 10; // tăng từ 3 lên 10
        this.userAnswers = {};
        this.verificationScore = 0;
        this.init();
    }

    init() {
        this.initializeAssessment();
        this.initializeVerificationGame();
        this.initializeAlgorithmSandbox();
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
        // Rubric điểm cho từng câu, chuẩn hóa về thang 100
        const rubric = {
            q1: { a: 0,  b: 10, c: 7, d: 5 },
            q2: { a: 0,  b: 10, c: 7, d: 3 },
            q3: { a: 0,  b: 10, c: 3, d: 7 },
            q4: { a: 0,  b: 10, c: 7, d: 3 },
            q5: { a: 0,  b: 10, c: 7, d: 5 },
            q6: { a: 0,  b: 10, c: 7, d: 3 },
            q7: { a: 5,  b: 10, c: 7, d: 0 },
            q8: { a: 0,  b: 10, c: 3, d: 3 },
            q9: { a: 3,  b: 10, c: 5, d: 0 },
            q10:{ a: 3,  b: 10, c: 0, d: 8 }
        };

        let rawScore = 0;
        let answered = 0;
        Object.keys(rubric).forEach(q => {
            const ans = this.userAnswers[q];
            if (ans && rubric[q][ans] !== undefined) {
                rawScore += rubric[q][ans];
                answered++;
            }
        });
        // Chuẩn hóa: mỗi câu tối đa 10 điểm, tổng tối đa 100
        const score = Math.round(rawScore); // đã ở thang 100 khi đủ 10 câu

        // Phân loại kết quả theo ngưỡng
        if (score >= 80) {
            return {
                title: "Ý Thức Xã Hội Cao",
                score: score,
                description: "Bạn có tư duy phản biện tốt, nhận diện thuật toán và hành xử có trách nhiệm với cộng đồng.",
                recommendations: [
                    "Tiếp tục chia sẻ phương pháp kiểm chứng nguồn",
                    "Tham gia dự án cộng đồng, đo lường tác động thực",
                    "Luân phiên đa dạng hóa nguồn để tránh buồng vang"
                ]
            };
        } else if (score >= 50) {
            return {
                title: "Ý Thức Xã Hội Trung Bình",
                score: score,
                description: "Bạn có nền tảng nhận thức, nên rèn thêm kỹ năng kiểm chứng và đối thoại văn minh.",
                recommendations: [
                    "Áp dụng checklist nguồn: tác giả, bằng chứng, peer-review",
                    "Tập luyện dừng-cân nhắc trước khi phản ứng cảm xúc",
                    "Chủ động tham gia hoạt động cộng đồng nhỏ, thực tế"
                ]
            };
        } else {
            return {
                title: "Cần Phát Triển Ý Thức Xã Hội",
                score: score,
                description: "Hãy tăng cường kiểm chứng thông tin và giảm phụ thuộc vào đề xuất thuật toán.",
                recommendations: [
                    "Mỗi ngày kiểm chứng một thông tin từ 2 nguồn đáng tin",
                    "Theo dõi các chủ đề đa chiều để giảm thiên kiến",
                    "Tham gia thảo luận tôn trọng, tránh phản ứng cảm xúc"
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
    
    // ===== ALGORITHM SANDBOX =====
    initializeAlgorithmSandbox() {
        this.sandboxData = [
            { title: 'Chiến dịch thiện nguyện thực tế', virality: 55, credibility: 90, category: 'community' },
            { title: 'Bài viết gây sốt nhưng thiếu nguồn', virality: 90, credibility: 30, category: 'viral' },
            { title: 'Phân tích khoa học có peer-review', virality: 40, credibility: 95, category: 'research' },
            { title: 'Review sản phẩm kèm mã giảm giá', virality: 75, credibility: 40, category: 'commerce' },
            { title: 'Phỏng vấn đa góc nhìn', virality: 50, credibility: 80, category: 'dialogue' },
            { title: 'Tin đồn người nổi tiếng', virality: 85, credibility: 20, category: 'rumor' }
        ];

        const viralitySlider = document.getElementById('weight-virality');
        const credibilitySlider = document.getElementById('weight-credibility');
        const diversitySlider = document.getElementById('weight-diversity');

        const update = () => this.updateAlgorithmSandbox();
        [viralitySlider, credibilitySlider, diversitySlider].forEach(sl => {
            if (sl) sl.addEventListener('input', update);
        });

        this.updateAlgorithmSandbox();
    }

    updateAlgorithmSandbox() {
        const vEl = document.getElementById('weight-virality');
        const cEl = document.getElementById('weight-credibility');
        const dEl = document.getElementById('weight-diversity');
        if (!vEl || !cEl || !dEl) return;

        const wV = Number(vEl.value) / 100;
        const wC = Number(cEl.value) / 100;
        const wD = Number(dEl.value) / 100;

        const categoryDiversity = {
            research: 0.9, dialogue: 0.8, community: 0.7, commerce: 0.5, viral: 0.4, rumor: 0.3
        };

        const scored = this.sandboxData
            .map(item => {
                const diversityVal = (categoryDiversity[item.category] || 0.5) * 100;
                const score = Math.round(wV * item.virality + wC * item.credibility + wD * diversityVal);
                return { ...item, score };
            })
            .sort((a, b) => b.score - a.score)
            .slice(0, 6);

        const feed = document.getElementById('feed-preview');
        if (feed) {
            feed.innerHTML = scored.map(s => `
                <div class="feed-item">
                    <div class="feed-title">${s.title}</div>
                    <div class="feed-meta">
                        <span class="badge badge-virality">Gây sốt: ${s.virality}</span>
                        <span class="badge badge-credibility">Tin cậy: ${s.credibility}</span>
                        <span class="badge badge-diversity">Đa dạng: ${Math.round((categoryDiversity[s.category] || 0.5) * 100)}</span>
                    </div>
                    <div class="feed-score">Điểm hiển thị: <strong>${s.score}</strong></div>
                </div>
            `).join('');
        }

        const balanceEl = document.getElementById('algo-balance');
        if (balanceEl) {
            balanceEl.textContent = this.computeAlgoBalance(wV, wC, wD);
        }
    }

    computeAlgoBalance(wV, wC, wD) {
        const target = 1 / 3;
        const diff = Math.abs(wV - target) + Math.abs(wC - target) + Math.abs(wD - target);
        const maxDiff = 2 / 3;
        const balance = Math.round(100 - (diff / maxDiff) * 100);
        return Math.max(0, Math.min(100, balance));
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