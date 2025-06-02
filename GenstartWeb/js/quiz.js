// Quiz spørgsmål (opdateret til Genstart-tema)
if (typeof questions === 'undefined') {
    var questions = [
        {
            question: "Hvad bør du gøre, før du smider et stykke gammel elektronik ud?",
            options: [
                "Smide det i husholdningsaffaldet",
                "Undersøge om det kan repareres eller genbruges",
                "Aflevere det til supermarkedet",
                "Begrave det i haven"
            ],
            correct: 1,
            feedback: "Genbrug først! Mange elektronikdele kan genanvendes eller bruges til reservedele."
        },
        {
            question: "Hvorfor er det vigtigt at genbruge elektronik?",
            options: [
                "Fordi det er gratis",
                "Fordi elektronik indeholder værdifulde og sjældne materialer",
                "Fordi det fylder for meget i skraldespanden",
                "Fordi det er farligt at bruge gammelt udstyr"
            ],
            correct: 1,
            feedback: "Elektronik indeholder materialer som guld, kobber og sjældne jordarter – ressourcer vi skal passe på!"
        },
        {
            question: "Hvad er e-affald (e-waste)?",
            options: [
                "Elektroniske varer der er blevet opdateret",
                "Affald der lugter af strøm",
                "Ubrugelig elektronik som skal bortskaffes korrekt",
                "Madvarer opbevaret i køleskab"
            ],
            correct: 2,
            feedback: "E-affald dækker over elektroniske produkter, som ikke længere bruges – og skal håndteres miljøvenligt."
        },
        {
            question: "Hvilken mærkning kan indikere, at en elektronikdel kan genanvendes?",
            options: [
                "Et grønt hjerte",
                "CE-mærket",
                "Tre grønne pile i en trekant (genbrugssymbol)",
                "Et rødt kryds"
            ],
            correct: 2,
            feedback: "Genbrugssymbolet viser, at produktet er designet med bæredygtighed i tankerne og kan genbruges."
        },
        {
            question: "Hvad bør du gøre, før du afleverer din gamle mobil til genbrug?",
            options: [
                "Slette dine data og tage backup",
                "Skille den ad helt selv",
                "Kaste den i containeren uden sortering",
                "Lægge den i papircontaineren"
            ],
            correct: 0,
            feedback: "Det er vigtigt at beskytte dine personlige data, inden du afleverer mobilen til genbrug."
        },
        {
            question: "Hvad er Genstart?",
            options: [
                "Et nyt mærke for mobiltelefoner",
                "Et initiativ for at fremme genbrug og reparation af elektronik",
                "Et videospil om affald",
                "En streamingtjeneste for dokumentarer"
            ],
            correct: 1,
            feedback: "Genstart hjælper med at fremme viden om genbrug og cirkulær økonomi inden for elektronik."
        },
        {
            question: "Hvilket værktøj bruger man typisk til at åbne en bærbar computer?",
            options: [
                "Hammer",
                "Stjerneskruetrækker",
                "Skruetvinge",
                "Tænger"
            ],
            correct: 1,
            feedback: "Elektronik kræver præcise værktøjer – stjerneskruetrækkere og små bits er ofte nødvendige."
        },
        {
            question: "Hvordan bidrager du til en grønnere fremtid ved at bruge Genstart-appen?",
            options: [
                "Ved at spille quizzer og vinde præmier",
                "Ved at lære om reparation, genbrug og affaldshåndtering",
                "Ved at slette dine gamle filer",
                "Ved at få gratis elektronik"
            ],
            correct: 1,
            feedback: "Genstart lærer dig at tage ansvar for din elektronik og vælge bæredygtige løsninger."
        }
    ];
}


let currentQuestionIndex = 0;
let timeLeft = 30; // Starttid for nedtælling
let countdown;
let correctAnswersCount = 0; // Tæller for rigtige svar
let timeChange = 0; // Variabel til at holde styr på tidsændringen

// Funktion til at nulstille quizzen
function resetQuiz() {
    currentQuestionIndex = 0;
    correctAnswersCount = 0;
    timeLeft = 30;
    clearInterval(countdown); // Stop tidligere timer, hvis en er i gang
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('home-container').classList.add('active'); // Vis forsiden igen
}

// Start quizzen
function startQuiz() {
    resetQuiz(); // Nulstil quiz, før du starter en ny runde
    document.getElementById('home-container').classList.remove('active');
    document.getElementById('quiz-container').style.display = 'block'; // Vis quiz-container
    document.getElementById('progress-container').style.display = 'block'; // Vis progress bar
    document.getElementById('result').style.display = 'none'; // Skjul resultattavlen
    document.getElementById('home-btn').style.display = 'none'; // Skjul knappen til forsiden
    document.getElementById('next-btn').style.display = 'none'; // Skjul Næste knap ved start
    startTimer(); // Start timeren
    showQuestion(); // Vis det første spørgsmål
    timeChange = 0; // Reset timeChange til 0
}

