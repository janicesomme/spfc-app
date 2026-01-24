import { useNavigate } from 'react-router-dom';

export const JoinRevolutionBanner = () => {
  const navigate = useNavigate();

  return (
    <div
      className="w-full max-w-[340px] sm:max-w-4xl mx-auto rounded-lg p-4 sm:p-6 mb-6 flex flex-col items-center"
      style={{
        backgroundColor: '#EC1C24',
        border: '2px solid #FFFFFF'
      }}
    >
      {/* Heading - Mobile: 1.25rem, Desktop: 1.875rem (2x copy size) */}
      <h2 className="text-white font-bold text-xl sm:text-2xl mb-3 text-center">
        Join the Revolution
      </h2>

      {/* Copy Text - Mobile: 0.75rem, Desktop: 0.875rem */}
      <p className="text-white text-xs sm:text-sm leading-tight sm:leading-relaxed text-center mb-4 sm:mb-5">
        Become a part of something bigger than just a game. Stretford Paddock FC is not just driven by passion for football; it's powered by its members. As a 100% fan-owned club, every decision, from the field to the boardroom, is influenced by our members. Join us today and turn your love for football into a direct impact on the club's future.
      </p>

      {/* Join Now Button */}
      <button
        className="bg-black hover:bg-gray-900 text-white font-bold py-2 px-6 sm:py-2 sm:px-8 rounded transition-colors text-xs sm:text-sm"
        onClick={() => navigate('/membership')}
      >
        Join Now!
      </button>
    </div>
  );
};
