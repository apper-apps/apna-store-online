import React from "react";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <div className="flex justify-center items-center min-h-[400px]">
      <Card className="p-8 text-center max-w-md">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-error to-warning rounded-full flex items-center justify-center">
          <ApperIcon name="AlertTriangle" className="w-8 h-8 text-white" />
        </div>
        
        <h3 className="text-lg font-semibold text-secondary mb-2">
          Oops! Something went wrong
        </h3>
        
        <p className="text-gray-600 mb-6">
          {message}
        </p>
        
        {onRetry && (
          <Button onClick={onRetry} className="w-full">
            <ApperIcon name="RefreshCw" className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        )}
      </Card>
    </div>
  );
};

export default Error;