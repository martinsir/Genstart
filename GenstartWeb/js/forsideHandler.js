document.addEventListener("DOMContentLoaded", function () {
    console.log("DOMContentLoaded event fired");

    // Funktion til sekventielt at indlæse billeder
    const images = document.querySelectorAll('.button-item img');

    function loadImageSequentially(index) {
        if (index >= images.length) return;

        const img = images[index];
        img.addEventListener('load', () => {
            img.classList.add('loaded'); // Tilføj klassen 'loaded' når billedet er indlæst
            loadImageSequentially(index + 1);
        });
        img.addEventListener('error', () => {
            console.error(`Fejl ved indlæsning af billede: ${img.src}`); // Log en fejl hvis billede ikke kan indlæses
            loadImageSequentially(index + 1);
        });
        if (img.complete) {
            img.classList.add('loaded'); // Tilføj klassen 'loaded' hvis billedet allerede er indlæst
            loadImageSequentially(index + 1);
        }
    }

    loadImageSequentially(0); // Start indlæsning af billeder fra første indeks

    // Event listener for quiz-knappen (med null check)
  const quizButton = document.getElementById("start-quiz");
if (quizButton) {
    quizButton.addEventListener("click", function () {
        const loadingScreen = document.getElementById("loading-screen");
        if (loadingScreen) loadingScreen.style.display = "flex";

        const quizPath = location.pathname.includes("/pages/") ? "../js/quiz.js" : "js/quiz.js";
        loadScript(quizPath, function () {
            if (loadingScreen) loadingScreen.style.display = "none";
            startQuiz();
        });
    });
} else {
    console.log("Quiz button not found, skipping quiz initialization.");
}


    // Funktion til at indlæse eksterne JavaScript-filer asynkront
    function loadScript(url, callback) {
        let script = document.createElement("script");
        script.type = "text/javascript";
        script.src = url;
        script.async = true;
        script.onload = function () {
            console.log(`Script ${url} indlæst med succes`);
            callback();
        };
        script.onerror = function () {
            alert('Kunne ikke indlæse quiz.js. Tjek filstien.');
            const loadingScreen = document.getElementById("loading-screen");
            if (loadingScreen) loadingScreen.style.display = "none"; // Skjul loading-skærm hvis indlæsning fejler
        };
        document.head.appendChild(script); // Tilføj scriptet til head-sektionen
    }

    // Swipe-funktionalitet til navbar
    window.addEventListener("load", function () {
        console.log("Window fully loaded");

        const navbar = document.querySelector('.navbar');
        const leftArrow = document.querySelector('.left-arrow');

        if (navbar) {
            let startX, scrollLeft, isDown = false;

            // Mus-baserede swipe events (til desktop)
            navbar.addEventListener('mousedown', (e) => {
                isDown = true;
                startX = e.pageX - navbar.offsetLeft;
                scrollLeft = navbar.scrollLeft;
            });

            navbar.addEventListener('mouseleave', () => {
                isDown = false;
            });

            navbar.addEventListener('mouseup', () => {
                isDown = false;
            });

            navbar.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - navbar.offsetLeft;
                const walk = (x - startX) * 2; // Scroll hastighed
                navbar.scrollLeft = scrollLeft - walk;
                updateArrows();
            });

            // Touch-baserede swipe events (til mobil)
            navbar.addEventListener('touchstart', (e) => {
                isDown = true;
                startX = e.touches[0].pageX - navbar.offsetLeft;
                scrollLeft = navbar.scrollLeft;
            });

            navbar.addEventListener('touchend', () => {
                isDown = false;
            });

            navbar.addEventListener('touchmove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.touches[0].pageX - navbar.offsetLeft;
                const walk = (x - startX) * 2; // Scroll hastighed
                navbar.scrollLeft = scrollLeft - walk;
                updateArrows();
            });

            // Blink venstre pil ved indlæsning og skjul efter 3 sekunder
            if (leftArrow) {
                setTimeout(() => {
                    leftArrow.style.opacity = '0'; // Skjul venstre pil efter 3 sekunder
                }, 3000);
            }

            // Funktion til at opdatere pilens synlighed baseret på scroller-position
            function updateArrows() {
                const scrollPosition = navbar.scrollLeft;
                const maxScroll = navbar.scrollWidth - navbar.clientWidth;

                if (scrollPosition > 0 && leftArrow) {
                    leftArrow.style.opacity = '0'; // Skjul venstre pil når der er scrollet
                }
            }
        } else {
            console.error("Navbar element kunne ikke findes."); // Fejlmeddelelse hvis navbar ikke findes
        }
    });


    // Quick Scanner-funktion ---------------------------------------------------
    lucide.createIcons();

  // Scanner logic
  const quickScanBtn = document.getElementById('quick-scan-btn');
  const scannerWrapper = document.getElementById('scanner-wrapper');
  const video = document.getElementById('video');
  const stopScanBtn = document.getElementById('stop-scan-btn');

  let stream = null;

  if (quickScanBtn && scannerWrapper && video && stopScanBtn) {
    quickScanBtn.addEventListener('click', async () => {
      scannerWrapper.style.display = 'block';
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        video.srcObject = stream;
      } catch (err) {
        alert("Kunne ikke få adgang til kameraet.");
        console.error(err);
      }
    });

   stopScanBtn.addEventListener('click', () => {
  scannerWrapper.style.display = 'none';
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
    video.srcObject = null;
  }
});

  } else {
    console.warn("Scanner-elementer ikke fundet i DOM");
  }

});
