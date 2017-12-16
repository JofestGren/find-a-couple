window.onload = () => {
    let valueInput = v => document.getElementById(v);

    var modal = valueInput('HelloModal'),
    startGame = valueInput('startGameBtn'),
    startGameBtn = valueInput('startGameBtn');

    startGame.onclick = function() {
        modal.style.display = "none";
    }

    function createGame() {
        var category = valueInput('category').value,
        sizeGame = valueInput('sizeGame').value;
        console.log(category, sizeGame);
    }

    startGameBtn.onclick = createGame;

    // window.onclick = function(event) {
    //     if (event.target == modal) {
    //         modal.style.display = "none";
    //     }
    // }

}
