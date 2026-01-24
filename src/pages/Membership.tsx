import { useNavigate } from 'react-router-dom';

export default function Membership() {
  const navigate = useNavigate();

  const benefits = [
    {
      title: 'Vote on Key Decisions',
      description: 'From club structure and ticket pricing to major initiatives and ethical standards. Your voice matters in every club decision.'
    },
    {
      title: 'Exclusive Updates',
      description: 'Stay informed with insider insights and regular updates directly to your inbox.'
    },
    {
      title: 'Community Impact',
      description: 'Be part of a club that values community engagement and development, both locally and in the broader football community.'
    },
    {
      title: 'Future Ready',
      description: 'Get ready to enhance your experience with our upcoming dedicated app that keeps you connected and engaged, wherever you are.'
    }
  ];

  const whyJoin = [
    {
      title: 'Empowerment',
      description: 'Every member has an equal say in the direction of the club. Here, your opinions and votes directly shape the club\'s path.'
    },
    {
      title: 'Inclusivity',
      description: 'We are a club for everyone. No matter where you are, there\'s a place for you in Stretford Paddock FC.'
    },
    {
      title: 'Transparency',
      description: 'Clear and open communication about club operations and decisions ensures you\'re always in the loop.'
    },
    {
      title: 'Be More Than a Fan',
      description: 'Stretford Paddock FC offers more than just a spectator experience. It\'s an opportunity to be part of a club that you can truly call your own. Influence the game, meet fellow football enthusiasts, and contribute to a legacy of transparency, community, and passion.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Banner Section */}
      <div className="w-full">
        <img
          src="/member page header.png"
          alt="Fan Ownership Banner"
          className="w-full h-auto object-cover"
        />
      </div>

      {/* 100% Fan Owned Text */}
      <div className="px-4 sm:px-8 py-4 sm:py-6 max-w-4xl mx-auto text-center">
        <h1 className="text-red-600 font-bold text-4xl sm:text-5xl">
          100% FAN OWNED
        </h1>
      </div>

      {/* Membership Benefits Section */}
      <div className="px-4 sm:px-8 py-6 sm:py-8 max-w-4xl mx-auto">
        <h2 className="text-red-600 font-bold text-3xl sm:text-4xl mb-4">
          Membership Benefits:
        </h2>

        <div className="space-y-4">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="mb-4">
              <h3 className="text-red-600 font-bold text-xl sm:text-2xl mb-1">
                {benefit.title}:
              </h3>
              <p className="text-black text-base sm:text-lg leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Why Join Section */}
      <div className="px-4 sm:px-8 py-6 sm:py-8 max-w-4xl mx-auto border-t border-gray-200">
        <h2 className="text-red-600 font-bold text-3xl sm:text-4xl mb-4">
          Why Join Stretford Paddock FC?
        </h2>

        <div className="space-y-4">
          {whyJoin.map((item, idx) => (
            <div key={idx} className="mb-4">
              <h3 className="text-red-600 font-bold text-xl sm:text-2xl mb-1">
                {item.title}:
              </h3>
              <p className="text-black text-base sm:text-lg leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-4 sm:px-8 py-6 sm:py-8 max-w-4xl mx-auto text-center">
        <button
          onClick={() => window.open('https://app.joinit.com/o/stretford-paddock-fc/FhfLAJrvytM6RrRwy', '_blank')}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg"
        >
          Join Now
        </button>
      </div>

      {/* Spacing */}
      <div className="h-12" />
    </div>
  );
}
