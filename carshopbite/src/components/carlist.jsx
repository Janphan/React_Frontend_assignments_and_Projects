import { useEffect, useState } from "react";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

import Button from "@mui/material/Button";

import AddCar from "./AddCar";
import EditCar from "./EditCar";
import { getCars } from "../carapi";

function Carlist() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetchCars();
  }, []);

  const [colDefs, setColDefs] = useState([
    { field: "brand", filter: true },
    { field: "model", filter: true, width: 200 },
    { field: "color", filter: true, width: 100 },
    { field: "fuel", filter: true, width: 100 },
    { field: "modelYear", filter: true, width: 150 },
    { field: "price", filter: true },
    {
      cellRenderer: (params) => (
        <EditCar data={params.data} updateCar={updateCar} />
      ),
      width: 150,
    },
    {
      cellRenderer: (params) => (
        <Button
          size="small"
          color="error"
          onClick={() => deleteCar(params.data._links.car.href)}
        >
          Delete
        </Button>
      ),
      width: 150,
    },
  ]);
  const fetchCars = () => {
    getCars()
      .then((data) => setCars(data._embedded.cars))
      .catch((err) => console.error(err));
  };

  const deleteCar = (url) => {
    if (window.confirm("Are you sure to delete this car?")) {
      fetch(url, { method: "DELETE" })
        .then((response) => {
          if (!response.ok)
            throw new Error("Error in deletion: " + response.statusText);

          return response.json();
        })
        .then(() => fetchCars())
        .catch((err) => console.error(err));
    }
  };
  const addCar = (newCar) => {
    fetch(import.meta.env.VITE_API_URL, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(newCar),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Error when adding car");
        return response.json();
      })
      .then(() => fetchCars())
      .catch((err) => console.error(err));
  };

  const updateCar = (url, updatedCar) => {
    fetch(url, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(updatedCar),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Error when updating car");
        return response.json();
      })
      .then(() => fetchCars())
      .catch((err) => console.error(err));
  };
  return (
    <>
      <AddCar addCar={addCar} />
      <div className="ag-theme-material" style={{ height: 600 }}>
        <AgGridReact
          rowData={cars}
          columnDefs={colDefs}
          pagination={true}
          paginationAutoPageSize={true}
        />
      </div>
    </>
  );
}

export default Carlist;
