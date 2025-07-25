import { AnimatedHero } from '@/components/AnimatedHero';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <AnimatedHero />
      <div className="mt-8 space-x-4">
        <button className="px-8 py-3 bg-blue-600 text-white text-lg rounded-md hover:bg-blue-700 transition">
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
