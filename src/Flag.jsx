import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Flag = ({ flags }) => {
  return (
    <div className="px-6 py-8 bg-gray-100 dark:bg-gray-800">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {flags?.map((flag, index) => (
          <FlagCard key={index} flag={flag} />
        ))}
      </div>
    </div>
  );
};

const FlagCard = ({ flag }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
      <Link to={`/flag/${flag.cca3}`}>
        <div className="w-full h-40 relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-600">
              <div className="loader border-t-2 border-b-2 border-gray-900 rounded-full w-8 h-8 animate-spin"></div>
            </div>
          )}
          <img
            src={flag.flags.png}
            alt={flag.name.common}
            className={`w-full h-40 object-cover transition-opacity duration-500 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={handleImageLoad}
          />
        </div>
      </Link>
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
          {flag.name.common}
        </h2>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          <strong>Population:</strong> {flag.population.toLocaleString()}
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          <strong>Region:</strong> {flag.region}
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          <strong>Capital:</strong> {flag.capital}
        </p>
      </div>
    </div>
  );
};

export default Flag;
