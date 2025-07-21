import React from "react";
import Card from "@/components/atoms/Card";

const Loading = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <Card key={index} className="overflow-hidden">
          <div className="animate-pulse">
            {/* Image skeleton */}
            <div className="w-full h-48 bg-gray-200 shimmer"></div>
            
            <div className="p-4 space-y-3">
              {/* Title skeleton */}
              <div className="h-4 bg-gray-200 rounded shimmer"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 shimmer"></div>
              
              {/* Brand skeleton */}
              <div className="h-3 bg-gray-200 rounded w-1/2 shimmer"></div>
              
              {/* Rating skeleton */}
              <div className="flex items-center gap-2">
                <div className="h-3 bg-gray-200 rounded w-16 shimmer"></div>
                <div className="h-3 bg-gray-200 rounded w-12 shimmer"></div>
              </div>
              
              {/* Price skeleton */}
              <div className="flex items-center gap-2">
                <div className="h-5 bg-gray-200 rounded w-20 shimmer"></div>
                <div className="h-4 bg-gray-200 rounded w-16 shimmer"></div>
              </div>
              
              {/* Button skeleton */}
              <div className="h-8 bg-gray-200 rounded shimmer"></div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Loading;