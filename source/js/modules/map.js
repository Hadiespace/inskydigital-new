const TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

const ATTRIBUTION = {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
};

const mapElement = document.querySelector('#map');

let city;

const toggleMap = (map, mainMarker, marker, setting) => {
	setting = {
		LAT: city.dataset.lat,
		LNG: city.dataset.lng,
		ZOOM: 16,
	};

	map.setView({ lat: setting.LAT, lng: setting.LNG }, setting.ZOOM);
	mainMarker.setLatLng({ lat: setting.LAT, lng: setting.LNG });

	const createMainPinMarker1 = () => {
		const mainPinIcon = L.icon({
			iconUrl: marker.URL,
			iconSize: [marker.WIDTH, marker.HEIGHT],
			iconAnchor: [marker.WIDTH / 2, marker.HEIGHT],
		});

		return L.marker(
			{ lat: setting.LAT, lng: setting.LNG },
			{ draggable: false, icon: mainPinIcon },
		);
	};

	const mainMarker1 = createMainPinMarker1();

	mainMarker1.addTo(map);
};

const createMap = (marker, setting) => {
	const map = L.map(mapElement)
		.setView({ lat: setting.LAT, lng: setting.LNG }, setting.ZOOM);

	L.tileLayer(TILE_LAYER, { ATTRIBUTION }).addTo(map);

	const createMainPinMarker = () => {
		const mainPinIcon = L.icon({
			iconUrl: marker.URL,
			iconSize: [marker.WIDTH, marker.HEIGHT],
			iconAnchor: [marker.WIDTH / 2, marker.HEIGHT],
		});

		return L.marker(
			{ lat: setting.LAT, lng: setting.LNG },
			{ draggable: false, icon: mainPinIcon },
		);
	};

	const mainMarker = createMainPinMarker();

	mainMarker.addTo(map);

	document.addEventListener('click', (evt) => {
		if (evt.target.closest('.contacts-map__city-open')) {
			city = evt.target.parentElement;

			toggleMap(map, mainMarker, marker, setting);
		}
	});
};

export const initMap = () => {
	if (mapElement) {
		city = document.querySelector('.contacts-map__city-open--main').parentElement;

		const MapSettings = {
			LAT: city.dataset.lat,
			LNG: city.dataset.lng,
			ZOOM: 16,
		};

		if (document.body.clientWidth >= 3400) {
			const MainPinMarker = {
				URL: 'images/common/map-pin.svg',
				WIDTH: 96,
				HEIGHT: 108,
			};

			createMap(MainPinMarker, MapSettings, city);
		}
		if (document.body.clientWidth >= 2600) {
			const MainPinMarker = {
				URL: 'images/common/map-pin.svg',
				WIDTH: 64,
				HEIGHT: 72,
			};

			createMap(MainPinMarker, MapSettings, city);
		} else if (document.body.clientWidth >= 1600) {
			const MainPinMarker = {
				URL: 'images/common/map-pin.svg',
				WIDTH: 48,
				HEIGHT: 54,
			};

			createMap(MainPinMarker, MapSettings, city);
		} else {
			const MainPinMarker = {
				URL: 'images/common/map-pin.svg',
				WIDTH: 32,
				HEIGHT: 36,
			};

			createMap(MainPinMarker, MapSettings, city);
		}
	}
};
