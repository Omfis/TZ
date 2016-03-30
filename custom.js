	window.onload = function(){ 
	var map = L.map('map',{//dragging:false, Откомментить для отключения возможности перемещения по карте
	maxBounds:[[52.6517, 41.2680],[52.8613, 41.5780]]}).setView([52.7565, 41.4230], 12);
	//Добавляем на нашу карту слой OpenStreetMap
	L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a rel="nofollow" href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);

	//Создаем кастомный контрол
	var MyControl = L.Control.extend({
    options: {
        position: 'topleft'//Позиция
    },

    onAdd: function (map) {
        // Создание контейнера контрола
        var container = L.DomUtil.create('div', 'my-custom-control');

        // Стиль контейнера
		container.style.backgroundColor = 'black';
		container.style.backgroundImage = "url(images/nicon.png)";
		container.style.backgroundSize = "27px 27px";
		container.style.width = '27px';
		container.style.height = '27px';
		

		container.onclick = function(){
		//Создаем функцию для подключения к апи, и вызываем ее из container.onclick
		function createConn(){
			
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function(){
				if(xhr.readyState == 4 && xhr.status == 200){
					myFunction(xhr);
				}
			};
			xhr.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q=Tambov&lang=ru&units=metric&appid=4db4c7a9ac09694c25eeac0b990bba8b', true);
			xhr.send();
		}
		function myFunction(xml){
		var otvet = xml.responseText;
		otvet = JSON.parse(otvet);
		L.marker(map.getCenter())
		.addTo(map)
		.bindPopup('<p></p><img src=\"images/owmloading.gif\" width=\"110\" height=\"110\">')
		.openPopup().update();
		//поменять на JSON
		function func(){	
		L.marker(map.getCenter())
		.addTo(map)
		.bindPopup("<strong><h1>" + otvet.name + "</h1></strong><br>"
		+ "<b>Координаты: </b>" + otvet.coord.lon + " / " + otvet.coord.lat + "<br>"
		+ "<b>Описание: </b>" + otvet.weather[0].description + "<br>" + "<b>Температура: </b>"
		+ otvet.main.temp + "<br>" + "<b>Сила ветра: </b>" + otvet.wind.speed)
		.openPopup().update();
		}
		setTimeout(func,3000);
		}
		createConn();
		
		
		

		/*name,coord.lat,coord.lon,weather.description,main.temp,wind.speed
		выше имена используемых параметров. Параметр weather.description не желает использоваться как
		собственно и все остальные подпараметры weather. Вывел их в комментарии, т.к. описание в мане уже не актуально*/


		
		
		}
		
        return container;
    }
});

map.addControl(new MyControl());
}