// Start nedtælling
function startTimer() {
    const timerCircle = document.querySelector('.timer-circle circle');
    const radius = 45; // Radius af cirklen
    const circumference = 2 * Math.PI * radius; // Beregn cirkelens omkreds
    timerCircle.setAttribute('stroke-dasharray', circumference);
    timerCircle.setAttribute('stroke-dashoffset', circumference); // Start med fuld cirkel

    document.getElementById('time-text').textContent = timeLeft; // Vis initial tid i cirklen

    countdown = setInterval(() => {
        timeLeft--;
        document.getElementById('time-text').textContent = timeLeft; // Opdater teksten i cirklen

        const offset = circumference - (timeLeft / 30) * circumference; // Beregn ny offset baseret på den tilbageværende tid
        timerCircle.setAttribute('stroke-dashoffset', offset); // Opdater cirkelens offset

        if (timeLeft <= 0) {
            clearInterval(countdown);
            showCompletion(); // Gå til completion hvis tiden løber ud
        }
    }, 1000);
}

// Vis spørgsmål
function showQuestion() {
    const questionElement = document.getElementById('question');
    const optionsContainer = document.getElementById('options-container');
    const feedbackElement = document.getElementById('feedback');
    const progressBar = document.getElementById('progress-bar');

    const currentQuestion = questions[currentQuestionIndex];

    // Opdater spørgsmål og feedback
    questionElement.innerText = currentQuestion.question;
    feedbackElement.innerText = '';
    document.getElementById('next-btn').style.display = 'none'; // Skjul Næste knap indtil spørgsmålet er besvaret

    // Opdater progress bar
    const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = progressPercentage + '%';

    // Fjern gamle knapper
    optionsContainer.innerHTML = '';

    // Tilføj nye knapper til hvert svar
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.innerText = option;
        button.onclick = () => checkAnswer(index, button);
        optionsContainer.appendChild(button);
    });
}

// Tjek svar
function checkAnswer(selectedIndex, button) {
    const currentQuestion = questions[currentQuestionIndex];
    const buttons = document.getElementById('options-container').children;
    const feedbackElement = document.getElementById('feedback');
    const timeChangeElement = document.getElementById('time-change'); // Hent det nye element til tidændringer

    // Vis feedback-sektionen
    feedbackElement.style.display = 'block'; // Sørg for feedback er synlig

    // Nulstil feedback
    feedbackElement.classList.remove('correct-feedback', 'incorrect-feedback');
    feedbackElement.innerText = ''; // Tøm feedback
    timeChangeElement.style.display = 'none'; // Skjul tidændringsbeskeden i starten

    // Kontrollér om svaret er korrekt
    if (selectedIndex === currentQuestion.correct) {
        button.classList.add('correct');
        feedbackElement.innerText = "Korrekt! " + currentQuestion.feedback;
        correctAnswersCount++; // Incrementer tælleren for rigtige svar
        timeLeft += 3; // Tilføj 3 sekunder ved korrekt svar
        timeChange += 3; // Opdater tidændring

        // Opdater tidændringsbesked
        timeChangeElement.innerText = `+${3} sekunder tilføjet!`; // Vis tid tilføjet
        timeChangeElement.style.color = '#4caf50'; // Grøn farve for tilføjet tid
        timeChangeElement.style.display = 'block'; // Vis beskeden

        // Tilføj grøn feedback baggrund
        feedbackElement.classList.add('correct-feedback'); // Tilføj korrekt farveknap

    } else {
        button.classList.add('incorrect');
        buttons[currentQuestion.correct].classList.add('correct');
        feedbackElement.innerText = "Forkert! " + currentQuestion.feedback;
        timeLeft -= 5; // Træk 5 sekunder ved forkert svar
        timeChange -= 5; // Opdater tidændring

        // Opdater tidændringsbesked
        timeChangeElement.innerText = `${5} sekunder trukket!`; // Vis tid trukket
        timeChangeElement.style.color = '#f44336'; // Rød farve for trukket tid
        timeChangeElement.style.display = 'block'; // Vis beskeden

        // Tilføj rød feedback baggrund
        feedbackElement.classList.add('incorrect-feedback'); // Tilføj forkertfarve knap
    }

    // Deaktiver knapper for at forhindre flere klik
    Array.from(buttons).forEach(btn => btn.disabled = true);

    // Stop timeren
    clearInterval(countdown);

    // Vis knappen "Næste"
    document.getElementById('next-btn').style.display = 'block';
}

// Gå til næste spørgsmål
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
        document.getElementById('feedback').style.display = 'none'; // Skjul feedback
        document.getElementById('time-change').style.display = 'none';
        startTimer(); // Timeren fortsætter fra den tid, den var på.
    } else {
        showCompletion();
    }
}

// Vis resultattavle
function showCompletion() {
    clearInterval(countdown); // Stop timeren
    document.getElementById('question').innerText = "Quiz afsluttet! Tak for din deltagelse.";
    document.getElementById('options-container').innerHTML = '';
    document.getElementById('feedback').innerText = '';
    document.getElementById('next-btn').style.display = 'none';

    // Vis resultattavle
    const resultElement = document.getElementById('result');
    resultElement.innerText = `Du havde ${correctAnswersCount} rigtige svar ud af ${questions.length}.`;
    resultElement.style.display = 'block'; // Vis resultattavlen
    document.getElementById('feedback').style.display = 'none'; // Skjul feedback

    // Vis knappen til at gå tilbage til forsiden
    document.getElementById('home-btn').style.display = 'block';
}

// Gå tilbage til forsiden
function goToHome() {
    resetQuiz();
}
