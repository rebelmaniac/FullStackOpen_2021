import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const api_key = process.env.REACT_APP_API_KEY
  const [countries, setCountries] = useState([]);
  const [filterValue, setFilter] = useState("");
  const hook = () => {
    console.log("effect");
    axios.get("https://restcountries.com/v2/all").then((response) => {
      console.log("promise fulfilled");
      response.data.forEach((country) => {
        country["buttonBool"] = true;
      });
      setCountries(response.data);
    });
  };

  useEffect(hook, []);
  console.log("render", countries.length, "countries");

  const handleFilterChange = (event) => {
    console.log(event.target.value);
    setFilter(event.target.value);
  };

  const handleButtonClick = (country) => {
    let id = countries.indexOf(country);
    let newCountries = countries.slice();

    newCountries[id].buttonBool = !newCountries[id].buttonBool;
    setCountries(newCountries);
  };

  const DisplayCountries = (props) => {
    if (props.value.buttonBool === true) {
      return (
        <div>
          {props.value.name}{" "}
          <button onClick={() => handleButtonClick(props.value)}>show</button>
        </div>
      );
    } else {
      return (
        <div>
          <div>
            {props.value.name}{" "}
            <button onClick={() => handleButtonClick(props.value)}>hide</button>
          </div>
          <h1>{props.value.name}</h1>
          <div>
            capital {props.value.capital}
            <br />
            population {props.value.population}
          </div>
          <h2>languages</h2>
          <ul>
            {props.value.languages.map((language) => (
              <Languages key={language.name} value={language.name} />
            ))}
          </ul>
          <div>{<Flag country={props.value} />}</div>
          <div>{<Weather api_key={api_key} country={props.value}/>}</div>
        </div>
      );
    }
  };

  const Languages = (props) => {
    return (
      <div>
        <li>{props.value}</li>
      </div>
    );
  };

  const Flag = (props) => {
    return (
      <img
        src={props.country.flag}
        width="150"
        alt={props.country.name + "flag"}
      />
    );
  };

  const Weather = (props) => {
    const [weather, setWeather] = useState();

    const hook = () => {
      axios.get('http://api.weatherapi.com/v1/current.json',
        {
          params:
          {
            key: api_key,
            q: props.country.capital
          }
        })
        .then(result => {
          console.log(result);
          let current = result.data.current
          setWeather(
            {
              icon: current.condition.icon,
              tempF: current.temp_f,
              tempC: current.temp_c,
              windM: `${current.wind_mph} mph(${current.wind_kph} kph) direction ${current.wind_dir}`,
            }
          )
      })
    }

    useEffect(hook, []);

    return (
      <div>
        <h2>
          Weather in {props.country.capital}
        </h2>
        <div>
          <b>temperature:</b> {weather?.tempF}F ({weather?.tempC}C)
        </div>
        <img
          src={weather?.icon}
          alt={props.country.name + "current Weather icon"}
        />
        <div>
        <b>wind:</b> {weather?.windM} ({weather?.windK} kph)
        </div>
      </div>
    );
  };

  const FilterCountries = (props) => {
    const filteredCountries = props.countries.filter((country) =>
      country.name.toLowerCase().includes(props.filterValue.toLowerCase())
    );
    if (props.filterValue === "") {
      return <div></div>;
    } else if (filteredCountries.length > 10) {
      return <div>Too many matches, specify another filter</div>;
    }
    console.log(filteredCountries);
    return filteredCountries.map((country) => (
      <DisplayCountries key={country.name} value={country}/>
    ));
  };

  return (
    <div>
      <form>
        <div>
          find countries
          <input value={filterValue} onChange={handleFilterChange} />
        </div>
      </form>
      <div>
        <FilterCountries filterValue={filterValue} countries={countries}/>
      </div>
    </div>
  );
};

export default App;
