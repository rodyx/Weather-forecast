export async function FetchWeatherData(lat, lon) {
	let response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&lang=ru&units=metric&exclude=hourly,minutely&appid=2faf1d72a18d95bd825dd0bdea5ce45e`)
	if (response.ok) {
		let weather = await response.json();
		return weather;
	} else return false
}
