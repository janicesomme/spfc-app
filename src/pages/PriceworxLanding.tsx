export default function PriceworxLanding() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div
        className="w-full py-12 sm:py-16 px-4"
        style={{
          background: 'linear-gradient(135deg, #8D65E9 0%, #6BCD94 100%)',
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <img
              src="/priceworx-logo.svg"
              alt="Priceworx Logo"
              className="h-20 sm:h-28 w-auto"
            />
          </div>
          <h1 className="text-white font-bold text-4xl sm:text-5xl mb-4">
            Priceworx
          </h1>
          <p className="text-white text-lg sm:text-xl mb-2">
            Our Main Sponsor
          </p>
          <p className="text-white/90 text-base sm:text-lg max-w-2xl mx-auto">
            Transforming construction project management with innovative software solutions
          </p>
        </div>
      </div>

      {/* About Section */}
      <div className="px-4 sm:px-8 py-12 sm:py-16 max-w-4xl mx-auto">
        <div className="bg-gray-50 rounded-lg p-6 sm:p-8 border border-gray-200">
          <h2 className="text-youtube-yellow text-2xl sm:text-3xl font-bold mb-4">
            What Priceworx Does
          </h2>
          <p className="text-black text-base sm:text-lg leading-relaxed mb-4">
            Priceworx is a specialized software solution designed for contractors and construction professionals. It streamlines project management, enhances team collaboration, and provides powerful tools to manage projects efficiently from start to finish.
          </p>
          <p className="text-black text-base sm:text-lg leading-relaxed">
            As our main sponsor for the 2025/26 season, Priceworx has enabled Stretford Paddock FC to invest in improved facilities and training equipment, ensuring the team's peak performance and ultimate success on the field.
          </p>
        </div>
      </div>

      {/* Key Features */}
      <div className="px-4 sm:px-8 py-12 sm:py-16 max-w-4xl mx-auto">
        <h2 className="text-youtube-yellow text-2xl sm:text-3xl font-bold text-center mb-8">
          Key Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            {
              title: 'Project Management',
              desc: 'Streamlined project tracking and organization'
            },
            {
              title: 'Team Collaboration',
              desc: 'Real-time communication and file sharing'
            },
            {
              title: 'Resource Planning',
              desc: 'Efficient allocation and scheduling'
            },
            {
              title: 'Budget Control',
              desc: 'Track costs and manage project finances'
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="bg-gray-50 rounded-lg p-6 border border-gray-200"
              style={{
                borderLeftColor: '#8D65E9',
                borderLeftWidth: '4px',
              }}
            >
              <h3 className="text-black font-bold text-lg mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-700 text-sm sm:text-base">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-4 sm:px-8 py-12 sm:py-16 max-w-4xl mx-auto">
        <div
          className="rounded-lg p-8 sm:p-12 text-center"
          style={{
            background: 'linear-gradient(135deg, #8D65E9 0%, #6BCD94 100%)',
          }}
        >
          <h2 className="text-white font-bold text-2xl sm:text-3xl mb-4">
            Learn More About Priceworx
          </h2>
          <p className="text-white/90 text-base sm:text-lg mb-6">
            Discover how Priceworx can transform your construction projects
          </p>
          <a
            href="https://priceworx.co.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white hover:bg-gray-100 text-purple-700 font-bold py-3 px-8 rounded-lg transition-colors text-base sm:text-lg"
          >
            Visit Priceworx Website
          </a>
        </div>
      </div>

      {/* Spacing */}
      <div className="h-12" />
    </div>
  );
}
