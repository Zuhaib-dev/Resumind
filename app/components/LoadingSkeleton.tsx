import { useEffect, useState } from "react";

interface LoadingSkeletonProps {
    count?: number;
}

export default function LoadingSkeleton({ count = 3 }: LoadingSkeletonProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: count }).map((_, index) => (
                <div
                    key={index}
                    className="resume-card animate-pulse"
                    style={{
                        animationDelay: `${index * 100}ms`,
                    }}
                >
                    {/* Image skeleton */}
                    <div className="w-full h-48 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg mb-4"></div>

                    {/* Title skeleton */}
                    <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-3/4 mb-3"></div>

                    {/* Subtitle skeleton */}
                    <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-1/2 mb-4"></div>

                    {/* Score skeleton */}
                    <div className="flex items-center gap-2">
                        <div className="h-10 w-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full"></div>
                        <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-20"></div>
                    </div>
                </div>
            ))}
        </div>
    );
}
