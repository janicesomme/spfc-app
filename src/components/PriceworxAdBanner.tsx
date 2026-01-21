export const PriceworxAdBanner = () => {
  return (
    <div
      className="w-full max-w-[340px] sm:max-w-4xl mx-auto rounded-lg p-3 sm:p-6 mb-6 mt-5 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4"
      style={{
        backgroundColor: '#FFFFFF',
        border: '2px solid #6B46C1'
      }}
    >
      {/* Priceworx Logo - Mobile: 60px, Desktop: 90px (75% of ~120px container height) */}
      <div className="flex-shrink-0">
        <img
          src="/priceworx-logo.svg"
          alt="Priceworx Logo"
          className="h-16 sm:h-24 w-auto"
        />
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col items-center">
        {/* Heading - Mobile: 1.25rem, Desktop: 1.875rem (2x copy size) */}
        <h2 className="text-black font-bold text-xl sm:text-2xl mb-2 text-center">
          Priceworx
        </h2>

        {/* Copy Text - Mobile: 0.75rem, Desktop: 0.875rem */}
        <p className="text-black text-xs sm:text-sm leading-tight sm:leading-relaxed text-center mb-2 sm:mb-3">
          Priceworx, our main sponsor for the 2025/26 season, is a specialized software solution for contractors. Priceworx has enabled us to invest in improved facilities and training equipment for the upcoming season, ensuring the team's peak performance and ultimate success on the field.
        </p>

        {/* Learn More Button */}
        <button
          className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 sm:py-2 sm:px-6 rounded transition-colors text-xs sm:text-sm"
          style={{ backgroundColor: '#6B46C1' }}
          onClick={() => window.open('https://priceworx.com', '_blank')}
        >
          Learn More
        </button>
      </div>
    </div>
  );
};
