$(document).ready(function(){

	let valueInput = v => document.getElementById(v);
	var modal = valueInput('HelloModal'),
	container = valueInput('containerSection'),
	startGameBtn = valueInput('startGameBtn');
	answerBtn = valueInput('answerBtn');
	reGameBtn = valueInput('reGameBtn');

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
	function clearImg() {
		$('.game div').each(function(){
			if( $(this).data('state') == 1 ){
				$(this).data('state',0).attr('data-state',0).css('backgroundImage', 'none');
			}
		});
	}
	function answer() {
	}
	function game() {

		var category = valueInput('category').value,
		sizeGame = valueInput('sizeGame').value;
		var last_img; //Последняя показанная картинка
		var img_der = 'image/'; //Путь к папке с картинками
		var count_click = 0; //Кол-во кликов
        var game_array = add(sizeGame); //перемешиваем массив (картинки)

        for (var i = 0; i < sizeGame; i++) {
        	$("<div/>", {
        		"class":game_array[i],
        		"data-state": '0'
        	}).appendTo(".game");
        }

        img_der += category + '/';

        if(sizeGame == 4) $(".game").css('width','220px');
        if(sizeGame == 12 || sizeGame == 16) $(".game").css('width','440px');
        if(sizeGame == 20) $(".game").css('width','550px');
        if(sizeGame == 30 || sizeGame == 36) $(".game").css('width','660px');

        modal.style.display = "none";
		container.style.display = "block";


        answerBtn.onclick = function(){
        	for (var i = 0; i < sizeGame; i++) {
        		$('.' + i).css('backgroundImage', 'url(' + img_der + i + '.jpg)');
        	}
        };
        reGameBtn.onclick = function(){location.reload()};

         $('.game div').click(function(){ //Клик на игровом поле

		if( $(this).data('state') == 0){ //Если ячейка закрыта
			if( count_click == 0 ){ //Если первый клик по закрытому полю
				count_click++;
				last_img = $(this).attr('class');
				$(this).data('state',1).attr('data-state',1).css('backgroundImage', 'url(' + img_der + last_img + '.jpg)');
			}else{
				//Если картинки совпадают
				if( last_img == $(this).attr('class')  ){
					$('.' + last_img).data('state',2).attr('data-state',2).css('backgroundImage', 'url(' + img_der + last_img + '.jpg)');
				}else{
					$(this).data('state', 1).attr('data-state',1).css('backgroundImage', 'url(' + img_der + $(this).attr('class') + '.jpg)');
					setTimeout(clearImg, 700);
				}
				count_click = 0;
			}
		}
	});
     }

     startGameBtn.onclick = game;
 });
