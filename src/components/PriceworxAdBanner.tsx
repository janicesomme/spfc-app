import { useNavigate } from 'react-router-dom';

export const PriceworxAdBanner = () => {
  const navigate = useNavigate();

  return (
    <div
      className="w-full max-w-[340px] sm:max-w-4xl mx-auto rounded-lg p-3 sm:p-6 mb-6 mt-5 flex flex-col"
      style={{
        backgroundColor: '#FFFFFF',
        border: '2px solid #6B46C1'
      }}
    >
      {/* Top Row: Logo and Title */}
      <div className="flex flex-row items-start gap-3 sm:gap-4 mb-2">
        {/* Priceworx Logo */}
        <div className="flex-shrink-0">
          <img
            src="/priceworx-logo.svg"
            alt="Priceworx Logo"
            className="h-16 sm:h-24 w-auto"
          />
        </div>

        {/* Heading */}
        <h2 className="text-black font-bold text-2xl sm:text-3xl mt-3 ml-4">
          Priceworx
        </h2>
      </div>

      {/* Copy Text - Full Width */}
      <p className="text-black text-xs sm:text-sm leading-tight sm:leading-relaxed mb-3">
        Priceworx, our main sponsor for the 2025/26 season, is a specialized software solution for contractors. Priceworx has enabled us to invest in improved facilities and training equipment for the upcoming season, ensuring the team's peak performance and ultimate success on the field.
      </p>

      {/* Learn More Button */}
      <button
        className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 sm:py-2 sm:px-6 rounded transition-colors text-xs sm:text-sm self-center"
        style={{ backgroundColor: '#6B46C1' }}
        onClick={() => navigate('/priceworx')}
      >
        Learn More
      </button>
    </div>
  );
};
