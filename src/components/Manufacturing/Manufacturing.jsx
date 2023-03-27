import React, { useEffect, useState } from "react";
import "./Manufacturing.css"
const Manufacturing=()=>{
    const[vehicleData, setVehicleData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterValue, setFilterValue] = useState("");
    useEffect(()=>{
        fetch("https://vpic.nhtsa.dot.gov/api/vehicles/getallmanufacturers?format=json&page=2")
        //https://vpic.nhtsa.dot.gov/api//vehicles/GetMakesForVehicleType/car?format=json
        .then(res=>res.json())
        .then(data=>setVehicleData(data.Results))
        .catch(err=>{
            return err;
        })
    })
    const handleDisplayData=()=>{
        // window.alert("passangerCar")
        window.alert("UNITED KINGDOM (UK), Passenger Car")
    }
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
      };
     const vehicle = !searchTerm
  ? vehicleData
  : vehicleData.filter((each) =>
      each.Mfr_Name.toLowerCase().includes(searchTerm.toLowerCase()) || each.Country.toLowerCase().includes(searchTerm.toLowerCase())
    );



    const filterVehicleData = (event) => {
        setFilterValue(event.target.value);
    };
    vehicleData.filter((each) =>
      each.Country.toLowerCase().includes(filterValue.toLowerCase())
    );
    return(
        <>
        <div>
            <h1>VEHICLE MANUFACTURES</h1>
        </div>
        <div className="search-filter-boxes">
            <div className="search-box">
                <label htmlFor="search">Search</label>
                <input type="text" id="search"  value={searchTerm} onChange={handleSearch}/>
            </div>
            <div className="filter-box">
            <label htmlFor="filter">FilterByVehicleType</label>
               <select id="filter" onSelect={filterVehicleData}>
               <option name="filter1">Select</option>
                <option name="filter2">PassangerCar</option>
                <option name="filter3">Truck</option>
                <option name="filter4">MotorCycle</option>
               </select>
            </div>
        </div>
        <table>
            <tr className="container">
                <th>Name</th>
                <th>CountryId</th>
                <th>Type</th>
            </tr>
        
        {
            vehicle.map((each,index)=>{
                return <tr key={index} className="container" onClick={handleDisplayData}>
                    <td >{each.Mfr_Name}</td>
                    <td>{each.Country}</td>
                    <td>PassangerType</td>
                </tr>
            })
        }
        </table>
        </>
    )
}
export default Manufacturing;