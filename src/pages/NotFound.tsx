
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-angular-light-gray">
      <div className="text-center max-w-md mx-auto p-8 bg-white rounded-lg shadow-md">
        <div className="mb-6">
          <div className="w-24 h-24 bg-angular-red rounded-full mx-auto flex items-center justify-center">
            <span className="text-white text-5xl font-bold">404</span>
          </div>
        </div>
        
        <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-6">
          The page you're looking for doesn't exist or has been moved.
          Please check the URL or return to the home page.
        </p>
        
        <div className="flex justify-center">
          <Button 
            onClick={() => window.location.href = '/'}
            className="bg-angular-red hover:bg-angular-red-dark"
          >
            Return to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
