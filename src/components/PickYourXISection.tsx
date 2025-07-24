import { useState, useEffect } from 'react';
import { supabase } from '../integrations/supabase/client';

interface PlayerImage {
  player_name: string;
  image_url: string;
  position: string;
}

export const PickYourXISection = () => {
  const [players, setPlayers] = useState<PlayerImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlayerImages();
  }, []);

  const fetchPlayerImages = async () => {
    try {
      const { data, error } = await supabase
        .from('player_images')
        .select('player_name, image_url, position')
        .in('player_name', ['Rasmus Hojlund', 'Diogo Dalot', 'Matthijs de Ligt']);

      if (error) {
        console.error('Error fetching player images:', error);
      } else {
        setPlayers(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPlayerByName = (name: string) => {
    return players.find(p => p.player_name.includes(name));
  };

  if (loading) {
    return (
      <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[28rem] bg-black rounded-lg flex items-center justify-center">
        <div className="text-white">Loading players...</div>
      </div>
    );
  }

  const hojlund = getPlayerByName('Hojlund');
  const dalot = getPlayerByName('Dalot');
  const deLigt = getPlayerByName('de Ligt');

  return (
    <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[28rem] rounded-lg overflow-hidden">
      {/* Football pitch background with red and black design */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-900 via-green-600 to-red-900">
        {/* Football pitch overlay */}
        <div 
          className="absolute inset-0 opacity-90"
          style={{
            backgroundImage: `
              linear-gradient(to right, #dc2626 0%, #dc2626 20%, #16a34a 20%, #16a34a 80%, #dc2626 80%, #dc2626 100%),
              linear-gradient(90deg, transparent 24%, white 25%, white 25%, transparent 26%, transparent 74%, white 75%, white 75%, transparent 76%),
              linear-gradient(0deg, transparent 40%, white 41%, white 41%, transparent 42%, transparent 58%, white 59%, white 59%, transparent 60%)
            `,
            backgroundSize: '100% 100%, 100% 100%, 100% 100%'
          }}
        >
          {/* Pitch lines */}
          <div className="absolute inset-0">
            {/* Center circle */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-white rounded-full opacity-50"></div>
            {/* Goal boxes */}
            <div className="absolute top-1/4 left-[20%] w-[15%] h-1/2 border-2 border-white opacity-50"></div>
            <div className="absolute top-1/4 right-[20%] w-[15%] h-1/2 border-2 border-white opacity-50"></div>
          </div>
        </div>
      </div>

      {/* Player circles and images */}
      
      {/* Top center - Hojlund */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28">
          <div className="w-full h-full bg-red-600 rounded-full border-4 border-white flex items-center justify-center">
            {hojlund ? (
              <img 
                src={hojlund.image_url} 
                alt={hojlund.player_name}
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <span className="text-white text-2xl font-bold">+</span>
            )}
          </div>
        </div>
        <div className="text-center mt-2">
          <p className="text-white text-xs sm:text-sm font-bold drop-shadow-lg">
            {hojlund ? hojlund.player_name.toUpperCase() : 'SELECT PLAYER'}
          </p>
        </div>
      </div>

      {/* Bottom left - Dalot */}
      <div className="absolute bottom-16 left-1/4 transform -translate-x-1/2">
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28">
          <div className="w-full h-full bg-red-600 rounded-full border-4 border-white flex items-center justify-center">
            {dalot ? (
              <img 
                src={dalot.image_url} 
                alt={dalot.player_name}
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <span className="text-white text-2xl font-bold">+</span>
            )}
          </div>
        </div>
        <div className="text-center mt-2">
          <p className="text-white text-xs sm:text-sm font-bold drop-shadow-lg">
            {dalot ? dalot.player_name.toUpperCase() : 'SELECT PLAYER'}
          </p>
        </div>
      </div>

      {/* Bottom center - de Ligt */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28">
          <div className="w-full h-full bg-red-600 rounded-full border-4 border-white flex items-center justify-center">
            {deLigt ? (
              <img 
                src={deLigt.image_url} 
                alt={deLigt.player_name}
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <span className="text-white text-2xl font-bold">+</span>
            )}
          </div>
        </div>
        <div className="text-center mt-2">
          <p className="text-white text-xs sm:text-sm font-bold drop-shadow-lg">
            {deLigt ? deLigt.player_name.toUpperCase() : 'SELECT PLAYER'}
          </p>
        </div>
      </div>

      {/* Bottom right - de Ligt */}
      <div className="absolute bottom-16 right-1/4 transform translate-x-1/2">
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28">
          <div className="w-full h-full bg-red-600 rounded-full border-4 border-white flex items-center justify-center">
            {deLigt ? (
              <img 
                src={deLigt.image_url} 
                alt={deLigt.player_name}
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <span className="text-white text-2xl font-bold">+</span>
            )}
          </div>
        </div>
        <div className="text-center mt-2">
          <p className="text-white text-xs sm:text-sm font-bold drop-shadow-lg">
            {deLigt ? deLigt.player_name.toUpperCase() : 'SELECT PLAYER'}
          </p>
        </div>
      </div>

      {/* Other placeholder circles */}
      <div className="absolute top-1/3 left-1/6 transform -translate-x-1/2">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-600 rounded-full border-4 border-white flex items-center justify-center">
          <span className="text-white text-xl font-bold">+</span>
        </div>
      </div>

      <div className="absolute top-1/3 right-1/6 transform translate-x-1/2">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-600 rounded-full border-4 border-white flex items-center justify-center">
          <span className="text-white text-xl font-bold">+</span>
        </div>
      </div>

      {/* Bottom text */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
        <h2 className="text-white text-lg sm:text-xl md:text-2xl font-black tracking-wider drop-shadow-lg">
          SELECT YOUR STARTING XI
        </h2>
      </div>
    </div>
  );
};
