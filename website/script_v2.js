// Puzzle Data
const puzzles = {
    1: {
        title: "WIECZORNE CZYTANIE",
        intro: `Za oknem prószy śnieg, a w twoim pokoju unosi się zapach mandarynek i goździków. Właśnie kończysz pakować ostatnie prezenty, nucąc cicho kolędę, gdy słyszysz delikatne pukanie do drzwi.

– Proszę! – wołasz, odkładając wstążkę.

W drzwiach staje Babcia. Wygląda na lekko zatroskaną, a w rękach trzyma ciężki, oprawiony w skórę przedmiot. – Przepraszam, że przeszkadzam, kochanie – zaczyna ciepłym głosem. – Ale mam straszny kłopot. Kompletnie wyleciało mi z głowy, co miałam kupić dla małej Zuzi pod choinkę.

Podchodzi bliżej i wręcza ci starą, rodzinną Biblię. Księga wygląda na wiekową.

– Pamiętam, że lata temu zaznaczyłam sobie w niej pewien pomysł – Babcia wzdycha, poprawiając okulary. – Miało mi to przypomnieć o idealnym prezencie, ale wzrok już nie ten i nic z tego nie widzę.`,
        visual: `<div style="font-size: 20px; margin-bottom: 20px;">📖 <a href="assets/domowa_biblia.pdf" target="_blank" style="color: #4CAF50; text-decoration: none; border-bottom: 1px dashed #4CAF50;">Otwórz Starą Biblię (PDF)</a></div>`,
        answers: ["doll", "lalka"],
        explanation: "Zgięte rogi pokazują słowo DOLL."
    },
    2: {
        title: "LABIRYNT",
        intro: `Po uporaniu się z zagadką Babci, schodzisz na dół, gdzie panuje radosny harmider. Na środku salonu, w otoczeniu sterty klocków i resztek papieru pakowego, siedzi Twój ulubiony kuzyn.

Energia go rozpiera – biega wzrokiem od jednej zabawki do drugiej, a Ty zastanawiasz się gorączkowo: „Co kupić komuś, kto chyba ma już wszystko?”. Kredki? Ma ich setki. Gra planszowa? Zgubi pionki w pięć minut.

– Hej! Założę się, że tego nie rozwiążesz! – kuzyn doskakuje do Ciebie, wymachując kartką papieru wyrwaną z zeszytu.

Na kartce widnieje gigantyczny, skomplikowany labirynt narysowany kredkami.

– To mapa do Bazy Świętego Mikołaja – tłumaczy z przejęciem, gryząc końcówkę ołówka. – Jeśli znajdziesz drogę od startu do mety, dowiesz się, co najbardziej chciałbym dostać. Ale uważaj, pełno tam ślepych zaułków!`,
        visual: `<div style="display: flex; justify-content: center;"><img src="assets/maze_output.png" alt="Maze" style="max-width: 100%; border: 2px solid #4CAF50;"></div>`,
        answers: ["cars", "auta", "samochody"],
        explanation: "Labirynt ukazuje hasło CARS."
    },
    3: {
        title: "SZACHY",
        intro: `Szukając chwili wytchnienia od świątecznego gwaru, zaglądasz do cichego gabinetu Dziadka. W kominku żarzy się ostatnie drewno, a na mahoniowym biurku stoi tajemnicza, metalowa kasetka.

Zamiast zwykłego kluczyka, kasetka posiada skomplikowaną kłódkę cyfrową. Aby ją otworzyć, trzeba wprowadzić aż 20-cyfrowy kod.

Obok kasetki leży rozłożona szachownica oraz pożółkły notatnik z narysowanymi diagramami sytuacji na planszy. Na pierwszej stronie widnieje odręczny dopisek Dziadka:

„Pamiętaj, moje dziecko, świat jest jak szachownica. Wszystko leży u *podstawy* 64. To ona wyznacza granice, ale to Twój spryt decyduje o zwycięstwie.”

Liczba 64 wydaje się tutaj kluczowa – to liczba pól na szachownicy, ale Dziadek wyraźnie zaznaczył ją w tekście grubą kreską, jakby chciał, żebyś o niej nie zapomniał podczas rozwiązywania zagadki.

Przeglądasz notatnik. Każda strona to inna sytuacja szachowa, w której musisz wskazać najlepszy możliwy ruch. Wygląda na to, że sekwencja tych mistrzowskich posunięć przełoży się na szyfr do kłódki.`,
        visual: `<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px;">
            <img src="assets/chess_1.png" style="width: 100%; border: 1px solid #4CAF50;">
            <img src="assets/chess_2.png" style="width: 100%; border: 1px solid #4CAF50;">
            <img src="assets/chess_3.png" style="width: 100%; border: 1px solid #4CAF50;">
            <img src="assets/chess_4.png" style="width: 100%; border: 1px solid #4CAF50;">
        </div>
        <div style="text-align: center; margin-top: 10px;">
            <a href="https://en.wikipedia.org/wiki/Algebraic_notation_(chess)" target="_blank" style="color: #4CAF50; text-decoration: underline;">Szachowa notacja algebraiczna</a>
        </div>`,
        answers: ["30561331591032532756"],
        explanation: "Kod otworzył kasetkę! W środku znajdujesz stary list i zdjęcie."
    },
    4: {
        title: "DŹWIĘKI",
        intro: "Otwórz plik audio i zdekoduj go.",
        visual: `<div style="display: flex; justify-content: center; margin-top: 20px;">
            <audio controls style="width: 100%; max-width: 400px; border: 2px solid #33ff00; border-radius: 0;">
                <source src="assets/morse_output.wav" type="audio/wav">
                Your browser does not support the audio element.
            </audio>
        </div>`,
        answers: ["lego"],
        explanation: "SIGNAL_DECODED: LEGO."
    }
};

