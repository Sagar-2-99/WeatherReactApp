import React, { useState } from 'react'
import {AsyncPaginate} from "react-select-async-paginate"
import { GEO_API_URL } from '../../api';
import { geoApiOption } from '../../api';


const Search = ({onSearchChange}) => {

    const [search, setSearch] = useState(null);

    const loadOptions = async (inputValue)=>{
            return fetch(`${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`, geoApiOption)
            .then((response) => response.json())
            .then((response) =>{
                return{
                    options:response.data.map((city)=>{
                        return{
                            value: `${city.latitude} ${city.longitude}`,
                            label: `${city.name}, ${city.countryCode}`,
                        };
                    }),
                };
            }).catch((err) => console.error(err));
    }

    const handleOnChange= (searchData)=>{
        console.log(searchData);
        setSearch(searchData);
        onSearchChange(searchData);
    };

  return (
    <AsyncPaginate
    placeholder = "Search for city"
    debounceTimeout = {600}
    value={search}
    onChange={handleOnChange}
    loadOptions={loadOptions}
    />
  )
}

export default Search
