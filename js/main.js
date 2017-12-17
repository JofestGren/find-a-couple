$(document).ready(function(){

	let valueInput = v => document.getElementById(v);

	function add(count) {
		var index, valueIndex; 
		var mixArray = [];
		count = count/2;
		for (var i = 1; i <= count; i++) {
			mixArray.push(i);
			mixArray.push(i);
		}
		for (var i = 0; i < mixArray.length; i++) {
			index = Math.floor(Math.random()*i);
			valueIndex = mixArray[index];
			mixArray[index] = mixArray[i];
			mixArray[i] = valueIndex;
		}
		return mixArray;
	}

	var modal = valueInput('HelloModal'),
	startGame = valueInput('startGameBtn'),
	startGameBtn = valueInput('startGameBtn');

	function createGame() {
		var category = valueInput('category').value,
		sizeGame = valueInput('sizeGame').value;
		console.log(category, sizeGame);
        var game_array = add(sizeGame); //перемешиваем массив (картинки)
        for (var i = 0; i < sizeGame; i++) {
        	$("<div/>", {
        		"class": "num" + game_array[i],
        		"data-state": '0'
        	}).appendTo(".game");
        }
        if(sizeGame == 4) $(".game").css('width','204px');
         if(sizeGame == 12 || sizeGame == 16) $(".game").css('width','408px');
         if(sizeGame == 20) $(".game").css('width','510px');
         if(sizeGame == 30 || sizeGame == 36) $(".game").css('width','612px');
      modal.style.display = "none";
    }
    startGameBtn.onclick = createGame;

});
