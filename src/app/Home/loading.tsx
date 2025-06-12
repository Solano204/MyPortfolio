"use client";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <div className="flex flex-col items-center space-y-4">
        {/* Custom Spinner */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-gray-700 rounded-full animate-spin border-t-blue-500"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full animate-ping border-t-blue-400"></div>
        </div>
        
        {/* Loading Text */}
        <p className="text-lg font-medium text-gray-300 animate-pulse">
          Cargando portafolio...
        </p>
        
        {/* Progress Dots */}
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
      </div>
    </div>
  );
}
