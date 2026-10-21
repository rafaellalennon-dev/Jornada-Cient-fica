/* ==========================================================================
   1. BANCO DE DADOS DAS PERGUNTAS (Ciências - 6º Ano)
   ========================================================================== */
const quizQuestions = [
    {
        question: "Qual órgão do corpo humano é o principal responsável pela filtração do sangue e produção da urina?",
        options: [
            "Fígado",
            "Rins",
            "Pulmões",
            "Estômago"
        ],
        correct: 1 // Índice da resposta correta (0 = Fígado, 1 = Rins...)
    },
    {
        question: "Como é chamada a camada de ar que envolve a Terra e nos protege dos raios solares nocivos?",
        options: [
            "Litosfera",
            "Hidrosfera",
            "Atmosfera",
            "Biosfera"
        ],
        correct: 2
    },
    {
        question: "No estudo dos ecossistemas, as plantas são classificadas como seres autótrofos porque:",
        options: [
            "Se alimentam de outros animais.",
            "Decompõem a matéria orgânica morta.",
            "Produzem seu próprio alimento através da fotossíntese.",
            "Consomem apenas frutos e sementes."
        ],
        correct: 2
    },
    {
        question: "Qual das opções abaixo representa uma mistura HETEROGÊNEA (onde é possível identificar mais de uma fase)?",
        options: [
            "Água com sal completamente dissolvido",
            "Ar atmosférico filtrado",
            "Água e óleo",
            "Aço inoxidável"
        ],
        correct: 2
    },
    {
        question: "Qual é a principal função do Sistema Circulatório no organismo?",
        options: [
            "Captar oxigênio do ar e eliminar gás carbônico.",
            "Transportar nutrientes, oxigênio e hormônios pelo corpo.",
            "Sustentar e dar formato ao corpo humano.",
            "Comandar os movimentos voluntários e reflexos."
        ],
        correct: 1
    }
];

/* ==========================================================================
   2. VARIÁVEIS DE ESTADO DO JOGO
   ========================================================================== */
let currentQuestionIndex = 0;
let score = 0;
let playerName = "";
const pointsPerQuestion = 20;

/* ==========================================================================
   3. SELEÇÃO DOS ELEMENTOS DO DOM (HTML)
   ========================================================================== */
// Telas
const screenWelcome = document.getElementById('screen-welcome');
const screenQuiz = document.getElementById('screen-quiz');
const screenResult = document.getElementById('screen-result');

// Elementos de Entrada e Exibição do Jogador
const inputPlayerName = document.getElementById('player-name');
const displayPlayerName = document.getElementById('player-display');
const displayScore = document.getElementById('score-display');

// Elementos do Quiz
const displayQuestionNumber = document.getElementById('question-number');
const progressFill = document.getElementById('progress-fill');
const displayQuestionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const feedbackMessage = document.getElementById('feedback-message');

// Elementos de Resultado
const resultIcon = document.getElementById('result-icon');
const resultTitle = document.getElementById('result-title');
const resultPlayer = document.getElementById('result-player');
const finalScoreDisplay = document.getElementById('final-score');
const resultMessage = document.getElementById('result-message');

// Botões
const btnStart = document.getElementById('btn-start');
const btnNext = document.getElementById('btn-next');
const btnRestart = document.getElementById('btn-restart');

/* ==========================================================================
   4. FUNÇÕES DE NAVEGAÇÃO DE TELAS
   ========================================================================== */
function showScreen(screenToShow) {
    // Esconde todas as telas
    screenWelcome.classList.remove('active');
    screenQuiz.classList.remove('active');
    screenResult.classList.remove('active');

    // Ativa apenas a tela solicitada
    screenToShow.classList.add('active');
}

/* ==========================================================================
   5. LÓGICA DO JOGO
   ========================================================================== */

