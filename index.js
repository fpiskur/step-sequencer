function init() {
    let root = document.getElementById('root');
    let tempo = 140;
    let intervalID = -1;
    let step = 4;
    let length = 4;
    let stepCount = 0;
    let colorIndex = 0;
    let stepColors = ['hsl(0, 0%, 65%)', 'hsl(0, 0%, 40%)'];

    // probaj složit bez countera nego ako je x % 4 = 0
    for(let i = 1; i <= step * length; i++) {
        stepCount++;
        let circleWrap = document.createElement('div');
        circleWrap.classList.add('circleWrap');
        let circle = document.createElement('div');
        circle.classList.add('circle');
        circleWrap.appendChild(circle);
        if(stepCount > step) {
            stepCount = 1;
            colorIndex = Number(!colorIndex);
        }
        circle.style.backgroundColor =  stepColors[colorIndex];
        root.appendChild(circleWrap);
    }

    // metronom
    let circles = root.getElementsByClassName('circleWrap');
    let metroCounter = 0;
    intervalID = setInterval(function() {
        for (let circle of circles) {
            circle.classList.remove('step');
            circle.children[0].classList.remove('active');
        }
        metroCounter = metroCounter < circles.length ? metroCounter : 0;
        circles[metroCounter].classList.add('step'); // class = 'active'
        if (metroCounter % step == 0) {
            circles[metroCounter].children[0].classList.add('active');
        }
        metroCounter++;
    }, 60000 / tempo / length);
}

document.addEventListener('DOMContentLoaded', init);