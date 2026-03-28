import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Loader2, X } from 'lucide-react';

interface Suggestion {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
}

interface PlaceAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onSelect: (lat: number, lon: number, address: string) => void;
  placeholder?: string;
  icon?: React.ReactNode;
  className?: string;
}

const PlaceAutocomplete: React.FC<PlaceAutocompleteProps> = ({
  value,
  onChange,
  onSelect,
  placeholder = "Search location...",
  icon = <MapPin size={16} />,
  className = ""
}) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (value.length < 3) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(value)}&limit=5&addressdetails=1`
        );
        const data = await response.json();
        setSuggestions(data);
        setIsOpen(data.length > 0);
      } catch (error) {
        console.error("Autocomplete error:", error);
      } finally {
        setIsLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [value]);

  const handleSelect = (s: Suggestion) => {
    onSelect(parseFloat(s.lat), parseFloat(s.lon), s.display_name);
    onChange(s.display_name);
    setSuggestions([]);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div className="relative group">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => value.length >= 3 && setSuggestions.length > 0 && setIsOpen(true)}
          placeholder={placeholder}
          className="w-full bg-white border border-gray-200 rounded-lg py-3 pl-11 pr-10 focus:outline-none focus:ring-2 focus:ring-[#d4af37]/20 focus:border-[#d4af37] transition-all text-sm text-gray-900 font-medium shadow-sm group-hover:border-gray-300"
        />
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#d4af37] transition-colors">
          {icon}
        </div>
        
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {isLoading && <Loader2 className="animate-spin text-[#d4af37]" size={16} />}
          {value && (
            <button 
              onClick={() => { onChange(''); setSuggestions([]); setIsOpen(false); }}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {isOpen && suggestions.length > 0 && (
        <div className="absolute z-[1000] w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
            {suggestions.map((s, index) => (
              <button
                key={`${s.place_id}-${index}`}
                onClick={() => handleSelect(s)}
                className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-start gap-3 transition-colors border-b border-gray-50 last:border-0 group"
              >
                <div className="mt-0.5 p-1.5 bg-gray-50 text-gray-400 group-hover:bg-[#d4af37]/10 group-hover:text-[#d4af37] rounded-md transition-colors">
                  <MapPin size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {s.display_name.split(',')[0]}
                  </p>
                  <p className="text-[11px] text-gray-500 truncate leading-relaxed">
                    {s.display_name.split(',').slice(1).join(',').trim()}
                  </p>
                </div>
              </button>
            ))}
          </div>
          <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
            <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Powered by OpenStreetMap</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaceAutocomplete;
