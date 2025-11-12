import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        {/* Animated 404 */}
        <div className="mb-8">
          <div className="relative inline-block">
            <span className="text-9xl font-bold text-gray-900">4</span>
            <div className="absolute -top-4 -right-6">
              <div className="w-12 h-12 bg-[#4DAA57] rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-white">0</span>
              </div>
            </div>
            <span className="text-9xl font-bold text-gray-900 ml-4">4</span>
          </div>
        </div>

        {/* Message */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Story Not Found
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Oops! The story you're looking for seems to have wandered off into the digital wilderness. 
            It might have been deleted, or perhaps the link has changed.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          
          <Link href="/dashboard/stories" className="flex-1 sm:flex-none cursor-pointer ">
            <Button 
              variant="outline"
              className="w-full border-[#4DAA57] text-[#4DAA57] hover:bg-[#4DAA57] hover:text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-[#4DAA57] focus:ring-offset-2"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Browse Stories
            </Button>
          </Link>
        </div>

        {/* Additional Help */}
        <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-200">
          <p className="text-sm text-green-800">
            <strong>Tip:</strong> Check the URL for typos, or explore our collection of amazing stories from the home page.
          </p>
        </div>
      </div>
    </div>
  );
}