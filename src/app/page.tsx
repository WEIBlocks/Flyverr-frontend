"use client"
import { AnimatedHero } from '@/components/AnimatedHero';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  // Handle reset password redirects from email links
  useEffect(() => {
    // Check if there's an access_token in the URL hash (from email reset link)
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      const searchParams = new URLSearchParams(window.location.search);
      
      // Check for access_token in hash (most common for Supabase)
      if (hash && hash.includes('access_token')) {
        const params = new URLSearchParams(hash.substring(1));
        const accessToken = params.get('access_token');
        
        if (accessToken) {
          console.log('Redirecting to reset password page with token from hash');
          router.push(`/reset-password?access_token=${accessToken}`);
          return;
        }
      }
      
      // Check for access_token in query params (fallback)
      const accessTokenFromQuery = searchParams.get('access_token');
      if (accessTokenFromQuery) {
        console.log('Redirecting to reset password page with token from query');
        router.push(`/reset-password?access_token=${accessTokenFromQuery}`);
        return;
      }
      
      // Check for type=recovery in hash (Supabase recovery links)
      if (hash && hash.includes('type=recovery')) {
        const params = new URLSearchParams(hash.substring(1));
        const accessToken = params.get('access_token');
        
        if (accessToken) {
          console.log('Redirecting to reset password page with recovery token');
          router.push(`/reset-password?access_token=${accessToken}`);
          return;
        }
      }
    }
  }, [router]);

  const handleGetStarted = () => {
    toast.success('Welcome! Let\'s get you started!');
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <AnimatedHero />
      <div className="mt-8 space-x-4">
        <button 
          onClick={handleGetStarted}
          className="px-8 py-3 bg-blue-600 text-white text-lg rounded-md hover:bg-blue-700 transition"
        >
          Get Started
        </button>
        <a href="/login" className="text-blue-600 hover:underline">
          Login
        </a>
        <a href="/signup" className="text-blue-600 hover:underline">
          Signup
        </a>
      </div>
    </main>
  );
}
