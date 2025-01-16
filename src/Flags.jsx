import React, { useEffect, useState } from 'react';
import Flag from './Flag';
import { IoSearch } from 'react-icons/io5';

const Flags = () => {
    const [flags, setFlags] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');

    const FlagApi = 'https://restcountries.com/v3.1/all';


    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(FlagApi);
            const data = await response.json();
            setFlags(data);
        };
        fetchData();
    }, []);

    console.log(flags);


    const filteredFlags = flags.filter((flag) => {
        const matchesSearch =
            flag.name.common.toLowerCase().includes(search.toLowerCase());
        const matchesRegion =
            selectedRegion === '' || flag.region === selectedRegion;
        return matchesSearch && matchesRegion;
    });


    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };


    const handleRegionChange = (e) => {
        setSelectedRegion(e.target.value);
    };

    return (
        <div>

            <div className='flex items-center justify-between p-5'>
                <div className="relative w-full max-w-sm">
                    <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search for a country..."
                        value={search}
                        onChange={handleSearchChange}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-100 focus:border-gray-100"
                    />
                </div>



                <select className='text-black p-1 rounded-xl' value={selectedRegion} onChange={handleRegionChange}>
                    <option value="">All Regions</option>
                    <option value="Africa">Africa</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="Oceania">Oceania</option>
                    <option value="Americas">Americas</option>
                </select>
            </div>


            <Flag flags={filteredFlags} />
        </div>
    );
};

export default Flags;