// Iniciar o jogo
function startGame() {
    const nameValue = inputPlayerName.value.trim();
    playerName = nameValue !== "" ? nameValue : "Cientista Anônimo";

    // Reseta estado
    currentQuestionIndex = 0;
    score = 0;

    // Atualiza cabeçalho do quiz
    displayPlayerName.innerHTML = `Jogador: <strong>${playerName}</strong>`;
    displayScore.innerHTML = `Pontos: <strong>${score}</strong>`;

    showScreen(screenQuiz);
    loadQuestion();
}

// Carregar pergunta atual
function loadQuestion() {
    const currentQuestion = quizQuestions[currentQuestionIndex];

    // Atualiza indicadores de progresso
    displayQuestionNumber.innerText = `Pergunta ${currentQuestionIndex + 1} de ${quizQuestions.length}`;
    const progressPercent = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    progressFill.style.width = `${progressPercent}%`;

    // Atualiza texto da pergunta
    displayQuestionText.innerText = currentQuestion.question;

    // Limpa opções e feedbacks anteriores
    optionsContainer.innerHTML = "";
    feedbackMessage.classList.add('hidden');
    btnNext.classList.add('hidden');

    // Gera botões de opção dinamicamente
    currentQuestion.options.forEach((optionText, index) => {
        const button = document.createElement('button');
        button.classList.add('option-btn');
        button.innerText = `${String.fromCharCode(65 + index)}) ${optionText}`; // A), B), C), D)
        button.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(button);
    });
}

// Processar a escolha da opção
function selectOption(selectedIndex) {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    const optionButtons = optionsContainer.querySelectorAll('.option-btn');

    // Desabilita todos os botões para evitar múltiplos cliques
    optionButtons.forEach(btn => btn.disabled = true);

    if (selectedIndex === currentQuestion.correct) {
        // Resposta Correta
        score += pointsPerQuestion;
        displayScore.innerHTML = `Pontos: <strong>${score}</strong>`;
        optionButtons[selectedIndex].classList.add('correct');

        feedbackMessage.innerText = "✨ Parabéns! Resposta correta!";
        feedbackMessage.className = "feedback correct";
    } else {
        // Resposta Incorreta
        optionButtons[selectedIndex].classList.add('wrong');
        optionButtons[currentQuestion.correct].classList.add('correct');

        feedbackMessage.innerText = "❌ Ops, resposta incorreta!";
        feedbackMessage.className = "feedback wrong";
    }

    feedbackMessage.classList.remove('hidden');
    btnNext.classList.remove('hidden');
}

// Avançar para a próxima pergunta ou finalizar
function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {
        loadQuestion();
    } else {
        finishGame();
    }
}

// Finalizar o jogo e mostrar resultados
function finishGame() {
    showScreen(screenResult);

    resultPlayer.innerText = `Parabéns pela dedicação, ${playerName}!`;
    finalScoreDisplay.innerText = `${score} / 100`;

    // Feedback baseado na pontuação
    if (score === 100) {
        resultIcon.innerText = "🏆";
        resultTitle.innerText = "Cientista Mestre!";
        resultMessage.innerText = "Incrível! Você acertou todas as questões! Você domina Ciências!";
    } else if (score >= 60) {
        resultIcon.innerText = "🌟";
        resultTitle.innerText = "Muito Bem!";
        resultMessage.innerText = "Ótimo resultado! Você demonstrou um ótimo conhecimento!";
    } else {
        resultIcon.innerText = "🧪";
        resultTitle.innerText = "Continue Praticando!";
        resultMessage.innerText = "Bom esforço! Que tal revisar o assunto e tentar de novo?";
    }
}

/* ==========================================================================
   6. EVENT LISTENERS (EVENTOS DE CLIQUE)
   ========================================================================== */
btnStart.addEventListener('click', startGame);
btnNext.addEventListener('click', nextQuestion);
btnRestart.addEventListener('click', () => {
    inputPlayerName.value = "";
    showScreen(screenWelcome);
});
