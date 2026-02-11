"use client";

export default function Services() {
  const services = [
    {
      number: "01",
      title: "Web Design",
      category: "Design",
      description: "Beautiful, responsive designs that engage your audience and deliver exceptional user experiences.",
      color: "from-blue-500 to-cyan-500",
      borderColor: "border-cyan-400",
      shadowColor: "shadow-cyan-400/30",
      hoverShadow: "hover:shadow-cyan-400/60",
    },
    {
      number: "02",
      title: "Custom Apps",
      category: "Development",
      description: "Custom web applications built with modern technologies and best practices.",
      color: "from-purple-500 to-pink-500",
      borderColor: "border-pink-400",
      shadowColor: "shadow-pink-400/30",
      hoverShadow: "hover:shadow-pink-400/60",
    },
    {
      number: "03",
      title: "Hosting Service",
      category: "Infrastructure",
      description: "Professional hosting and deployment services for your applications.",
      color: "from-orange-500 to-yellow-500",
      borderColor: "border-yellow-400",
      shadowColor: "shadow-yellow-400/30",
      hoverShadow: "hover:shadow-yellow-400/60",
    },
    {
      number: "04",
      title: "Maintenance",
      category: "Support",
      description: "Ongoing maintenance and technical support to keep your applications running smoothly.",
      color: "from-green-500 to-emerald-500",
      borderColor: "border-emerald-400",
      shadowColor: "shadow-emerald-400/30",
      hoverShadow: "hover:shadow-emerald-400/60",
    },
  ];

  return (
    <section id="services" className="relative min-h-screen px-4 sm:px-6 lg:px-8 overflow-hidden flex flex-col items-center justify-center py-20">
      <div className="relative max-w-7xl mx-auto z-10 w-full">
        {/* Enhanced Header */}
        <div className="mb-16 relative">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full animate-pulse delay-75"></div>
              <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse delay-150"></div>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-white/40 via-white/20 to-transparent"></div>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Services
          </h2>
          <p className="text-gray-400 mt-4 text-lg">From concept to deployment - your complete digital journey</p>
        </div>

        {/* Supply Chain Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {services.map((service, index) => (
            <div key={index} className="relative">
              {/* Arrow connector on desktop - only between cards, not after last one */}
              {index < services.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-20">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white/40">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
              
              {/* Service Card */}
              <div 
                className={`relative h-72 rounded-2xl overflow-hidden group cursor-pointer transition-all duration-500 hover:scale-105 bg-gray-900/50 backdrop-blur-sm border-2 ${service.borderColor} shadow-xl ${service.shadowColor} ${service.hoverShadow}`}
              >
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                {/* Content */}
                <div className="relative h-full p-6 flex flex-col justify-between">
                  {/* Header */}
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <span className={`text-6xl font-bold bg-gradient-to-br ${service.color} bg-clip-text text-transparent opacity-30 group-hover:opacity-50 transition-opacity`}>
                        {service.number}
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-widest text-gray-500 group-hover:text-gray-400 transition-colors">
                        {service.category}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:translate-x-1 transition-transform">
                      {service.title}
                    </h3>
                  </div>
                  
                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                    {service.description}
                  </p>
                </div>

                {/* Bottom accent line */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${service.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Flow indicator for mobile */}
        <div className="lg:hidden flex justify-center mt-8 gap-2">
          {services.map((_, index) => (
            <div key={index} className="flex items-center">
              <div className="w-2 h-2 bg-white/40 rounded-full"></div>
              {index < services.length - 1 && (
                <div className="w-8 h-px bg-white/20 mx-1"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
