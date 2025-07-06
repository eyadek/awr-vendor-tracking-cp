'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { doc, onSnapshot, getFirestore, Timestamp } from 'firebase/firestore';
import firebaseApp from '@/lib/firebase';
import { getTripById } from '@/lib/trips';

const db = getFirestore(firebaseApp);

export default function TripDetailsPage() {
  const { id } = useParams();
  const [trip, setTrip] = useState<any | null>(null);
  const [driverLocation, setDriverLocation] = useState<{ lat: number; lng: number; lastUpdated: Timestamp } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  useEffect(() => {
    if (!id) return;
    let unsub: undefined | (() => void);

    async function loadTrip() {
      try {
        const data = await getTripById(id as string);
        console.log('Fetched trip data:', data);
        if (!data) {
          setError('Trip not found.');
          return;
        }
        setTrip(data);
        const locRef = doc(db, 'trips', id as string);
        unsub = onSnapshot(locRef, (snapshot) => {
          const loc = snapshot.data();
          if (loc && loc.currentLocation) {
            setDriverLocation({ lat: loc.currentLocation._lat, lng: loc.currentLocation._long , lastUpdated: loc.lastUpdated });
          } else {
            setDriverLocation(null);
          }
        });
      } catch (err: any) {
        setError('Failed to fetch trip data.');
        console.error('Error loading trip:', err);
      }
    }

    loadTrip();
    return () => {
      if (unsub) unsub();
    };
  }, [id]);

  function parseCoord(str: string) {
    if (!str) return null;
    const [lat, lng] = str.split(',').map(Number);
    if (isNaN(lat) || isNaN(lng)) return null;
    return { lat, lng };
  }

  if (error) return <p className="text-red-500 p-6">{error}</p>;
  if (!trip || !isLoaded) return <p>Loading...</p>;

  const start = trip.startLocation ? parseCoord(trip.startLocation) : null;
  const end = trip.endLocation ? parseCoord(trip.endLocation) : null;
  const center = driverLocation || start || end || { lat: 0.0, lng: 0.0};

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Trip Details</h1>
      <div className="bg-gray-100 rounded shadow p-4">
        <p><strong>Trip ID:</strong> {trip._id}</p>
        <p><strong>Description:</strong> {trip.description}</p>
        <p><strong>Start Position:</strong> {trip.startLocation}</p>
        <p><strong>Current Position:</strong> {driverLocation?.lat}, {driverLocation?.lng}</p>
        <p><strong>End Position:</strong> {trip.tripStatus=="Completed"?trip.endLocation:'-'}</p>
        <p><strong>Status:</strong> {trip.tripStatus}</p>
        <p><strong>Last Update:</strong> {driverLocation?.lastUpdated?.toDate().toLocaleString() ?? 'N/A'}</p>

      </div>
      <div className="h-[500px] w-full rounded shadow overflow-hidden">
        <GoogleMap
          mapContainerStyle={{ height: '100%', width: '100%' }}
          center={center}
          zoom={13}
        >
          {start && <Marker position={start} label="A" />}
          {end && <Marker position={end} label="B" />}
          {driverLocation && <Marker position={driverLocation} label="Driver" />}
        </GoogleMap>
      </div>
    </div>
  );
}
