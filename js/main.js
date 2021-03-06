window.onload = () => {

	let valueInput = v => document.getElementById(v);

	let selectList = (classSelect, classMenu) => {
		$(classSelect).click(function () {
			let menu = $(classMenu);
			$(this).toggleClass('active');
			(menu.is(':visible')) ? menu.slideUp() : menu.slideDown();
		});
	}

	selectList('.select--category','.list--category');
	selectList('.select--sizegame','.list--sizegame');

	let modal = valueInput('HelloModal'),
		container = valueInput('containerSection'),
		startGameBtn = valueInput('startGameBtn'),
		answerBtn = valueInput('answerBtn'),
		reGameBtn = valueInput('reGameBtn'),
		resultNewGameBtn = valueInput('resultNewGameBtn'),
		exitBtn = valueInput('exitBtn'),
		game_flag = null;

	let category = "Animals",
		sizeGame = 4;

	let checkElementCategory = (idList, nameSelect, idTitle, idDesc, nameDescTitle) => {
		let list = document.querySelectorAll(`${idList} .modal-select__item`),
			title = valueInput(`${idTitle}`),
			desc = valueInput(`${idDesc}`),
			descTitleField = document.querySelector(`.${nameDescTitle}`);

		for (let i = 0; i < list.length; i++) {

			list[i].addEventListener('click', () => {
				nameSelect = list[i].innerText;
				title.innerText = nameSelect;
				console.log(category, sizeGame, descTitleField);
				(desc.innerText !== title.innerText) ? descTitleField.style.display = 'block' :
				descTitleField.style.display = 'none';
				console.log(nameSelect);
			});
		}
	}

	category = checkElementCategory('#category', category, 'titleCategory', 'descCategory', 'select-titles--category');
	sizeGame = checkElementCategory('#sizeGame', sizeGame, 'titleSizeGame', 'descSizeGame', 'select-titles--sizeGame');

	let resultWindow = valueInput('resultWindow');

	let resultCreate = (time, name) => {
		resultWindow.style.display = 'block';
		resultTimeTxt = valueInput('resultTimeTxt');
		resultTime = valueInput('resultTime');
		if (name === 'best') {
			resultTimeTxt.innerText = 'Your best time ';
			resultTime.innerText = time;
		} else if (name === 'time') {
			console.log(resultTime);
			console.log(resultTime.innerText);
			console.log(time);
			console.log('-----------');
			resultTimeTxt.innerText = 'Your time ';
			resultTime.innerText = time;
			console.log(resultTime);
			console.log(resultTime.innerText);
			console.log(time);
		}
	}

	function add(count) {
		let index, valueIndex;
		let mixArray = [];
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

    // click btn game
    startGameBtn.addEventListener('click', () => {

    	function clearImg() {
    		$('.game div').each(function() {
    			if( $(this).data('state') == 1 ) {
    				$(this).data('state',0).attr('data-state',0).css('backgroundImage', 'none');
    			}
    		});
    		click_flag = 0;
    	}

    	function startTIME() {
    		if (game_flag == 1)
    		{
    			game_time += 1;
    			ShowTime("time", game_time);
    			setTimeout(startTIME,1000);
    		}
    	}

    	let category = valueInput('titleCategory').innerText;
				(category === 'Category') ? category = 'Animals' : category = category;
    	let strSizeGame = valueInput('titleSizeGame').innerText,
    		sizeGame = Number(strSizeGame[0]) * Number(strSizeGame[2]) || 4;
    		console.log(category, sizeGame);
    	let sizeGameTemp = sizeGame/2,
 				last_img, //Последняя показанная картинка
 		 		img_der = './image/', //Путь к папке с картинками
 				count_click = 0, //Кол-во кликов
 				click_flag = 0,
      	game_array = add(sizeGame), //перемешиваем массив (картинки)
        localStorageName = "bestTime",
        game_time = 0;

        for (var i = 0; i < sizeGame; i++) {
        	$("<div/>", {
        		"class":game_array[i],
        		"data-state": '0'
        	}).appendTo(".game");
        }

        img_der += category + '/';
        localStorageName += sizeGame;

        if(sizeGame == 4) $(".game").css('width','220px');
        if(sizeGame == 12 || sizeGame == 16) $(".game").css('width','440px');
        if(sizeGame == 20) $(".game").css('width','550px');
        if(sizeGame == 30 || sizeGame == 36) $(".game").css('width','660px');

        modal.style.display = "none";
        container.style.display = "block";

        answerBtn.onclick = function() {
        	for (var i = 0; i < sizeGame; i++) {
        		$('.' + i).css('backgroundImage', 'url(' + img_der + i + '.jpg)');
        	}
        	game_flag = 0;
        };

        reGameBtn.onclick = () => location.reload();
        resultNewGameBtn.onclick = () => location.reload();
        exitBtn.onclick = () => window.close();
				if(localStorage.getItem(localStorageName) != undefined)
        ShowTime("bestTime", localStorage.getItem(localStorageName));

				function ConvertTime(time) {
					var hour = time / 60;
					hour = Math.floor(hour)
				  if (hour < 10) hour = "0"+hour;

	        var min = time % 60;
					if (min < 10) min = "0"+min;
	        time = hour + ":" + min;
					return time;
				}

				function ShowTime(typeTime, time) {
			 		time = ConvertTime(time);

					let timeOutput = valueInput('time'),
					bestTimeOutput = valueInput('bestTime');

        	if(typeTime == "time")
					timeOutput.innerText = time;
					if(typeTime == "bestTime")
					bestTimeOutput.innerText = time;
			}


		$('.game div').click(function() { //Клик на игровом поле

			if(game_flag != 1)
			{
				game_flag = 1;
				startTIME();
			}

	 		if($(this).data('state') == 0 && click_flag == 0) { //Если ячейка закрыта

	 			if(count_click == 0) { //Если первый клик по закрытому полю
	 				count_click++;
	 				last_img = $(this).attr('class');
	 				$(this).data('state',1).attr('data-state',1).css('backgroundImage', 'url(' + img_der + last_img + '.jpg)');
	 			} else {

	 				//Если картинки совпадают
	 				if(last_img == $(this).attr('class')) {
	 					$('.' + last_img).data('state',2).attr('data-state',2).css('backgroundImage', 'url(' + img_der + last_img + '.jpg)');
	 					sizeGameTemp--;
	 				} else {
	 					$(this).data('state', 1).attr('data-state',1).css('backgroundImage', 'url(' + img_der + $(this).attr('class') + '.jpg)');
	 					click_flag = 1;
	 					setTimeout(clearImg, 700);
	 				}

	 				count_click = 0;
	 			}
	 		}

	 		if (sizeGameTemp == 0) {
	 			game_flag = 0;

	 			if (game_time < (localStorage.getItem(localStorageName)) || localStorage.getItem(localStorageName) == undefined) {
	 				localStorage.setItem(localStorageName, game_time);
	 				resultCreate(ConvertTime(game_time), 'best');
	 			}
	 			else
	 				resultCreate(ConvertTime(game_time), 'time');
	 		}
 		});
	});
};
