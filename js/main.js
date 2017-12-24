$(document).ready(function(){

	$('.select--category').click(function () {
		var menu = $('.list--category');
		var listItem = $('.list--category .modal-select__item')
		$(this).toggleClass('active');
		if (menu.is(':visible')) {
			menu.slideUp();
		} else {
			menu.slideDown();
		}
	});

	$('.select--sizegame').click(function () {
		var menu = $('.list--sizegame');
		$(this).toggleClass('active');
		if (menu.is(':visible')) {
			menu.slideUp();
		} else {
			menu.slideDown();
		}});

		let valueInput = v => document.getElementById(v);
		var modal = valueInput('HelloModal'),
		container = valueInput('containerSection'),
		startGameBtn = valueInput('startGameBtn'),
		answerBtn = valueInput('answerBtn'),
		reGameBtn = valueInput('reGameBtn'),
		resultNewGameBtn = valueInput('resultNewGameBtn'),
		exitBtn = valueInput('exitBtn');
		var startDate = new Date();
		var game_time = new Date();
		var game_flag = null;

		let category = "Animals";
		let sizeGame = 4;

		let checkElementCategory = (idList, nameSelect, idTitle, idDesc, nameDescTitle) => {
			let list = document.querySelectorAll(`${idList} .modal-select__item`);
			let title = valueInput(`${idTitle}`);
			let desc = valueInput(`${idDesc}`);
			let descTitleField = document.querySelector(`.${nameDescTitle}`);
			for (let i = 0; i < list.length; i++) {
				list[i].addEventListener('click', () => {
					nameSelect = list[i].innerText;
					title.innerText = nameSelect;
					console.log(category, sizeGame, descTitleField);
					if (desc.innerText !== title.innerText) {
						descTitleField.style.display = 'block';
					} else {
						descTitleField.style.display = 'none';
					}
					console.log(nameSelect);

				});
			}
		}

		category = checkElementCategory('#category', category, 'titleCategory', 'descCategory', 'select-titles--category');
		sizeGame = checkElementCategory('#sizeGame', sizeGame, 'titleSizeGame', 'descSizeGame', 'select-titles--sizeGame');

		function nameSelect(name) {
			return name;
		};

		let resultWindow = valueInput('resultWindow');

		let resultCreate = () => resultWindow.style.display = 'block';

		function popup() {
		alert(game_time); //HH:mm:ss.sss
	}


	function startTIME() {
		if (game_flag == 1)
		{
			var thisDate = new Date();
			var t = thisDate.getTime() - startDate.getTime();
			var ms = t%1000; t-=ms; ms=Math.floor(ms/10);
			t = Math.floor (t/1000);
			var s = t%60; t-=s;
			t = Math.floor (t/60);
			var m = t%60; t-=m;
			t = Math.floor (t/60);
			var h = t%60;
			if (h<10) h='0'+h;
			if (m<10) m='0'+m;
			if (s<10) s='0'+s;
			if (ms<10) ms='0'+ms;
			document.timeForm.time.value = h + ':' + m + ':' + s + '.' + ms;
			game_time.setHours(h, m, s, ms);
			setTimeout(startTIME,10);
		}
	}

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

 		let category = valueInput('titleCategory').innerText;
 	 	let strSizeGame = valueInput('titleSizeGame').innerText;
		let sizeGame = Number(strSizeGame[0]) * Number(strSizeGame[2]);
		console.log(category, sizeGame);
 		var sizeGameTemp = sizeGame/2;
 		var last_img; //Последняя показанная картинка
 		var img_der = 'image/'; //Путь к папке с картинками
 		var count_click = 0; //Кол-во кликов
 		var click_flag = 0;
        var game_array = add(sizeGame); //перемешиваем массив (картинки)
        var localStorageName = "bestTime";

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

		reGameBtn.onclick = function() { location.reload() };
		resultNewGameBtn.onclick = () => location.reload();
		exitBtn.onclick = () => window.close();

		$('.game div').click(function() { //Клик на игровом поле
			game_flag = 1;
			startTIME();

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
 				localStorage.setItem(localStorageName, game_time.getTime());
 				resultCreate();
 			}
 			else
 				resultCreate();
 		}
		});
	});
	 // startGameBtn.onclick = game;
 });
