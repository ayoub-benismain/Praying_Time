import { useState } from "react";

// eslint-disable-next-line no-unused-vars
const DropdownMenu = ({setCity , time}) => {
  const citiesInTunisia = [
    "Tunisia", "Ariana", "Jendouba", "Gabes", "Djerba", "Sousse", "Kef",
    "Monastir", "Sfax", "Mahdia", "Tozeur", "Tataouine", "Mednine",
    "Kairouan", "Sidi Bouzid", "Kebili", "Zaghouane", "Beja", "Ben Arous",
    "Bizerte", "Siliana", "Gafsa", "Manouba", "Nabeul"
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectCity = (city) => {
    setSelectedCity(city);
    setCity(city)
    setIsOpen(false);
  };

  

  return (
    <div className="flex flex-col items-center justify-center z-50">
      <h2 className="text-2xl font-bold mb-4 text-green-700">Select a City</h2>
      <div className="relative inline-block">
        <button
          onClick={toggleDropdown}
          className="w-64 px-4 py-2 text-green-700 bg-white border border-green-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
        >
          {selectedCity || "Choose a city"}
        </button>
        {isOpen && (
          <ul className="absolute left-0 w-64 mt-2 bg-white border border-green-300 rounded-lg shadow-lg z-10 max-h-52 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400">
            {citiesInTunisia.map((city, index) => (
              <li
                key={index}
                onClick={() => handleSelectCity(city)}
                className="px-4 py-2 text-green-700 hover:bg-gray-300 cursor-pointer"
              >
                {city}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DropdownMenu;
