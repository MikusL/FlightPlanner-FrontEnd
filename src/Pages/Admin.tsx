import React, { useState } from 'react';
import './styles.css';
import LoginButton from '../Components/LoginButton/LoginButton';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminPanelButton from '../Components/AdminPanelButton/AdminPanelButton';
import AdminPanelSearchButton from '../Components/AdminPanelSearchButton/AdminPanelSearchButton';
import axios, { AxiosError } from 'axios';
import { Flight } from './Flights'

const username = "codelex-admin"
const password = "Password123"
const token = Buffer.from(`${username}:${password}`, "utf8").toString("base64")

const Admin = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [getFlightBool, setGetFlightBool] = useState(false)
  const [addFlightBool, setAddFlightBool] = useState(false)
  const [deleteFlightBool, setDeleteFlightBool] = useState(false)
  const [usernameEntered, setUsernameEntered] = useState('')
  const [passwordEntered, setPasswordEntered] = useState('')
  const tempToken = Buffer.from(`${usernameEntered}:${passwordEntered}`, "utf8").toString("base64")
  const [getFlightId, setGetFlightId] = useState('')
  const [deleteFlightId, setDeleteFlightId] = useState('')
  const [flight, setFlight] = useState<Flight>()
  const [fromCity, setFromCity] = useState('')
  const [fromCountry, setFromCountry] = useState('')
  const [fromAirport, setFromAirport] = useState('')
  const [toCity, setToCity] = useState('')
  const [toCountry, setToCountry] = useState('')
  const [toAirport, setToAirport] = useState('')
  const [carrier, setCarrier] = useState('')
  const [departureDate, setDepartureDate] = useState('')
  const [arrivalDate, setArrivalDate] = useState('')

  const submitCredentials = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (tempToken === token) {
      setLoggedIn(true);
      console.log("Logged in")
      toast.success("Successfully logged in!")
    }
    else {
      console.log("Invalid login information")
      toast.error("Invalid login information")
    }
  }

  const openGetFlightComponent = () => {
    setGetFlightBool(true)
    setAddFlightBool(false)
    setDeleteFlightBool(false)
  }

  const openAddFlightComponent = () => {
    setGetFlightBool(false)
    setAddFlightBool(true)
    setDeleteFlightBool(false)
  }

  const openDeleteFlightComponent = () => {
    setGetFlightBool(false)
    setAddFlightBool(false)
    setDeleteFlightBool(true)
  }

  const getFlight = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    axios.get(`http://localhost:8080/admin-api/flights/${getFlightId}`, {
      headers: {
        Authorization: `token ${tempToken}`
      }
    })
      .then((response) => {
        setFlight(response.data)
      })
      .catch((reason: AxiosError) => {
        if (reason.response!.status === 404) {
          console.log("404")
          toast.error("No flight found with those details")
        }
        else {
          toast.error("Try Again")
        }
      });
  }

  const addFlight = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    var addFlightRequest = {
      from: {
        country: fromCountry,
        city: fromCity,
        airport: fromAirport
      },
      to: {
        country: toCountry,
        city: toCity,
        airport: toAirport
      },
      carrier: carrier,
      departureTime:
        `${departureDate.substring(5, 7)}/${departureDate.substring(8, 10)}/${departureDate.substring(0, 4)} ${departureDate.substring(11, 16)}`,
      arrivalTime:
        `${arrivalDate.substring(5, 7)}/${arrivalDate.substring(8, 10)}/${arrivalDate.substring(0, 4)} ${arrivalDate.substring(11, 16)}`
    }

    axios.put(`http://localhost:8080/admin-api/flights`, addFlightRequest, {
      headers: {
        Authorization: `token ${tempToken}`
      }
    })
      .then((response) => {
        console.log(response.data)
        toast.success("Flight added")
      })
      .catch((error: AxiosError) => {
        if (error.response!.status === 400) {
          console.log("400")
          toast.error("Invalid data input")
        }
        else if (error.response!.status === 409) {
          console.log("409")
          toast.error("That flight already exists")
        }
        else {
          toast.error("Try again")
        }
      })
  }

  const deleteFlight = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    axios.delete(`http://localhost:8080/admin-api/flights/${deleteFlightId}`, {
      headers: {
        Authorization: `token ${tempToken}`
      }
    })
      .then(() => {
        toast.success("Flight deleted")
      })
      .catch((error: AxiosError) => {
        if (error.response!.status === 404) {
          console.log("404")
          toast.error("There is no flight with that ID")
        }
        else {
          toast.error("Try again")
        }
      })
  }

  return (
    <div>
      <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
        Admin page
      </h1>
      <ToastContainer />
      {!loggedIn && (
        <div className="loginContainer">
          <form onSubmit={submitCredentials}>
            <input className="loginInput" placeholder="Username"
              type="text"
              required
              onChange={(event) => setUsernameEntered(event.target.value)}
            />
            <br></br>
            <input className="loginInput" placeholder="Password"
              type="password"
              required
              onChange={(event) => setPasswordEntered(event.target.value)}
            />
            <br></br>
            <LoginButton
              text="Login"
              type="submit"
            />
          </form>
        </div>
      )}
      {loggedIn && (
        <div>
          <AdminPanelButton
            text="Get Flight"
            type="submit"
            onClick={openGetFlightComponent}
          />
          <AdminPanelButton
            text="Add Flight"
            type="submit"
            onClick={openAddFlightComponent}
          />
          <AdminPanelButton
            text="Delete Flight"
            type="submit"
            onClick={openDeleteFlightComponent}
          />
        </div>
      )}
      <br></br>
      {getFlightBool && (
        <form className="getFlight" onSubmit={getFlight}>
          <input className="smallerSearchBar" placeholder="ID"
            type="text"
            value={getFlightId}
            onChange={(event) => setGetFlightId(event.target.value)}
          />
          <AdminPanelSearchButton
            text="Search"
            type="submit"
          />
          <div className="returnedFlight">
            <div className="returnedFlightDetails">
              <p>
                To:
              </p>
              <p>
                City: {flight?.to.city}
              </p>
              <p>
                Country: {flight?.to.country}</p>
              <p>
                Airport Name: {flight?.to.airport}
              </p>
            </div>
            <div className="returnedFlightDetails">
              <p>
                From:
              </p>
              <p>
                City: {flight?.from.city}
              </p>
              <p>
                Country: {flight?.from.country}
              </p>
              <p>
                Airport Name: {flight?.from.airport}
              </p>
            </div>
            <div className="returnedFlightDetails">
              <p>
                Carrier: {flight?.carrier}
              </p>
              <p>
                Departure Date: {flight?.departureTime}
              </p>
              <p>
                Arrival Date: {flight?.arrivalTime}
              </p>
            </div>
          </div>
        </form>
      )}
      {addFlightBool && (
        <form className="addFlight" onSubmit={addFlight}>
          <div className="addFlightInput">
            <div style={{ marginLeft: 45 }}>
              From:
            </div>
            <input className="smallerSearchBar" placeholder="City"
              type="text"
              value={fromCity}
              onChange={(event) => setFromCity(event.target.value)}
            />
            <br></br>
            <input className="smallerSearchBar" placeholder="Country"
              type="text"
              value={fromCountry}
              onChange={(event) => setFromCountry(event.target.value)}
            />
            <br></br>
            <input className="smallerSearchBar" placeholder="Airport Name"
              type="text"
              value={fromAirport}
              onChange={(event) => setFromAirport(event.target.value)}
            />
          </div>
          <div className="addFlightInput">
            <div style={{ marginLeft: 45 }}>
              To:
            </div>
            <input className="smallerSearchBar" placeholder="City"
              type="text"
              value={toCity}
              onChange={(event) => setToCity(event.target.value)}
            />
            <br></br>
            <input className="smallerSearchBar" placeholder="Country"
              type="text"
              value={toCountry}
              onChange={(event) => setToCountry(event.target.value)}
            />
            <br></br>
            <input className="smallerSearchBar" placeholder="Airport Name"
              type="text"
              value={toAirport}
              onChange={(event) => setToAirport(event.target.value)}
            />
          </div>
          <div className="addFlightInput">
            <div style={{ marginTop: 20 }}>
              <input className="smallerSearchBar" placeholder="Carrier"
                type="text"
                value={carrier}
                onChange={(event) => setCarrier(event.target.value)}
              />
              <br></br>
              <div style={{ marginLeft: 45, marginBottom: -10, marginTop: -10 }}>
                Departure Time:
              </div>
              <input className="smallerSearchBar" placeholder="Departure Date"
                type="datetime-local"
                value={departureDate}
                onChange={(event) => setDepartureDate(event.target.value)}
              />
              <br></br>
              <div style={{ marginLeft: 45, marginBottom: -10, marginTop: -10 }}>
                Arrival Time:
              </div>
              <input className="smallerSearchBar" placeholder="Arrival Time"
                type="datetime-local"
                value={arrivalDate}
                onChange={(event) => setArrivalDate(event.target.value)}
              />
            </div>
          </div>
          <AdminPanelSearchButton
            text="Add Flight"
            type="submit"
          />
        </form>
      )}
      {deleteFlightBool && (
        <form className="deleteFlight" onSubmit={deleteFlight}>
          <input className="smallerSearchBar" placeholder="ID"
            type="text"
            value={deleteFlightId}
            onChange={(event) => setDeleteFlightId(event.target.value)}
          />
          <AdminPanelSearchButton
            text="Delete"
            type="submit"
          />
        </form>
      )}
    </div>
  )
}

export default Admin