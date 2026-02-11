export default function Projects() {
  return (
    <section id="featured-projects" className="relative py-44 px-4 sm:px-6 lg:px-8 bg-black dark:bg-black overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/6 w-96 h-96 bg-cyan-400/28 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-2/5 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/6 w-96 h-96 bg-pink-400/28 rounded-full blur-3xl"></div>
      </div>
      <div className="max-w-7xl mx-auto relative">
        <div className="border-t-2 border-white/40 mb-8"></div>
        <h2 className="text-4xl font-bold text-left mb-12">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-900 dark:bg-gray-900 rounded-lg overflow-hidden hover:shadow-xl transition-all border-2 border-cyan-400 shadow-lg shadow-cyan-400/50 hover:shadow-cyan-400/75">
            <div className="h-24 bg-transparent"></div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">E-Commerce Platform</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                A modern, scalable e-commerce solution with advanced features and seamless checkout experience.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full text-sm">Next.js</span>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full text-sm">TypeScript</span>
              </div>
            </div>
          </div>
          <div className="bg-gray-900 dark:bg-gray-900 rounded-lg overflow-hidden hover:shadow-xl transition-all border-2 border-yellow-300 shadow-lg shadow-yellow-300/50 hover:shadow-yellow-300/75">
            <div className="h-24 bg-transparent"></div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Business Dashboard</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Real-time analytics dashboard with interactive charts and comprehensive reporting capabilities.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100 rounded-full text-sm">React</span>
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100 rounded-full text-sm">Tailwind</span>
              </div>
            </div>
          </div>
          <div className="bg-gray-900 dark:bg-gray-900 rounded-lg overflow-hidden hover:shadow-xl transition-all border-2 border-pink-400 shadow-lg shadow-pink-400/50 hover:shadow-pink-400/75">
            <div className="h-24 bg-transparent"></div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Content Management</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Flexible CMS with intuitive interface, making content management simple and efficient.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-full text-sm">Node.js</span>
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-full text-sm">MongoDB</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
