export function StoryFormSkeleton() {
    return (
      <div className="space-y-4 lg:space-y-6 p-2 lg:p-0">
        {/* Header Skeleton */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 lg:gap-4">
          <div className="flex items-center gap-3">
            <div className="lg:hidden w-9 h-9 bg-gray-200 rounded-md animate-pulse" />
            <div>
              <div className="w-32 h-6 bg-gray-200 rounded animate-pulse mb-2" />
              <div className="w-48 h-4 bg-gray-200 rounded animate-pulse hidden sm:block" />
            </div>
          </div>
          <div className="w-20 h-8 bg-gray-200 rounded animate-pulse" />
        </div>
  
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* Main Content Skeleton */}
          <div className="lg:col-span-2 space-y-4 lg:space-y-6">
            {/* Title Card Skeleton */}
            <div className="border-0 lg:border shadow-sm lg:shadow rounded-lg bg-white dark:bg-muted p-4 lg:p-6">
              <div className="w-24 h-5 bg-gray-200 rounded animate-pulse mb-4" />
              <div className="w-full h-20 bg-gray-200 rounded animate-pulse mb-2" />
              <div className="flex justify-between">
                <div className="w-16 h-4 bg-gray-200 rounded animate-pulse" />
                <div className="w-20 h-4 bg-gray-200 rounded animate-pulse hidden lg:block" />
              </div>
            </div>
  
            {/* Content Editor Skeleton */}
            <div className="border-0 lg:border shadow-sm lg:shadow rounded-lg bg-white dark:bg-muted p-4 lg:p-6">
              <div className="w-16 h-5 bg-gray-200 rounded animate-pulse mb-4" />
              <div className="space-y-3">
                <div className="w-full h-4 bg-gray-200 rounded animate-pulse" />
                <div className="w-full h-4 bg-gray-200 rounded animate-pulse" />
                <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse" />
                <div className="w-full h-32 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          </div>
  
          {/* Sidebar Skeleton */}
          <div className="space-y-4 lg:space-y-6">
            {/* Publish Settings Skeleton */}
            <div className="border-0 lg:border shadow-sm lg:shadow rounded-lg bg-white dark:bg-muted p-4 lg:p-6">
              <div className="w-32 h-5 bg-gray-200 rounded animate-pulse mb-4" />
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="w-16 h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
                      <div className="w-32 h-4 bg-gray-200 rounded animate-pulse" />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
                      <div className="w-36 h-4 bg-gray-200 rounded animate-pulse" />
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="w-20 h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
                      <div className="w-40 h-4 bg-gray-200 rounded animate-pulse" />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
                      <div className="w-44 h-4 bg-gray-200 rounded animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
  
            {/* Actions Skeleton */}
            <div className="border-0 lg:border shadow-sm lg:shadow rounded-lg  p-4 lg:p-6 sticky bottom-2 lg:static backdrop-blur-sm lg:backdrop-blur-none z-10">
              <div className="space-y-2">
                <div className="w-full h-10 bg-gray-200 rounded animate-pulse" />
                <div className="w-full h-10 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }