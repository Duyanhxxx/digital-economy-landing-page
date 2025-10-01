// Interactive Features Handler
class InteractiveHandler {
    constructor() {
        this.quizData = this.initializeQuizData();
        this.currentQuestionIndex = 0;
        this.userAnswers = [];
        this.score = 0;
        this.gameElements = this.initializeGameElements();
        this.timelineData = this.initializeTimelineData();
        this.predictionScenarios = this.initializePredictionScenarios();
        this.counters = {};
        
        this.init();
    }

    init() {
        this.initializeQuiz();
        this.initializeEcosystemGame();
        this.initializeRealTimeCounters();
        this.initializePredictionGame();
        this.initializeTimeline();
    }

    // ===== QUIZ FUNCTIONALITY =====
    initializeQuizData() {
        return [
            {
                question: "Tỷ lệ sinh viên sử dụng công nghệ số trong học tập theo thống kê là bao nhiều?",
                answers: ["65%", "78%", "85%", "92%"],
                correct: 2,
                explanation: "Theo nghiên cứu gần đây, 85% sinh viên Việt Nam sử dụng công nghệ số trong học tập hàng ngày."
            },
            {
                question: "Yếu tố nào thuộc về hạ tầng kinh tế số?",
                answers: ["Ứng dụng di động", "Mạng internet", "Nền tảng thương mại điện tử", "Dịch vụ ngân hàng số"],
                correct: 1,
                explanation: "Mạng internet là hạ tầng cơ bản, trong khi các yếu tố khác thuộc về thượng tầng."
            },
            {
                question: "Việt Nam đứng thứ mấy trong khu vực ASEAN về chỉ số phát triển chính phủ điện tử?",
                answers: ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5"],
                correct: 1,
                explanation: "Việt Nam đứng thứ 3 trong ASEAN về chỉ số phát triển chính phủ điện tử năm 2023."
            },
            {
                question: "Tỷ lệ dân số Việt Nam sử dụng internet năm 2023 là bao nhiều?",
                answers: ["68%", "72%", "77%", "82%"],
                correct: 2,
                explanation: "Tỷ lệ sử dụng internet tại Việt Nam đạt 77% dân số vào năm 2023."
            },
            {
                question: "Yếu tố nào KHÔNG thuộc về thượng tầng kinh tế số?",
                answers: ["Cáp quang", "Fintech", "E-commerce", "EdTech"],
                correct: 0,
                explanation: "Cáp quang là hạ tầng vật lý, còn các yếu tố khác là ứng dụng thuộc thượng tầng."
            },
            {
                question: "Giá trị thị trường kinh tế số Việt Nam dự kiến đạt bao nhiều vào năm 2025?",
                answers: ["25 tỷ USD", "43 tỷ USD", "52 tỷ USD", "68 tỷ USD"],
                correct: 2,
                explanation: "Theo dự báo, thị trường kinh tế số Việt Nam sẽ đạt 52 tỷ USD vào năm 2025."
            },
            {
                question: "Tỷ lệ thanh toán không tiền mặt tại Việt Nam năm 2023 là?",
                answers: ["31%", "38%", "45%", "52%"],
                correct: 1,
                explanation: "Tỷ lệ thanh toán không tiền mặt đạt 38% trong năm 2023, tăng mạnh so với các năm trước."
            },
            {
                question: "Công nghệ nào được coi là nền tảng của cuộc cách mạng công nghiệp 4.0?",
                answers: ["AI và Machine Learning", "Blockchain", "IoT", "Tất cả các đáp án trên"],
                correct: 3,
                explanation: "Cuộc cách mạng 4.0 dựa trên sự kết hợp của AI, Blockchain, IoT và nhiều công nghệ khác."
            },
            {
                question: "Thách thức lớn nhất trong phát triển kinh tế số tại Việt Nam là gì?",
                answers: ["Thiếu nhân lực chất lượng cao", "Hạ tầng chưa đồng bộ", "Bảo mật thông tin", "Khoảng cách số"],
                correct: 3,
                explanation: "Khoảng cách số giữa các vùng miền và nhóm dân cư là thách thức lớn nhất hiện nay."
            },
            {
                question: "Mục tiêu của Việt Nam về tỷ trọng kinh tế số trong GDP vào năm 2030 là?",
                answers: ["20%", "25%", "30%", "35%"],
                correct: 2,
                explanation: "Việt Nam đặt mục tiêu kinh tế số chiếm 30% GDP vào năm 2030 theo Chiến lược phát triển kinh tế số."
            }
        ];
    }

