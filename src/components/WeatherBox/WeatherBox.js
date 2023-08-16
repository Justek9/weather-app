import PickCity from '../PickCity/PickCity'
import WeatherSummary from '../WeatherSummary/WeatherSummary'
import Loader from '../Loader/Loader'
import ErrorBox from '../ErrorBox/ErrorBox'
import { useCallback, useState } from 'react'

const WeatherBox = props => {
	const [weatherData, setWeatherData] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState(false)

	console.log(weatherData)
	const handleCityChange = useCallback(city => {
		setIsLoading(true)
		setError(false)

		const API_KEY = '31f661b119c7b2183309e06864b3e112'

		fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`).then(res => {
			if (res.status === 200) {
				return res.json().then(data => {
					const weather = {
						city: data.name,
						temp: data.main.temp,
						icon: data.weather[0].icon,
						description: data.weather[0].main,
					}
					setWeatherData(weather)
					setIsLoading(false)
				})
			} else {
				setError(true)
				setIsLoading(false)
			}
		})
	}, [])

	return (
		<section>
			<PickCity handleCityChange={handleCityChange} />
			{weatherData && !isLoading && !error && <WeatherSummary weatherData={weatherData} />}
			{isLoading && <Loader />}
			{error && <ErrorBox>There is no such city!</ErrorBox>}
		</section>
	)
}

export default WeatherBox
