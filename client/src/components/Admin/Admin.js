import React, { useState, useEffect } from "react";
import axios from "axios";

import AppBar from "../AppBar/AppBar";
import Dashboard from "../Dashboard/Dashboard";

import { DOG_CEO_BASE_URI } from "../../config/clientConfig";

const Admin = (props) => {
    const [breedList, setBreedList] = useState([]);
    const [dogBreed, setDogBreed] = useState("pug");
    
    useEffect(() => {
        const fetchBreedList = async () => {
            const response = await axios.get(`${DOG_CEO_BASE_URI}/breeds/list/all`);
            setBreedList(response.data.message);
        };
        fetchBreedList();
    }, []);

    const handleBreedChange = dogBreed => {
        setDogBreed(dogBreed);
    };

  return (
      <>
      <AppBar
        breedList={breedList}
        handleBreedChange={handleBreedChange}
        dogBreed={dogBreed}
      />
      <Dashboard
        dogBreed={dogBreed}
        />
      </>
  )
};

export default Admin;