// Main Logic
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    // Check if we are on the puzzle page
    if (path.includes('puzzle.html')) {
        loadPuzzle();

        // Setup event listeners
        document.getElementById('submit-btn').addEventListener('click', checkAnswer);
        document.getElementById('answer-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') checkAnswer();
        });
    } else if (path.includes('index.html') || path.endsWith('/')) {
        loadLevelList();
    }
});

function loadPuzzle() {
    const urlParams = new URLSearchParams(window.location.search);
    const puzzleId = urlParams.get('id');
    const puzzle = puzzles[puzzleId];

    if (!puzzle) {
        document.getElementById('puzzle-container').innerHTML = '<h1 class="glitch-text">ERROR: MODULE NOT FOUND</h1><p>Returning to root...</p>';
        setTimeout(() => window.location.href = 'index.html', 3000);
        return;
    }

    // Render content
    document.getElementById('puzzle-id-display').textContent = `MODULE_LOADED: [${String(puzzleId).padStart(2, '0')}]`;
    document.getElementById('puzzle-title').textContent = puzzle.title;
    document.getElementById('puzzle-intro').textContent = puzzle.intro;
    document.getElementById('puzzle-media').innerHTML = puzzle.visual;

    // Typewriter effect for intro (simple version)
    // We could add a real char-by-char effect here if desired
}

function loadLevelList() {
    const levelList = document.getElementById('level-list');
    if (!levelList) return;

    levelList.innerHTML = ''; // Clear existing items

    Object.keys(puzzles).forEach(id => {
        const puzzle = puzzles[id];
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `puzzle.html?id=${id}`;
        a.className = 'level-link';
        a.textContent = `[${String(id).padStart(2, '0')}] ${puzzle.title}`;
        li.appendChild(a);
        levelList.appendChild(li);
    });
}

function checkAnswer() {
    const urlParams = new URLSearchParams(window.location.search);
    const puzzleId = urlParams.get('id');
    const puzzle = puzzles[puzzleId];

    const inputElement = document.getElementById('answer-input');
    const feedbackElement = document.getElementById('feedback-display');
    const userGuess = inputElement.value.trim().toLowerCase();

    if (!userGuess) return;

    const isCorrect = puzzle.answers.some(answer => userGuess.includes(answer));

    if (isCorrect) {
        feedbackElement.textContent = `>> SUCCESS: ${puzzle.explanation}`;
        feedbackElement.className = "feedback-msg correct";
        inputElement.disabled = true;
    } else {
        feedbackElement.textContent = ">> ERROR: INCORRECT INPUT. RETRY.";
        feedbackElement.className = "feedback-msg incorrect";
        inputElement.value = "";
        inputElement.focus();
    }
}
