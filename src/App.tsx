// Importing logo images and styles
import logo from './assets/logo_icon.png'
import logo_name from './assets/logo_name.png'
import './App.css'
// Importing React hooks and language constants
import { useState, useRef, useEffect } from 'react';
import { languages } from './constants/languages';

function App() {
  // State for search input, selected language, and dropdown visibility
  const [search, setSearch] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('auto');
  const [showDropdown, setShowDropdown] = useState(false);
  // Ref for the dropdown to detect outside clicks
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter languages based on search input
  const filteredLanguages = languages.filter(lang =>
    lang.name.toLowerCase().includes(search.toLowerCase())
  );

  // Effect to handle closing dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // If click is outside the dropdown, close it
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    // Cleanup event listener on unmount
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle selecting a language from the dropdown
  const handleLanguageSelect = (code: string, name: string) => {
    setSelectedLanguage(code);
    setSearch(name);
    setShowDropdown(false);
  };

  return (
    <>
      {/* Logo and GitHub link */}
      <div className="flex justify-center">
        <a href="https://github.com/baraa01damer/TarjAIma" target="_blank">
          <img
            src={logo}
            className="logo"
            alt="logo"
          />
        </a>
      </div>
      {/* Logo name image */}
      <img
        src={logo_name}
        alt="TarjAIma Logo"
        className="mx-auto my-4 w-48 h-auto"
      />
      <div className="card">
        <div className="flex flex-col items-center gap-2">
          {/* Search with Autocomplete */}
          <div className="relative w-64" ref={dropdownRef}>
            <input
              type="text"
              placeholder="Search input language..."
              className="border rounded p-2 mb-2 w-full"
              value={search}
              onChange={e => {
                setSearch(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
            />
            {/* Autocomplete Dropdown */}
            {showDropdown && filteredLanguages.length > 0 && (
              <div className="absolute z-10 w-full bg-gray border rounded-md shadow-lg max-h-60 overflow-auto">
                {filteredLanguages.map(lang => (
                  <div
                    key={lang.code}
                    className="p-2 hover:bg-black cursor-pointer"
                    onClick={() => handleLanguageSelect(lang.code, lang.name)}
                  >
                    {lang.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Hidden Select for maintaining state */}
          <select
            className="hidden"
            value={selectedLanguage}
            onChange={e => setSelectedLanguage(e.target.value)}
          >
            <option value="auto">Automatic (Default)</option>
            {filteredLanguages.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  )
}

export default App