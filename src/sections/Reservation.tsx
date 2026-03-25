import React, { useState, useEffect } from 'react';
import { 
  User, 
  Briefcase, 
  Clock, 
  Plus, 
  Minus, 
  ChevronDown, 
  CalendarDays,
  MapPin,
  Send,
  Check,
  ChevronRight,
  ChevronLeft,
  Mail,
  Phone,
  MessageSquare
} from 'lucide-react';
import { reservationConfig, emailJSConfig, productsConfig } from '../config';

import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import emailjs from '@emailjs/browser';
import { toast } from 'sonner';

// Custom icons for Pickup and Drop-off in GOLD
const pickupIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', 
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
  className: 'pickup-marker gold-icon-filter' // We'll add a CSS filter to make it gold
});

const dropoffIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/447/447031.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
  className: 'dropoff-marker gold-icon-filter'
});

// Component to handle map view updates
const MapUpdater: React.FC<{ points: [number, number][] }> = ({ points }) => {
  const map = useMap();
  
  useEffect(() => {
    if (points.length > 0) {
      const bounds = L.latLngBounds(points);
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
    }
  }, [points, map]);

  return null;
};

const Reservation: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [passengers, setPassengers] = useState(1);
  const [luggage, setLuggage] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Step 1: Ride Info State
  const [serviceType, setServiceType] = useState(reservationConfig.serviceTypes[0]);
  const [pickupDate, setPickupDate] = useState('2024-03-24');
  const [pickupTime, setPickupTime] = useState('09:00');
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [pickupCoords, setPickupCoords] = useState<[number, number] | null>(null);
  const [dropoffCoords, setDropoffCoords] = useState<[number, number] | null>(null);

  // Step 2: Vehicle Selection State
  const [selectedVehicle, setSelectedVehicle] = useState<typeof productsConfig.products[0] | null>(null);

  // Step 3: Final Details State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');

  // Default center (NYC)
  const defaultCenter: [number, number] = [40.7128, -74.0060];

  const incrementPassengers = () => setPassengers(prev => prev + 1);
  const decrementPassengers = () => setPassengers(prev => (prev > 1 ? prev - 1 : 1));

  const incrementLuggage = () => setLuggage(prev => prev + 1);
  const decrementLuggage = () => setLuggage(prev => (prev > 0 ? prev - 1 : 0));

  // Geocoding function using Nominatim
  const geocode = async (address: string, setCoords: (coords: [number, number] | null) => void) => {
    if (!address || address.length < 3) return;
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`);
      const data = await response.json();
      if (data && data.length > 0) {
        setCoords([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
      }
    } catch (error) {
      console.error("Geocoding error:", error);
    }
  };

  // Debounce geocoding
  useEffect(() => {
    const timer = setTimeout(() => geocode(pickupLocation, setPickupCoords), 1000);
    return () => clearTimeout(timer);
  }, [pickupLocation]);

  useEffect(() => {
    const timer = setTimeout(() => geocode(dropoffLocation, setDropoffCoords), 1000);
    return () => clearTimeout(timer);
  }, [dropoffLocation]);

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!pickupLocation || !dropoffLocation) {
        toast.error('Please enter pickup and dropoff locations');
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!selectedVehicle) {
        toast.error('Please select a vehicle');
        return;
      }
      setCurrentStep(3);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => (prev > 1 ? prev - 1 : 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phoneNumber) {
      toast.error('Please fill in all required contact details');
      return;
    }

    setIsSubmitting(true);

    const templateParams = {
      customer_name: fullName,
      customer_email: email,
      customer_phone: phoneNumber,
      service_type: serviceType,
      pickup_date: pickupDate,
      pickup_time: pickupTime,
      pickup_location: pickupLocation,
      dropoff_location: dropoffLocation,
      vehicle: selectedVehicle?.name,
      passengers: passengers,
      luggage: luggage,
      notes: specialNotes
    };

    try {
      await emailjs.send(
        emailJSConfig.reservationServiceId,
        emailJSConfig.reservationTemplateId,
        templateParams,
        emailJSConfig.publicKey
      );
      toast.success('Reservation request sent successfully!');
      setTimeout(() => {
        setCurrentStep(1);
        setPickupLocation('');
        setDropoffLocation('');
        setFullName('');
        setEmail('');
        setPhoneNumber('');
        setSelectedVehicle(null);
      }, 3000);
    } catch (error) {
      console.error('EmailJS Error:', error);
      toast.error('Failed to send reservation request.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const points: [number, number][] = [];
  if (pickupCoords) points.push(pickupCoords);
  if (dropoffCoords) points.push(dropoffCoords);

  const StepIndicator = ({ stepId, title }: { stepId: number, title: string }) => (
    <div className={`flex items-center gap-4 p-3 rounded transition-all ${currentStep === stepId ? 'bg-black/5' : 'bg-transparent filter opacity-50 grayscale'}`}>
      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${currentStep === stepId ? 'border-[#d4af37]' : 'border-gray-400'}`}>
        {currentStep > stepId ? (
          <Check size={12} className="text-[#d4af37]" strokeWidth={3} />
        ) : (
          <div className={`w-2 h-2 rounded-full ${currentStep === stepId ? 'bg-[#d4af37]' : 'bg-transparent'}`} />
        )}
      </div>
      <span className={`font-bold text-sm md:text-base ${currentStep === stepId ? 'text-black' : 'text-gray-500'}`}>
        Step {stepId}: {title}
      </span>
    </div>
  );

  return (
    <section id="reservation" className="py-20 bg-[#0a0a0a]/5 min-h-screen">
      <style>{`
        .gold-icon-filter {
            filter: invert(72%) sepia(21%) saturate(1001%) hue-rotate(7deg) brightness(97%) contrast(85%);
        }
        .leaflet-container {
            z-index: 0 !important;
        }
      `}</style>
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100">
          {/* Header Action */}
          <div className="px-8 py-4 border-b border-gray-100 bg-white">
            <div className="flex items-center gap-2 text-[#d4af37] font-medium text-sm">
              <span className="text-lg">✎</span>
              <span className="uppercase tracking-tight font-black">Secure Reservation Portal</span>
            </div>
          </div>

          <div className="p-8">
            {/* Step Indicators */}
            <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-gray-50 pb-6">
              <StepIndicator stepId={1} title="Ride Info" />
              <StepIndicator stepId={2} title="Select Vehicle" />
              <StepIndicator stepId={3} title="Final Details" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Form Content */}
              <div className="min-h-[450px] flex flex-col">
                {currentStep === 1 && (
                  <div className="space-y-6 animate-in fade-in duration-500">
                    <div>
                      <label className="block text-[13px] font-bold text-gray-700 mb-1.5 uppercase">Service Type</label>
                      <div className="relative">
                        <select 
                          value={serviceType}
                          onChange={(e) => setServiceType(e.target.value)}
                          className="w-full bg-white border border-gray-200 rounded py-2.5 px-3 appearance-none focus:outline-none focus:ring-1 focus:ring-[#d4af37] transition-all text-sm text-gray-900 font-medium"
                        >
                          {reservationConfig.serviceTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[13px] font-bold text-gray-700 mb-1.5 uppercase">Pick-Up Date</label>
                        <div className="relative">
                          <input 
                            type="date" 
                            value={pickupDate}
                            onChange={(e) => setPickupDate(e.target.value)}
                            className="w-full bg-white border border-gray-200 rounded py-2.5 px-3 focus:outline-none focus:ring-1 focus:ring-[#d4af37] transition-all text-sm text-gray-900"
                          />
                          <CalendarDays className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[13px] font-bold text-gray-700 mb-1.5 uppercase">Pick-Up Time</label>
                        <div className="relative">
                          <input 
                            type="time" 
                            value={pickupTime}
                            onChange={(e) => setPickupTime(e.target.value)}
                            className="w-full bg-white border border-gray-200 rounded py-2.5 px-3 focus:outline-none focus:ring-1 focus:ring-[#d4af37] transition-all text-sm text-gray-900"
                          />
                          <Clock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[13px] font-bold text-gray-700 mb-1.5 uppercase">Pick-Up Location</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          placeholder="Address, Airport, or Hotel"
                          value={pickupLocation}
                          onChange={(e) => setPickupLocation(e.target.value)}
                          className="w-full bg-white border border-gray-200 rounded py-2.5 px-3 focus:outline-none focus:ring-1 focus:ring-[#d4af37] transition-all text-sm text-gray-900 placeholder:text-gray-400 font-medium"
                        />
                        <MapPin className={`absolute right-3 top-1/2 -translate-y-1/2 ${pickupCoords ? 'text-[#d4af37]' : 'text-gray-300'}`} size={16} />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[13px] font-bold text-gray-700 mb-1.5 uppercase">Drop-Off Location</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          placeholder="Destination address"
                          value={dropoffLocation}
                          onChange={(e) => setDropoffLocation(e.target.value)}
                          className="w-full bg-white border border-gray-200 rounded py-2.5 px-3 focus:outline-none focus:ring-1 focus:ring-[#d4af37] transition-all text-sm text-gray-900 placeholder:text-gray-400 font-medium"
                        />
                        <MapPin className={`absolute right-3 top-1/2 -translate-y-1/2 ${dropoffCoords ? 'text-[#d4af37]' : 'text-gray-300'}`} size={16} />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[13px] font-bold text-gray-700 mb-1.5 uppercase">Passengers</label>
                        <div className="flex items-center bg-gray-50 border border-gray-100 rounded h-11 px-3">
                          <User size={18} className="text-[#d4af37] mr-2" />
                          <div className="flex items-center ml-auto">
                            <button type="button" onClick={decrementPassengers} className="p-1.5 text-gray-400 hover:text-[#d4af37] transition-colors"><Minus size={14} /></button>
                            <input type="text" readOnly value={passengers} className="w-8 text-center bg-transparent outline-none font-bold text-gray-900 text-sm" />
                            <button type="button" onClick={incrementPassengers} className="p-1.5 text-gray-400 hover:text-[#d4af37] transition-colors"><Plus size={14} /></button>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-[13px] font-bold text-gray-700 mb-1.5 uppercase">Luggage</label>
                        <div className="flex items-center bg-gray-50 border border-gray-100 rounded h-11 px-3">
                          <Briefcase size={18} className="text-[#d4af37] mr-2" />
                          <div className="flex items-center ml-auto">
                            <button type="button" onClick={decrementLuggage} className="p-1.5 text-gray-400 hover:text-[#d4af37] transition-colors"><Minus size={14} /></button>
                            <input type="text" readOnly value={luggage} className="w-8 text-center bg-transparent outline-none font-bold text-gray-900 text-sm" />
                            <button type="button" onClick={incrementLuggage} className="p-1.5 text-gray-400 hover:text-[#d4af37] transition-colors"><Plus size={14} /></button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={handleNextStep}
                      className="w-full bg-[#d4af37] hover:bg-[#c49f27] text-black font-black py-4 px-6 rounded transition-all shadow-md mt-6 uppercase text-sm tracking-wide flex items-center justify-center gap-2 group"
                    >
                      {reservationConfig.selectVehicleText}
                      <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-6 animate-in slide-in-from-right duration-500 flex-grow flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-gray-900 text-lg uppercase">Select Your Luxury Fleet</h3>
                      <button onClick={handlePrevStep} className="text-gray-500 hover:text-[#d4af37] flex items-center gap-1 text-xs font-bold uppercase transition-colors">
                        <ChevronLeft size={16} /> Back
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                      {productsConfig.products.map((vehicle) => (
                        <div 
                          key={vehicle.id}
                          onClick={() => setSelectedVehicle(vehicle)}
                          className={`relative cursor-pointer group rounded-lg border-2 transition-all overflow-hidden ${
                            selectedVehicle?.id === vehicle.id 
                              ? 'border-[#d4af37] bg-gray-50 shadow-md' 
                              : 'border-gray-100 hover:border-[#d4af37]/30 bg-white'
                          }`}
                        >
                          <div className="aspect-[16/9] overflow-hidden">
                            <img 
                              src={vehicle.image} 
                              alt={vehicle.name} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <div className="p-3">
                            <div className="flex justify-between items-center mb-1">
                              <h4 className="font-bold text-gray-900 text-sm">{vehicle.name}</h4>
                              {selectedVehicle?.id === vehicle.id && (
                                <div className="bg-[#d4af37] text-black rounded-full p-0.5 animate-in zoom-in">
                                  <Check size={12} />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-auto pt-6 border-t border-gray-100">
                      <button 
                        onClick={handleNextStep}
                        className="w-full bg-black text-white hover:bg-gray-800 font-bold py-4 px-6 rounded transition-all shadow-md uppercase text-sm tracking-wide flex items-center justify-center gap-2 group"
                      >
                        Proceed to Details
                        <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <form onSubmit={handleSubmit} className="space-y-6 animate-in slide-in-from-right duration-500">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-gray-900 text-lg uppercase tracking-tight">Final Information</h3>
                        <button type="button" onClick={handlePrevStep} className="text-gray-500 hover:text-[#d4af37] flex items-center gap-1 text-xs font-bold uppercase transition-colors">
                          <ChevronLeft size={16} /> Back
                        </button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-[11px] font-bold text-gray-500 mb-1 uppercase tracking-wider">Full Name *</label>
                        <div className="relative">
                          <input 
                            type="text" 
                            required
                            placeholder="John Doe"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full bg-white border border-gray-200 rounded py-2.5 pl-10 pr-3 focus:outline-none focus:ring-1 focus:ring-[#d4af37] transition-all text-sm text-gray-900 font-medium"
                          />
                          <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-bold text-gray-500 mb-1 uppercase tracking-wider">Email Address *</label>
                          <div className="relative">
                            <input 
                              type="email" 
                              required
                              placeholder="john@example.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full bg-white border border-gray-200 rounded py-2.5 pl-10 pr-3 focus:outline-none focus:ring-1 focus:ring-[#d4af37] transition-all text-sm text-gray-900 font-medium"
                            />
                            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-gray-500 mb-1 uppercase tracking-wider">Phone Number *</label>
                          <div className="relative">
                            <input 
                              type="tel" 
                              required
                              placeholder="+1 (555) 000-0000"
                              value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value)}
                              className="w-full bg-white border border-gray-200 rounded py-2.5 pl-10 pr-3 focus:outline-none focus:ring-1 focus:ring-[#d4af37] transition-all text-sm text-gray-900 font-medium"
                            />
                            <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-gray-500 mb-1 uppercase tracking-wider">Special Requests</label>
                        <div className="relative">
                          <textarea 
                            placeholder="Any extra details (e.g. child seat, specific route)..."
                            rows={3}
                            value={specialNotes}
                            onChange={(e) => setSpecialNotes(e.target.value)}
                            className="w-full bg-white border border-gray-200 rounded py-2.5 pl-10 pr-3 focus:outline-none focus:ring-1 focus:ring-[#d4af37] transition-all text-sm text-gray-900 font-medium resize-none"
                          />
                          <MessageSquare size={16} className="absolute left-3 top-4 text-gray-400" />
                        </div>
                      </div>
                    </div>

                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#d4af37] hover:bg-[#c49f27] text-black font-black py-4 px-6 rounded transition-all shadow-md mt-4 uppercase text-sm tracking-wide disabled:opacity-70 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        'Processing Booking...'
                      ) : (
                        <>
                          Complete Reservation
                          <Send size={16} />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>

              {/* Summary / Map Side */}
              <div className="flex flex-col gap-6">
                {/* Summary Card for Steps 2 & 3 */}
                {currentStep > 1 && (
                  <div className="bg-[#f9fafb] border border-gray-100 rounded p-6 space-y-4 animate-in fade-in duration-500">
                    <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider border-b border-gray-200 pb-2">Booking Summary</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <span className="text-xs text-gray-500 font-medium">Route:</span>
                        <div className="text-right">
                          <p className="text-[11px] font-bold text-gray-900">{pickupLocation}</p>
                          <ChevronDown size={12} className="mx-auto my-1 text-gray-300" />
                          <p className="text-[11px] font-bold text-gray-900">{dropoffLocation}</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500 font-medium">Service:</span>
                        <span className="text-xs font-bold text-gray-900">{serviceType}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500 font-medium">Date & Time:</span>
                        <span className="text-xs font-bold text-gray-900">{pickupDate} @ {pickupTime}</span>
                      </div>
                      {selectedVehicle && (
                        <div className="flex justify-between items-center pt-2 border-t border-dashed border-gray-200">
                          <span className="text-xs text-gray-500 font-medium">Selected Car:</span>
                          <span className="text-xs font-bold text-[#d4af37]">{selectedVehicle.name}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Map Holder */}
                <div className="w-full h-full min-h-[300px] flex-grow rounded relative overflow-hidden border border-gray-100 shadow-inner bg-[#f3f4f6]">
                  <MapContainer 
                    center={defaultCenter} 
                    zoom={13} 
                    scrollWheelZoom={false}
                    className="w-full h-full min-h-[300px]"
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
                      url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png"
                    />
                    
                    {pickupCoords && (
                      <Marker position={pickupCoords} icon={pickupIcon}>
                        <Popup>
                          <div className="font-bold text-gray-900">Pick-Up</div>
                          <div className="text-xs text-gray-700">{pickupLocation}</div>
                        </Popup>
                      </Marker>
                    )}

                    {dropoffCoords && (
                      <Marker position={dropoffCoords} icon={dropoffIcon}>
                        <Popup>
                          <div className="font-bold text-gray-900">Drop-Off</div>
                          <div className="text-xs text-gray-700">{dropoffLocation}</div>
                        </Popup>
                      </Marker>
                    )}

                    {pickupCoords && dropoffCoords && (
                      <Polyline 
                        positions={[pickupCoords, dropoffCoords]} 
                        color="#d4af37" 
                        weight={3} 
                        dashArray="5, 10"
                        opacity={0.6}
                      />
                    )}

                    <MapUpdater points={points} />
                  </MapContainer>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white px-8 py-6 border-t border-gray-100 text-center">
            <span className="text-[#d4af37] text-[13px] cursor-pointer hover:underline font-bold uppercase tracking-tight">Standard Privacy Terms Apply</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reservation;
