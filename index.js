function init() {
    let root = document.getElementById('root');
    let tempo = 140;
    let intervalID = -1;
    let step = 4;
    let length = 4;
    let stepCount = 0;
    let colorIndex = 0;
    let stepColors = ['hsl(0, 0%, 40%)', 'hsl(0, 0%, 65%)'];
    let startStopBtn = document.getElementById('start-stop');

    // probaj složit bez countera nego ako je x % 4 = 0
    for(let i = 1; i <= step * length; i++) {
        stepCount++;
        if(stepCount > step) {
            stepCount = 1;
            colorIndex = Number(!colorIndex);
        }
        generateCircle(stepColors, colorIndex);
    }

    let circles = root.getElementsByClassName('circleWrapper');

    startStopBtn.addEventListener('click', toggleSequencer)

    function toggleSequencer() {
        if (JSON.parse(startStopBtn.dataset.started)) {
            startStopBtn.setAttribute('data-started', 'false');
            clearSequencer();
            clearInterval(intervalID);
            startStopBtn.innerText = 'Start';
        } else {
            startStopBtn.setAttribute('data-started', 'true');
            startStopBtn.innerText = 'Stop';
            let metroCounter = 0;
            intervalID = setInterval(function() {
                clearSequencer();
                metroCounter = metroCounter < circles.length ? metroCounter : 0;
                circles[metroCounter].classList.add('step');
                if (circles[metroCounter].children[0].checked) {
                    circles[metroCounter].children[0].classList.add('active');
                    playClick();
                }
                metroCounter++;
            }, 60000 / tempo / length);
        }
    }

    function clearSequencer() {
        for (let circle of circles) {
            circle.classList.remove('step');
            circle.children[0].classList.remove('active');
        }
    }

    // metronom
    // let circles = root.getElementsByClassName('circleWrapper');
    // let metroCounter = 0;
    // intervalID = setInterval(function() {
    //     for (let circle of circles) {
    //         circle.classList.remove('step');
    //         circle.children[0].classList.remove('active');
    //     }
    //     metroCounter = metroCounter < circles.length ? metroCounter : 0;
    //     circles[metroCounter].classList.add('step');
    //     if (circles[metroCounter].checked) {
    //         circles[metroCounter].children[0].classList.add('active');
    //     }
    //     metroCounter++;
    // }, 60000 / tempo / length);
}

function generateCircle(stepColors, colorIndex) {
    let circleWrapper = document.createElement('div');
    circleWrapper.classList.add('circleWrapper');

    let circle = document.createElement('input');
    circle.classList.add('circle');
    circle.setAttribute('type', 'checkbox');
    circle.style.backgroundColor =  stepColors[colorIndex];

    circleWrapper.appendChild(circle);
    root.appendChild(circleWrapper);
}

function playClick() {
    let clickSound = new Audio('sounds/click.mp3');
    clickSound.volume = 1;
    clickSound.play();
}
this
document.addEventListener('DOMContentLoaded', init);