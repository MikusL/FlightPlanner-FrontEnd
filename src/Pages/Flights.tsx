import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import './styles.css';
import SearchButton from '../Components/SearchButton/SearchButton';
import { Airport } from './Airports';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export type Flight = {
  to: Airport
  from: Airport
  carrier: string
  departureTime: string
  arrivalTime: string
}

const Flights = () => {
  const [to, setTo] = useState('')
  const [from, setFrom] = useState('')
  const [departureDate, setDepartureDate] = useState('')
  const [flights, setFlights] = useState<Flight[]>([])

  const getFlights = () => {
    axios.post(`http://localhost:8080/api/flights/search`, {
      from: from,
      to: to,
      departureDate:
       `${departureDate.substring(5,7)}/${departureDate.substring(8,10)}/${departureDate.substring(0,4)}`
    })
      .then((response) => {
        setFlights(response.data.items)
      })
      .catch((reason: AxiosError) => {
        if (reason.response!.status === 400)
        {
          toast.error("Enter valid flight details")
        }
        else if (reason.response!.status === 404)
        {
          toast.error("No flights found")
        }
      });
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>
  {
    e.preventDefault()
    getFlights()
  }

  return (
    <div>
      <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
        Flights page
      </h1>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <input className="smallerSearchBar" placeholder="To"
          type="text"
          required
          value={to}
          onChange={(event) => setTo(event.target.value)}
        />
        <input className="smallerSearchBar" placeholder="From"
          type="text"
          required
          value={from}
          onChange={(event) => setFrom(event.target.value)}
        />
        <input className="smallerSearchBar" placeholder="Departure Date"
          type="date"
          required
          value={departureDate}
          onChange={(event) => setDepartureDate(event.target.value)}
        />
        <SearchButton
          text="Search"
          type = "submit"
        />
      </form>
      {flights.map(({ to,from,carrier, departureTime, arrivalTime }) => {
        return (
          <div className="flightObject">
            <p>
            To: {to.city}
            </p>
            <p>
            From: {from.city}
            </p>
            <p>
            Carrier: {carrier}
            </p>
            <p>
            Departure Time: {departureTime}
            </p>
            <p>
            Arrival Time: {arrivalTime}
            </p>
          </div>
        )
      })}
    </div>
  )
}

export default Flights