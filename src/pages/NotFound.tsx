import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FrownIcon, Home } from 'lucide-react';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center animate-fade-in">
      <FrownIcon size={64} className="text-gray-400 mb-6" />
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-gray-600 mb-8 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <button
        onClick={() => navigate('/')}
        className="btn btn-primary flex items-center gap-2"
      >
        <Home size={18} />
        <span>Go to Homepage</span>
      </button>
    </div>
  );
};

export default NotFound;