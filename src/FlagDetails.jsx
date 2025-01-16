import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const FlagDetails = () => {
    const { countryId } = useParams();
    const navigate = useNavigate();
    const [flagDetails, setFlagDetails] = useState(null);

    const FlagApi = `https://restcountries.com/v3.1/alpha/${countryId}`;

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(FlagApi);
            const data = await response.json();
            setFlagDetails(data[0]);
        };
        fetchData();
    }, [countryId]);

    if (!flagDetails) {
        return (
            <div className="flex items-center justify-center h-screen">
                <span className="loading loading-infinity loading-lg"></span>
            </div>
        );
    }
    

    return (
        <div className="px-4 py-6 md:px-20 md:py-10 bg-gray-100 dark:bg-gray-800 h-screen">
            <button
                className="bg-gray-500 text-white px-4 py-2 rounded mb-6"
                onClick={() => navigate(-1)}
            >
                ← Back
            </button>
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-10">
                {/* Flag Image */}
                <div className="flex-shrink-0 w-full lg:w-1/2">
                    <img
                        className="w-full h-auto max-h-[300px] object-cover rounded-xl"
                        src={flagDetails.flags.png}
                        alt={flagDetails.name.common}
                    />
                </div>

                {/* Flag Details */}
                <div className="w-full lg:w-1/2">
                    <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-4">
                        {flagDetails.name.common}
                    </h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
                        <div>
                            <p><strong>Native Name:</strong> {flagDetails.name.official}</p>
                            <p>
                                <strong>Population:</strong> {flagDetails.population.toLocaleString()}
                            </p>
                            <p><strong>Region:</strong> {flagDetails.region}</p>
                            <p><strong>Sub Region:</strong> {flagDetails.subregion}</p>
                            <p><strong>Capital:</strong> {flagDetails.capital}</p>
                        </div>
                        <div>
                            <p><strong>Top Level Domain:</strong> {flagDetails.tld}</p>
                            <p>
                                <strong>Currencies:</strong>{" "}
                                {flagDetails.currencies
                                    ? Object.values(flagDetails.currencies)
                                        .map((currency) => currency.name)
                                        .join(", ")
                                    : "N/A"}
                            </p>
                            <p>
                                <strong>Languages:</strong>{" "}
                                {flagDetails.languages
                                    ? Object.values(flagDetails.languages).join(", ")
                                    : "N/A"}
                            </p>
                        </div>
                    </div>

                    {/* Border Countries */}
                    <div className="mt-6">
                        <strong>Border Countries:</strong>{" "}
                        {flagDetails.borders ? (
                            <div className="flex flex-wrap gap-2 mt-2">
                                {flagDetails.borders.map((border) => (
                                    <span
                                        className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-sm rounded-md"
                                        key={border}
                                    >
                                        {border}
                                    </span>
                                ))}
                            </div>
                        ) : (
                            "None"
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlagDetails;
