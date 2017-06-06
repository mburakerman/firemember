// show game area before starting to play
const Initial = function() {

    let gameInitially = [];
    const ul = document.getElementById("firemember");

    for (let i = 0; i < 16; i++) {
        gameInitially.push('initial');
    }

    function showInitially(card) {
        var li = document.createElement("li");
        ul.appendChild(li);
        li.className = card;

        li.style.backgroundImage = "url('img/fire.gif')";
        li.style.backgroundSize = "cover";

        ripple.bindTo(li);
    }

    gameInitially.map(showInitially);
}

Initial();


const Firemember = function() {

    let game = [];
    let level = 1;
    let founded = []; // push founded fires here
    let score = 0;
    let timerInterval;
    let showTime = 500; // how many miliseconds fires will be shown
    let timesClicked = 0;

    const start_btn = document.getElementById("start");
    const ul = document.getElementById("firemember");
    const li = document.getElementsByTagName("li");


    document.getElementById('score').innerHTML = `Score is: ${score}`;


    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    // push fires to game array depending the level
    function loop(lev) {
        for (let i = 0; i < 16 - lev; i++) {
            game.push('card');
        }

        for (let i = 0; i < lev; i++) {
            game.push('find');
        }

        return game;
    }

    // create li's and append them
    function show(card) {
        var li = document.createElement("li");
        ul.appendChild(li);
        li.className = card;

        li.style.backgroundImage = "url('img/color.png')";
        li.style.backgroundSize = "cover";

        // show ripple effect on click
        ripple.bindTo(li);
    }

    // show fires and then hide 
    function memorize() {
        let find = document.querySelectorAll(".find");

        // make game area unclickable till fires are hidden
        for (let i = 0; i < li.length; i++) {
            li[i].style.pointerEvents = "none";
        }

        for (let i = 0; i < find.length; i++) {
            find[i].style.backgroundImage = "url('img/fire.gif')";
            find[i].style.backgroundSize = "cover";
        }

        setTimeout(function() {

            for (let i = 0; i < find.length; i++) {
                find[i].classList.add('findMe');
                find[i].classList.remove('find');

                find[i].style.backgroundImage = "url('img/color.png')";
                find[i].style.backgroundSize = "cover";
            }

            setTimeout(function() {
                for (let i = 0; i < li.length; i++) {
                    li[i].style.pointerEvents = "auto";
                }
            }, 100);

        }, showTime);

    }

    // start firemember
    start_btn.addEventListener("click", function() {

        document.querySelector('.explosion').setAttribute("src", "img/explosion.gif");

        for (let i = 0; i < li.length; i++) {
            li[i].style.pointerEvents = "none";
        }

        setTimeout(function() {
            document.querySelector('.explosion').setAttribute("src", "");

            start_btn.disabled = true;

            loop(level);
            shuffleArray(game);
            ul.innerHTML = "";
            game.map(show);

            memorize();
            click();
            timer();

        }, 1250);

    }, false);

    function timer() {
        timerInterval = setInterval(function() {
            time++;
        }, showTime);
    }

    function resetTimer() {
        clearInterval(timerInterval);
        time = 0;
    }

    function changeLevel() {
        ul.innerHTML = "";

        level = level + 1;
        timesClicked = 0;
        game = [];
        founded = [];

        loop(level);
        restart();

        // completed firemember
        if (level > 15) {
            alert("Congratulations! You have finished Firemember!");
            init();
            Initial();
        }
    }


    function next() {
        ul.style.pointerEvents = "auto";

        timesClicked = 0;
        founded = [];
        restart();
    }


    function restart() {
        ul.style.pointerEvents = "auto";
        ul.innerHTML = "";

        shuffleArray(game);
        game.map(show);
        memorize();
        click();
        timer();
    }

    function init() {
        start_btn.disabled = false;
        ul.innerHTML = "";

        game = [];
        level = 1;
        founded = [];
        score = 0;
        timesClicked = 0;
    }


    function click() {

        for (let i = 0; i < li.length; i++) {
            (function(index) {
                li[i].addEventListener("click", function(e) {

                    // make unclickable clicked li
                    e.target.style.pointerEvents = "none";

                    if (e.target.className === 'findMe') {

                        e.target.className = "found";
                        e.target.style.pointerEvents = "none";

                        // push founded indexes to founded array
                        founded.push(index);

                        // if user finds fires on that level, change level
                        if (founded.length === level) {
                            resetTimer();
                            score++;

                            document.getElementById('score').innerHTML = `Score is: ${score}`;

                            let found = document.querySelectorAll('.found');
                            for (var i = 0; i < found.length; i++) {
                                found[i].style.backgroundImage = "url('img/fire.gif')";
                                found[i].style.backgroundSize = "cover";
                            }

                            // check if user finds fires 2 times on that level
                            if (score % 2 === 0) {
                                ul.style.pointerEvents = "none";

                                setTimeout(function() {
                                    changeLevel();
                                }, showTime);

                            } else {
                                ul.style.pointerEvents = "none";

                                setTimeout(function() {
                                    next();
                                }, showTime);
                            }

                        }
                        // if user can't find fire, check if game is over and increment 'timesClicked'
                    } else {
                        timesClicked++;

                        if (timesClicked > 1) {
                            alert("Game Over!");
                            init();

                            document.getElementById('score').innerHTML = `Score is: ${score}`;
                            setTimeout(function() {
                                Initial();
                            }, 50);
                        }

                    }
                });

            }(i));
        }

    }

}

Firemember();
