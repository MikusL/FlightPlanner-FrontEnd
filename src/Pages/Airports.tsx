import axios, { AxiosError } from 'axios';
import React, { useState } from 'react';
import './styles.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchButton from '../Components/SearchButton/SearchButton';

export type Airport = {
  city: string
  country: string
  airport: string
}

const Airports = () => {
    const [airports, setAirports] = useState<Airport[]>([]);
    const [search, setSearch] = useState('');

    const getAirports = () => {
      axios.get(`http://localhost:8080/api/airports?search=${search}`)
      .then((response) => {
        setAirports(response.data)
      })
      .catch((reason: AxiosError) => {
        if (reason.response!.status === 400)
        {
          console.log("400")
          toast.error("Enter a valid search request")
        }
        else if (reason.response!.status === 404)
        {
          console.log("404")
          toast.error("No airports found")
        }
      });
    };

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) =>
    {
      e.preventDefault()
      getAirports()
    }

    return (
      <div>
        <h1 style = {{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100px'}}>
          Airports page 
        </h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <input className="searchBar" placeholder="Search"
            type="text"
            required
            value = {search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <SearchButton
            text="Search"
            type = "submit"
          />
        </form>
          {airports.map(({city, country, airport}) => {
            return (
              <div className = "airportObject" key = {airport}>
                <p>
                City: {city}
                </p>
                <p>
                Country: {country}
                </p>
                <p>
                Airport name: {airport}
                </p>
              </div>
            )
          })}
      </div>
    )
}

export default Airports