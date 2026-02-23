import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md border border-gray-200">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-4">
            <span className="text-3xl">🚪</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            Sign Out
          </h1>
          <p className="text-gray-600 mt-2">
            You're about to leave your account
          </p>
        </div>

        {/* Warning Message */}
        <div className="bg-red-50 border border-red-100 rounded-lg p-4 mb-8">
          <div className="flex items-start">
            <span className="text-red-500 mr-2">⚠️</span>
            <div>
              <p className="text-sm text-red-800 font-medium">
                You will be logged out from all devices
              </p>
              <p className="text-xs text-red-600 mt-1">
                You'll need to sign in again to access your account
              </p>
            </div>
          </div>
        </div>

        {/* Button Group */}
        <div className="space-y-4">
          
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 text-white font-semibold py-3.5 
              rounded-lg hover:bg-red-700 active:bg-red-800 
              transition-colors shadow-sm hover:shadow-md"
          >
            Yes, Logout
          </button>
          
          <button
            onClick={() => navigate(-1)}
            className="w-full border border-gray-300 text-gray-700 font-medium py-3.5 
              rounded-lg hover:bg-gray-50 active:bg-gray-100 
              transition-colors"
          >
            Go Back
          </button>

        </div>

        {/* Footer Note */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Need help?{" "}
            <span 
              className="text-blue-600 hover:text-blue-800 cursor-pointer font-medium"
              onClick={() => navigate("/contact")}
            >
              Contact Support
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Logout;