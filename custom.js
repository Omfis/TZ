//<script type='text/javascript'>
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

		//1. Объект XMLHttpRequest (запрос к API)
		var xhr = new XMLHttpRequest();

		//2. Конфигурируем его: GET-запрос на openweathermap
		xhr.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q=Tambov&lang=ru&units=metric&appid=4db4c7a9ac09694c25eeac0b990bba8b', true);
	
		//3. Отсылаем запрос
		xhr.send();

		container.onclick = function(){
		
		//var latlng = L.latLng(getCenter);
		
		var otvet = xhr.responseText;
		var cityname = otvet.indexOf("\"name\"") + 8;
		var citycoordlat = otvet.indexOf("\"lat\"") + 6;
		var citycoordlon = otvet.indexOf("\"lon\"") + 6;
		var citydescr = otvet.indexOf("\"description\"") + 14;
		var citytemp = otvet.indexOf("\"temp\"") + 7;
		var citywind = otvet.indexOf("\"speed\"") + 8;
		
		if (xhr.status != 200) {
		
		L.marker(map.getCenter())
		.addTo(map)
		.bindPopup('<img src=\"images/owmloading.gif\" width=\"50\" height=\"50\">')
		.openPopup();

		} else {
			
		
		var marker = L.marker(map.getCenter())
		.addTo(map)
		.bindPopup("<strong><h1>" + otvet.substr(cityname, 6) + "</h1></strong><br>"
		+ "<b>Координаты: </b>" + otvet.substr(citycoordlon,5) + " / " + otvet.substr(citycoordlat,5) + "<br>"
		+ "<b>Описание: </b>" + otvet.slice(citydescr,otvet.indexOf(",\"icon\":")) + "<br>" + "<b>Температура: </b>"
		+ otvet.substr(citytemp,3)	+ "<br>" + "<b>Сила ветра: </b>" + otvet.substr(citywind,3))
		.openPopup();
		}
		}

        return container;
    }
});

map.addControl(new MyControl());
}
//</script>