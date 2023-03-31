import React, { useEffect, useState } from "react";
import "./Manufacturing.css"

const Manufacturing = () => {
  const [vehicleData, setVehicleData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  useEffect(() => {
    fetch("https://vpic.nhtsa.dot.gov/api/vehicles/getallmanufacturers?format=json&page=2")
      .then((res) => res.json())
      .then((data) => setVehicleData(data.Results))
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilter = (event) => {
    setFilterValue(event.target.value);
  };

  const handleRowClick = (vehicle) => {
    (setSelectedVehicle(vehicle));
  };

  const filteredData = !searchTerm
    ? vehicleData.filter((vehicle) => filterValue === "" || vehicle.VehicleTypes.some((type) => type.Name === filterValue))
    : vehicleData.filter(
        (vehicle) =>
          (vehicle.Mfr_Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            vehicle.Country.toLowerCase().includes(searchTerm.toLowerCase())) &&
          (filterValue === "" || vehicle.VehicleTypes.some((type) => type.Name === filterValue))
      );

  return (
    <>
      <div>
        <h1>VEHICLE MANUFACTURERS</h1>
      </div>
      <div className="search-filter-boxes">
        <div className="search-box">
          <label htmlFor="search">Search</label>
          <input type="text" id="search" value={searchTerm} onChange={handleSearch} />
        </div>
        <div className="filter-box">
          <label htmlFor="filter">Filter By Vehicle Type</label>
          <select id="filter" value={filterValue} onChange={handleFilter}>
            <option value="">All Types</option>
            <option value="Passenger Car">Passenger Car</option>
            <option value="Truck">Truck</option>
            <option value="Motorcycle">Motorcycle</option>
          </select>
        </div>
      </div>
      <table>
        <thead>
          <tr className="container">
            <th>Name</th>
            <th>Country</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((vehicle, index) => (
            <tr key={index} className="container" onClick={() => handleRowClick(vehicle)}>
              <td>{vehicle.Mfr_Name}</td>
              <td>{vehicle.Country}</td>
              <td>{vehicle.VehicleTypes.map((type) => type.Name).join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedVehicle && (
        <div className="popup">
          <div className="popup-content">
            <h2>{selectedVehicle.Mfr_Name}</h2>
            <p>Country: {selectedVehicle.Country}</p>
            <p>Address: {selectedVehicle.Mfr_CommonName}</p>
            <p>Vehicle Types: {selectedVehicle.VehicleTypes.map((type) => type.Name).join(", ")}</p>
            <button onClick={() => setSelectedVehicle(null)}>Close</button>
          </div>
        </div>
)}
</>
  )
      }
      export default Manufacturing;