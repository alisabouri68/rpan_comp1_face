
function NotFoundPage() {

  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4 transition-colors duration-300 overflow-hidden">
     
      
      <div className="max-w-2xl w-full text-center relative z-10">
        {/* Error icon */}
        <div className="mb-8 animate-float">
          <div className="relative inline-block">
            <div className="w-32 h-32 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center glow">
              <i className="fas fa-exclamation-triangle text-white text-5xl"></i>
            </div>
            <div className="absolute -top-2 -right-2 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
              404
            </div>
          </div>
        </div>

        {/* Error text */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
          Page Not Found
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
          Sorry, the page you're looking for doesn't exist or has been removed.
        </p>

        {/* Statistics and information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-lg mx-auto">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md transition-transform hover:scale-105">
            <div className="text-2xl font-bold text-blue-500">98%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Active Pages</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md transition-transform hover:scale-105">
            <div className="text-2xl font-bold text-green-500">2.1M</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Daily Visits</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md transition-transform hover:scale-105">
            <div className="text-2xl font-bold text-purple-500">0.01%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">404 Errors</div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={handleGoHome}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            <i className="fas fa-home"></i>
            Return to Homepage
          </button>
          <button 
            onClick={handleGoBack}
            className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 border border-gray-200 dark:border-gray-700"
          >
            <i className="fas fa-arrow-left"></i>
            Go Back
          </button>
        </div>

        {/* Search */}
        <div className="mt-8 max-w-md mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search the site..."
              className="w-full py-3 px-4 pl-12 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
            <button className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>

        {/* Useful links */}
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
          <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
            Home
          </a>
          <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
            Services
          </a>
          <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
            Products
          </a>
          <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
            Contact Us
          </a>
        </div>
      </div>

      <style >{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .glow {
          box-shadow: 0 0 20px rgba(239, 68, 68, 0.4);
        }
      `}</style>
    </div>
  );
}

export default NotFoundPage;