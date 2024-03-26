import { useEffect, useState } from "react";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

import Button from "@mui/material/Button";
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
    fetch("https://carrestservice-carshop.rahtiapp.fi/cars")
      .then((response) => {
        if (!response.ok)
          throw new Error("Error in fetch" + response.statusText);

        return response.json();
      })
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
  return (
    <div className="ag-theme-material" style={{ height: 600 }}>
      <AgGridReact
        rowData={cars}
        columnDefs={colDefs}
        pagination={true}
        paginationAutoPageSize={true}
      />
    </div>
  );
}

export default Carlist;