    initializeQuiz() {
        const startBtn = document.getElementById('start-quiz');
        const nextBtn = document.getElementById('next-question');
        const restartBtn = document.getElementById('restart-quiz');

        if (startBtn) {
            startBtn.addEventListener('click', () => this.startQuiz());
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextQuestion());
        }
        if (restartBtn) {
            restartBtn.addEventListener('click', () => this.restartQuiz());
        }
    }

    startQuiz() {
        this.currentQuestionIndex = 0;
        this.userAnswers = [];
        this.score = 0;
        
        document.getElementById('start-quiz').style.display = 'none';
        document.getElementById('quiz-result').style.display = 'none';
        document.getElementById('restart-quiz').style.display = 'none';
        
        this.showQuestion();
    }

    showQuestion() {
        const question = this.quizData[this.currentQuestionIndex];
        const questionText = document.getElementById('question-text');
        const answersContainer = document.getElementById('quiz-answers');
        const currentQuestionSpan = document.getElementById('current-question');
        const progressBar = document.getElementById('quiz-progress');

        if (questionText) questionText.textContent = question.question;
        if (currentQuestionSpan) currentQuestionSpan.textContent = this.currentQuestionIndex + 1;
        
        // Update progress bar
        const progress = ((this.currentQuestionIndex + 1) / this.quizData.length) * 100;
        if (progressBar) progressBar.style.width = `${progress}%`;

        // Create answer options
        if (answersContainer) {
            answersContainer.innerHTML = '';
            question.answers.forEach((answer, index) => {
                const answerDiv = document.createElement('div');
                answerDiv.className = 'answer-option';
                answerDiv.innerHTML = `
                    <input type="radio" name="quiz-answer" value="${index}" id="answer-${index}">
                    <label for="answer-${index}">${answer}</label>
                `;
                answerDiv.addEventListener('click', () => this.selectAnswer(index));
                answersContainer.appendChild(answerDiv);
            });
        }
    }

    selectAnswer(answerIndex) {
        // Remove previous selections
        document.querySelectorAll('.answer-option').forEach(option => {
            option.classList.remove('selected');
        });
        
        // Mark selected answer
        const selectedOption = document.querySelectorAll('.answer-option')[answerIndex];
        selectedOption.classList.add('selected');
        
        // Enable next button
        const nextBtn = document.getElementById('next-question');
        if (nextBtn) {
            nextBtn.style.display = 'inline-block';
            nextBtn.disabled = false;
        }
        
        // Store answer
        this.userAnswers[this.currentQuestionIndex] = answerIndex;
    }

    nextQuestion() {
        const question = this.quizData[this.currentQuestionIndex];
        const userAnswer = this.userAnswers[this.currentQuestionIndex];
        
        // Check if answer is correct
        if (userAnswer === question.correct) {
            this.score++;
        }
        
        this.currentQuestionIndex++;
        
        if (this.currentQuestionIndex < this.quizData.length) {
            this.showQuestion();
            document.getElementById('next-question').style.display = 'none';
        } else {
            this.showQuizResult();
        }
    }

    showQuizResult() {
        document.getElementById('quiz-content').style.display = 'none';
        document.getElementById('next-question').style.display = 'none';
        document.getElementById('quiz-result').style.display = 'block';
        document.getElementById('restart-quiz').style.display = 'inline-block';
        
        const finalScore = document.getElementById('final-score');
        const scoreMessage = document.getElementById('score-message');
        const resultExplanation = document.getElementById('result-explanation');
        
        if (finalScore) finalScore.textContent = this.score;
        
        // Generate score message
        const percentage = (this.score / this.quizData.length) * 100;
        let message = '';
        if (percentage >= 80) {
            message = 'Xuất sắc! Bạn có hiểu biết rất tốt về kinh tế số.';
        } else if (percentage >= 60) {
            message = 'Tốt! Bạn có kiến thức cơ bản về kinh tế số.';
        } else if (percentage >= 40) {
            message = 'Khá! Bạn cần tìm hiểu thêm về kinh tế số.';
        } else {
            message = 'Hãy đọc thêm tài liệu để hiểu rõ hơn về kinh tế số.';
        }
        
        if (scoreMessage) scoreMessage.textContent = message;
        
        // Show explanations
        if (resultExplanation) {
            resultExplanation.innerHTML = '';
            this.quizData.forEach((question, index) => {
                const userAnswer = this.userAnswers[index];
                const isCorrect = userAnswer === question.correct;
                
                const explanationDiv = document.createElement('div');
                explanationDiv.className = `explanation-item ${isCorrect ? 'correct' : 'incorrect'}`;
                explanationDiv.innerHTML = `
                    <h5>Câu ${index + 1}: ${isCorrect ? '✓' : '✗'}</h5>
                    <p><strong>Câu hỏi:</strong> ${question.question}</p>
                    <p><strong>Đáp án đúng:</strong> ${question.answers[question.correct]}</p>
                    <p><strong>Giải thích:</strong> ${question.explanation}</p>
                `;
                resultExplanation.appendChild(explanationDiv);
            });
        }
    }

    restartQuiz() {
        document.getElementById('quiz-content').style.display = 'block';
        document.getElementById('start-quiz').style.display = 'inline-block';
        document.getElementById('quiz-result').style.display = 'none';
        document.getElementById('restart-quiz').style.display = 'none';
        
        // Reset progress
        const progressBar = document.getElementById('quiz-progress');
        if (progressBar) progressBar.style.width = '0%';
    }

    // ===== ECOSYSTEM GAME FUNCTIONALITY =====
    initializeGameElements() {
        return {
            infrastructure: [
                { id: 'internet', name: 'Mạng Internet', icon: 'fas fa-wifi', impact: 20 },
                { id: 'datacenter', name: 'Trung tâm dữ liệu', icon: 'fas fa-server', impact: 15 },
                { id: 'fiber', name: 'Cáp quang', icon: 'fas fa-network-wired', impact: 18 },
                { id: 'mobile', name: 'Mạng di động 5G', icon: 'fas fa-signal', impact: 22 },
                { id: 'cloud', name: 'Điện toán đám mây', icon: 'fas fa-cloud', impact: 25 }
            ],
            superstructure: [
                { id: 'ecommerce', name: 'Thương mại điện tử', icon: 'fas fa-shopping-cart', impact: 20 },
                { id: 'fintech', name: 'Công nghệ tài chính', icon: 'fas fa-credit-card', impact: 25 },
                { id: 'edtech', name: 'Công nghệ giáo dục', icon: 'fas fa-graduation-cap', impact: 18 },
                { id: 'healthtech', name: 'Y tế số', icon: 'fas fa-heartbeat', impact: 22 },
                { id: 'govtech', name: 'Chính phủ điện tử', icon: 'fas fa-landmark', impact: 20 }
            ]
        };
    }

    initializeEcosystemGame() {
        this.loadGameElements();
        this.setupDragAndDrop();
        
        const resetBtn = document.getElementById('reset-game');
        const hintBtn = document.getElementById('get-hint');
        
        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.resetGame());
        }
        if (hintBtn) {
            hintBtn.addEventListener('click', () => this.showHint());
        }
    }

    loadGameElements() {
        const container = document.getElementById('game-elements');
        if (!container) return;
        
        container.innerHTML = '';
        
        // Add infrastructure elements
        const infraDiv = document.createElement('div');
        infraDiv.className = 'element-category';
        infraDiv.innerHTML = '<h5>Hạ tầng</h5>';
        
        this.gameElements.infrastructure.forEach(element => {
            const elementDiv = this.createGameElement(element, 'infrastructure');
            infraDiv.appendChild(elementDiv);
        });
        
        // Add superstructure elements
        const superDiv = document.createElement('div');
        superDiv.className = 'element-category';
        superDiv.innerHTML = '<h5>Thượng tầng</h5>';
        
        this.gameElements.superstructure.forEach(element => {
            const elementDiv = this.createGameElement(element, 'superstructure');
            superDiv.appendChild(elementDiv);
        });
        
        container.appendChild(infraDiv);
        container.appendChild(superDiv);
    }

    createGameElement(element, category) {
        const div = document.createElement('div');
        div.className = 'game-element';
        div.draggable = true;
        div.dataset.elementId = element.id;
        div.dataset.category = category;
        div.dataset.impact = element.impact;
        
        div.innerHTML = `
            <i class="${element.icon}"></i>
            <span>${element.name}</span>
        `;
        
        div.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', JSON.stringify({
                id: element.id,
                category: category,
                impact: element.impact,
                name: element.name,
                icon: element.icon
            }));
            div.classList.add('dragging');
        });
        
        div.addEventListener('dragend', () => {
            div.classList.remove('dragging');
        });
        
        return div;
    }

    setupDragAndDrop() {
        const dropZones = document.querySelectorAll('.drop-zone');
        
        dropZones.forEach(zone => {
            zone.addEventListener('dragover', (e) => {
                e.preventDefault();
                zone.classList.add('drag-over');
            });
            
            zone.addEventListener('dragleave', () => {
                zone.classList.remove('drag-over');
            });
            
            zone.addEventListener('drop', (e) => {
                e.preventDefault();
                zone.classList.remove('drag-over');
                
                const data = JSON.parse(e.dataTransfer.getData('text/plain'));
                const expectedCategory = zone.dataset.category;
                
                if (data.category === expectedCategory) {
                    this.addElementToZone(zone, data);
                    this.updateBalance();
                } else {
                    this.showFeedback('Yếu tố này không thuộc về khu vực này!', 'error');
                }
            });
        });
    }

    addElementToZone(zone, elementData) {
        // Check if element already exists
        const existing = zone.querySelector(`[data-element-id="${elementData.id}"]`);
        if (existing) return;
        
        const elementDiv = document.createElement('div');
        elementDiv.className = 'placed-element';
        elementDiv.dataset.elementId = elementData.id;
        elementDiv.dataset.impact = elementData.impact;
        
        elementDiv.innerHTML = `
            <i class="${elementData.icon}"></i>
            <span>${elementData.name}</span>
            <button class="remove-element" onclick="this.parentElement.remove(); window.interactiveHandler.updateBalance();">×</button>
        `;
        
        // Clear placeholder text if this is the first element
        if (zone.children.length === 1 && zone.children[0].tagName === 'P') {
            zone.innerHTML = '';
        }
        
        zone.appendChild(elementDiv);
        
        // Remove from available elements
        const originalElement = document.querySelector(`[data-element-id="${elementData.id}"]`);
        if (originalElement && originalElement !== elementDiv) {
            originalElement.style.opacity = '0.5';
            originalElement.draggable = false;
        }
    }

    updateBalance() {
        const infraZone = document.querySelector('[data-category="infrastructure"]');
        const superZone = document.querySelector('[data-category="superstructure"]');
        
        const infraElements = infraZone.querySelectorAll('.placed-element');
        const superElements = superZone.querySelectorAll('.placed-element');
        
        let infraScore = 0;
        let superScore = 0;
        
        infraElements.forEach(el => {
            infraScore += parseInt(el.dataset.impact);
        });
        
        superElements.forEach(el => {
            superScore += parseInt(el.dataset.impact);
        });
        
        const totalScore = infraScore + superScore;
        const balance = totalScore > 0 ? Math.min(100, (Math.min(infraScore, superScore) / Math.max(infraScore, superScore)) * 100) : 0;
        
        const balanceMeter = document.getElementById('balance-meter');
        const balanceText = document.getElementById('balance-text');
        
        if (balanceMeter) {
            balanceMeter.style.width = `${balance}%`;
            balanceMeter.className = `meter-fill ${this.getBalanceClass(balance)}`;
        }
        
        if (balanceText) {
            balanceText.textContent = this.getBalanceMessage(balance, infraScore, superScore);
        }
    }

    getBalanceClass(balance) {
        if (balance >= 80) return 'excellent';
        if (balance >= 60) return 'good';
        if (balance >= 40) return 'fair';
        return 'poor';
    }

    getBalanceMessage(balance, infraScore, superScore) {
        if (balance >= 80) {
            return 'Xuất sắc! Hệ sinh thái của bạn rất cân bằng.';
        } else if (balance >= 60) {
            return 'Tốt! Hệ sinh thái khá cân bằng.';
        } else if (balance >= 40) {
            return 'Cần cải thiện sự cân bằng giữa hạ tầng và thượng tầng.';
        } else if (infraScore === 0 && superScore === 0) {
            return 'Bắt đầu xây dựng hệ sinh thái của bạn!';
        } else if (infraScore > superScore) {
            return 'Cần thêm các yếu tố thượng tầng để cân bằng.';
        } else {
            return 'Cần tăng cường hạ tầng để hỗ trợ thượng tầng.';
        }
    }

    resetGame() {
        const dropZones = document.querySelectorAll('.drop-zone');
        dropZones.forEach(zone => {
            zone.innerHTML = '<p>Kéo các yếu tố ' + (zone.dataset.category === 'infrastructure' ? 'hạ tầng' : 'thượng tầng') + ' vào đây</p>';
        });
        
        // Reset available elements
        document.querySelectorAll('.game-element').forEach(el => {
            el.style.opacity = '1';
            el.draggable = true;
        });
        
        this.updateBalance();
    }

    showHint() {
        const hints = [
            'Hạ tầng là nền tảng, thượng tầng là ứng dụng.',
            'Cần có sự cân bằng giữa hạ tầng và thượng tầng.',
            'Mạng internet và cáp quang là hạ tầng cơ bản.',
            'Fintech và E-commerce cần hạ tầng mạnh để phát triển.',
            'Chính phủ điện tử cần cả hạ tầng và thượng tầng.'
        ];
        
        const randomHint = hints[Math.floor(Math.random() * hints.length)];
        this.showFeedback(randomHint, 'info');
    }

    showFeedback(message, type) {
        // Create or update feedback element
        let feedback = document.querySelector('.game-feedback-message');
        if (!feedback) {
            feedback = document.createElement('div');
            feedback.className = 'game-feedback-message';
            document.querySelector('.game-feedback').appendChild(feedback);
        }
        
        feedback.className = `game-feedback-message ${type}`;
        feedback.textContent = message;
        feedback.style.display = 'block';
        
        setTimeout(() => {
            feedback.style.display = 'none';
        }, 3000);
    }

    // ===== REAL-TIME COUNTERS =====
    initializeRealTimeCounters() {
        this.counters = {
            transactionsPerSecond: { current: 0, target: 1247, increment: 3 },
            newUsersToday: { current: 0, target: 15420, increment: 47 },
            totalValue: { current: 0, target: 2847, increment: 12 },
            mobilePayments: { current: 0, target: 892, increment: 8 }
        };
        
        this.startCounters();
        this.loadInterestingStats();
    }

    startCounters() {
        // Animate counters to their target values
        Object.keys(this.counters).forEach(key => {
            this.animateCounter(key);
        });
        
        // Start real-time updates
        setInterval(() => {
            this.updateCounters();
        }, 1000);
    }

    animateCounter(counterKey) {
        const counter = this.counters[counterKey];
        const element = document.getElementById(this.getCounterElementId(counterKey));
        
        if (!element) return;
        
        const duration = 2000; // 2 seconds
        const steps = 60;
        const stepValue = counter.target / steps;
        let currentStep = 0;
        
        const interval = setInterval(() => {
            currentStep++;
            counter.current = Math.min(counter.target, Math.floor(stepValue * currentStep));
            element.textContent = this.formatCounterValue(counter.current, counterKey);
            
            if (currentStep >= steps) {
                clearInterval(interval);
            }
        }, duration / steps);
    }

    getCounterElementId(counterKey) {
        const mapping = {
            transactionsPerSecond: 'transactions-per-second',
            newUsersToday: 'new-users-today',
            totalValue: 'total-value',
            mobilePayments: 'mobile-payments'
        };
        return mapping[counterKey];
    }

    formatCounterValue(value, counterKey) {
        if (counterKey === 'totalValue') {
            return (value / 1000).toFixed(1) + 'K';
        }
        return value.toLocaleString();
    }

    updateCounters() {
        Object.keys(this.counters).forEach(key => {
            const counter = this.counters[key];
            const element = document.getElementById(this.getCounterElementId(key));
            
            if (!element) return;
            
            // Random fluctuation
            const change = Math.floor(Math.random() * counter.increment * 2) - counter.increment;
            counter.current = Math.max(0, counter.current + change);
            
            element.textContent = this.formatCounterValue(counter.current, key);
        });
    }

    loadInterestingStats() {
        const stats = [
            'Việt Nam có hơn 68 triệu người dùng internet',
            'Thương mại điện tử tăng trưởng 25% mỗi năm',
            'Có hơn 200 startup fintech tại Việt Nam',
            '95% giao dịch ngân hàng được thực hiện online',
            'Ví điện tử được sử dụng bởi 31% dân số'
        ];
        
        const container = document.getElementById('interesting-stats');
        if (!container) return;
        
        stats.forEach((stat, index) => {
            setTimeout(() => {
                const statDiv = document.createElement('div');
                statDiv.className = 'stat-item fade-in';
                statDiv.innerHTML = `<i class="fas fa-chart-bar"></i> ${stat}`;
                container.appendChild(statDiv);
            }, index * 1000);
        });
    }

    // ===== PREDICTION GAME =====
    initializePredictionScenarios() {
        return [
            {
                id: 'ai-adoption',
                title: 'Tỷ lệ doanh nghiệp sử dụng AI',
                current: '15%',
                question: 'Tỷ lệ doanh nghiệp Việt Nam sử dụng AI vào năm 2028?',
                options: ['30%', '45%', '60%', '75%'],
                expertPrediction: 2,
                explanation: 'Chuyên gia dự đoán 60% doanh nghiệp sẽ áp dụng AI do chi phí giảm và công nghệ phổ biến.'
            },
            {
                id: 'digital-payment',
                title: 'Thanh toán số',
                current: '38%',
                question: 'Tỷ lệ thanh toán không tiền mặt vào năm 2028?',
                options: ['55%', '70%', '85%', '95%'],
                expertPrediction: 2,
                explanation: 'Dự kiến 85% giao dịch sẽ không dùng tiền mặt nhờ ví điện tử và QR code.'
            },
            {
                id: 'remote-work',
                title: 'Làm việc từ xa',
                current: '25%',
                question: 'Tỷ lệ nhân viên làm việc từ xa thường xuyên?',
                options: ['35%', '50%', '65%', '80%'],
                expertPrediction: 1,
                explanation: 'Khoảng 50% nhân viên sẽ làm việc từ xa ít nhất 3 ngày/tuần.'
            },
            {
                id: 'ecommerce-growth',
                title: 'Thương mại điện tử',
                current: '8.2%',
                question: 'Tỷ trọng e-commerce trong tổng bán lẻ vào năm 2028?',
                options: ['15%', '22%', '30%', '40%'],
                expertPrediction: 1,
                explanation: 'E-commerce dự kiến chiếm 22% tổng bán lẻ, tăng mạnh từ mức hiện tại.'
            },
            {
                id: 'blockchain-adoption',
                title: 'Ứng dụng Blockchain',
                current: '5%',
                question: 'Tỷ lệ doanh nghiệp sử dụng blockchain vào năm 2028?',
                options: ['12%', '25%', '40%', '55%'],
                expertPrediction: 1,
                explanation: 'Blockchain sẽ được 25% doanh nghiệp áp dụng, chủ yếu trong tài chính và logistics.'
            }
        ];
    }

    initializePredictionGame() {
        this.loadPredictionScenarios();
        
        const submitBtn = document.getElementById('submit-predictions');
        const viewExpertBtn = document.getElementById('view-expert-predictions');
        
        if (submitBtn) {
            submitBtn.addEventListener('click', () => this.submitPredictions());
        }
        if (viewExpertBtn) {
            viewExpertBtn.addEventListener('click', () => this.showExpertPredictions());
        }
    }

    loadPredictionScenarios() {
        const container = document.getElementById('prediction-scenarios');
        if (!container) return;
        
        container.innerHTML = '';
        
        this.predictionScenarios.forEach(scenario => {
            const scenarioDiv = document.createElement('div');
            scenarioDiv.className = 'prediction-scenario';
            scenarioDiv.innerHTML = `
                <div class="scenario-header">
                    <h4>${scenario.title}</h4>
                    <p class="current-value">Hiện tại: ${scenario.current}</p>
                </div>
                <div class="scenario-question">
                    <p>${scenario.question}</p>
                </div>
                <div class="scenario-options">
                    ${scenario.options.map((option, index) => `
                        <label class="prediction-option">
                            <input type="radio" name="prediction-${scenario.id}" value="${index}">
                            <span>${option}</span>
                        </label>
                    `).join('')}
                </div>
            `;
            container.appendChild(scenarioDiv);
        });
    }

    submitPredictions() {
        const userPredictions = {};
        let allAnswered = true;
        
        this.predictionScenarios.forEach(scenario => {
            const selected = document.querySelector(`input[name="prediction-${scenario.id}"]:checked`);
            if (selected) {
                userPredictions[scenario.id] = parseInt(selected.value);
            } else {
                allAnswered = false;
            }
        });
        
        if (!allAnswered) {
            alert('Vui lòng trả lời tất cả các câu hỏi!');
            return;
        }
        
        this.showPredictionResults(userPredictions);
    }

    showPredictionResults(userPredictions) {
        const resultsContainer = document.getElementById('prediction-results');
        const comparisonDiv = resultsContainer.querySelector('.results-comparison');
        
        let correctPredictions = 0;
        
        comparisonDiv.innerHTML = '';
        
        this.predictionScenarios.forEach(scenario => {
            const userChoice = userPredictions[scenario.id];
            const expertChoice = scenario.expertPrediction;
            const isCorrect = userChoice === expertChoice;
            
            if (isCorrect) correctPredictions++;
            
            const comparisonItem = document.createElement('div');
            comparisonItem.className = `comparison-item ${isCorrect ? 'correct' : 'incorrect'}`;
            comparisonItem.innerHTML = `
                <h5>${scenario.title} ${isCorrect ? '✓' : '✗'}</h5>
                <div class="comparison-details">
                    <div class="user-prediction">
                        <strong>Dự đoán của bạn:</strong> ${scenario.options[userChoice]}
                    </div>
                    <div class="expert-prediction">
                        <strong>Dự báo chuyên gia:</strong> ${scenario.options[expertChoice]}
                    </div>
                    <div class="explanation">
                        <strong>Giải thích:</strong> ${scenario.explanation}
                    </div>
                </div>
            `;
            comparisonDiv.appendChild(comparisonItem);
        });
        
        // Update accuracy score
        const accuracy = (correctPredictions / this.predictionScenarios.length) * 100;
        const accuracyFill = document.getElementById('accuracy-fill');
        const accuracyText = document.getElementById('accuracy-text');
        
        if (accuracyFill) {
            accuracyFill.style.width = `${accuracy}%`;
        }
        if (accuracyText) {
            accuracyText.textContent = `${accuracy.toFixed(0)}% chính xác`;
        }
        
        resultsContainer.style.display = 'block';
        
        // Scroll to results
        resultsContainer.scrollIntoView({ behavior: 'smooth' });
    }

    showExpertPredictions() {
        this.predictionScenarios.forEach(scenario => {
            const expertOption = document.querySelector(`input[name="prediction-${scenario.id}"][value="${scenario.expertPrediction}"]`);
            if (expertOption) {
                expertOption.checked = true;
                expertOption.closest('.prediction-option').classList.add('expert-choice');
            }
        });
    }

    // ===== INTERACTIVE TIMELINE =====
    initializeTimelineData() {
        return [
            {
                year: 1997,
                title: 'Internet đầu tiên',
                description: 'Việt Nam chính thức kết nối Internet',
                details: 'Việt Nam chính thức kết nối với Internet quốc tế, đánh dấu bước đầu tiên trong hành trình số hóa.',
                icon: 'fas fa-globe'
            },
            {
                year: 2000,
                title: 'Luật Giao dịch điện tử',
                description: 'Ban hành khung pháp lý đầu tiên',
                details: 'Luật Giao dịch điện tử được ban hành, tạo nền tảng pháp lý cho phát triển kinh tế số.',
                icon: 'fas fa-gavel'
            },
            {
                year: 2005,
                title: 'Chính phủ điện tử',
                description: 'Khởi động dự án chính phủ điện tử',
                details: 'Việt Nam bắt đầu triển khai các dịch vụ công trực tuyến, hiện đại hóa bộ máy hành chính.',
                icon: 'fas fa-landmark'
            },
            {
                year: 2010,
                title: 'Bùng nổ di động',
                description: 'Smartphone phổ biến rộng rãi',
                details: 'Smartphone trở nên phổ biến, tạo nền tảng cho các ứng dụng di động và dịch vụ số.',
                icon: 'fas fa-mobile-alt'
            },
            {
                year: 2015,
                title: 'Fintech khởi nghiệp',
                description: 'Làn sóng startup fintech',
                details: 'Các startup fintech như MoMo, ZaloPay ra đời, thay đổi cách thức thanh toán của người Việt.',
                icon: 'fas fa-credit-card'
            },
            {
                year: 2018,
                title: 'Thương mại điện tử',
                description: 'E-commerce bùng nổ',
                details: 'Shopee, Tiki, Lazada phát triển mạnh, thay đổi thói quen mua sắm của người tiêu dùng.',
                icon: 'fas fa-shopping-cart'
            },
            {
                year: 2020,
                title: 'Chuyển đổi số',
                description: 'Chương trình chuyển đổi số quốc gia',
                details: 'Chính phủ ban hành Chương trình chuyển đổi số quốc gia, đặt mục tiêu trở thành nước phát triển.',
                icon: 'fas fa-digital-tachograph'
            },
            {
                year: 2023,
                title: 'AI và Blockchain',
                description: 'Ứng dụng công nghệ tiên tiến',
                details: 'AI và Blockchain được ứng dụng rộng rãi trong nhiều lĩnh vực từ tài chính đến y tế.',
                icon: 'fas fa-robot'
            }
        ];
    }

    initializeTimeline() {
        this.loadTimeline();
    }

    loadTimeline() {
        const container = document.getElementById('interactive-timeline');
        if (!container) return;
        
        container.innerHTML = '';
        
        this.timelineData.forEach((item, index) => {
            const timelineItem = document.createElement('div');
            timelineItem.className = 'timeline-item';
            timelineItem.innerHTML = `
                <div class="timeline-marker">
                    <i class="${item.icon}"></i>
                </div>
                <div class="timeline-content">
                    <div class="timeline-year">${item.year}</div>
                    <h4 class="timeline-title">${item.title}</h4>
                    <p class="timeline-description">${item.description}</p>
                </div>
            `;
            
            timelineItem.addEventListener('click', () => this.showTimelineDetails(item));
            container.appendChild(timelineItem);
            
            // Add animation delay
            setTimeout(() => {
                timelineItem.classList.add('animate-in');
            }, index * 200);
        });
    }

    showTimelineDetails(item) {
        const detailsContainer = document.getElementById('timeline-details');
        if (!detailsContainer) return;
        
        // Remove active class from all timeline items
        document.querySelectorAll('.timeline-item').forEach(el => {
            el.classList.remove('active');
        });
        
        // Add active class to clicked item
        event.currentTarget.classList.add('active');
        
        detailsContainer.innerHTML = `
            <div class="detail-card active">
                <div class="detail-header">
                    <i class="${item.icon}"></i>
                    <div>
                        <h4>${item.title}</h4>
                        <span class="detail-year">${item.year}</span>
                    </div>
                </div>
                <div class="detail-content">
                    <p>${item.details}</p>
                </div>
            </div>
        `;
        
        // Smooth scroll to details
        detailsContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait for components to be loaded
    document.addEventListener('componentsLoaded', () => {
        setTimeout(() => {
            window.interactiveHandler = new InteractiveHandler();
        }, 500);
    });
});

export default InteractiveHandler;