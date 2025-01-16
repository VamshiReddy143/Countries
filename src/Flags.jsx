import React, { useState, useEffect } from 'react';
import Flag from './Flag';
import { IoSearch } from 'react-icons/io5';
import axios from 'axios';  // Import axios

const Flags = () => {
    const [flags, setFlags] = useState([]); // Stores all fetched flags
    const [filteredFlags, setFilteredFlags] = useState([]); // Stores filtered flags
    const [search, setSearch] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');
    const [loading, setLoading] = useState(true); // Tracks loading state

    const FlagApi = 'https://restcountries.com/v3.1/all';

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Use axios to fetch the data
                const response = await axios.get(FlagApi);
                console.log('Fetched Data:', response.data); // Check fetched data
                setFlags(response?.data);
                setFilteredFlags(response?.data);  // Assuming no initial filter
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []); // Empty dependency array, runs only once when component mounts

    // Filter flags whenever `search` or `selectedRegion` changes
    useEffect(() => {
        const filtered = flags.filter((flag) => {
            const matchesSearch = flag.name.common
                .toLowerCase()
                .includes(search.toLowerCase());
            const matchesRegion =
                selectedRegion === '' || flag.region === selectedRegion;
            return matchesSearch && matchesRegion;
        });
        setFilteredFlags(filtered);
    }, [search, selectedRegion, flags]); // Re-run filtering logic when any of these values change

    return (
        <div>
            <div className="flex items-center justify-between p-5">
                <div className="relative w-full max-w-sm">
                    <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search for a country..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-100 focus:border-gray-100"
                    />
                </div>
                <select
                    className="text-black p-1 rounded-xl"
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                >
                    <option value="">All Regions</option>
                    <option value="Africa">Africa</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="Oceania">Oceania</option>
                    <option value="Americas">Americas</option>
                </select>
            </div>

            {/* Loader */}
            {loading ? (
                <div className="flex justify-center items-center h-96">
                    <div className="relative w-16 h-16">
                        <span className="loading loading-bars loading-lg"></span>
                    </div>
                </div>
            ) : (
                <>
                    <Flag flags={filteredFlags} />

                    {filteredFlags.length === 0 && !loading && (
                        <div role="alert" className="alert alert-warning">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 shrink-0 stroke-current"
                                fill="none"
                                viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <span>Warning: Please reload the page again!</span>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Flags;
