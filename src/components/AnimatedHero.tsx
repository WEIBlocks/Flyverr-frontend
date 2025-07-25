'use client';
import { motion } from 'framer-motion';

export function AnimatedHero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center"
    >
      <h1 className="text-5xl font-extrabold text-gray-900">Welcome to Our Platform</h1>
      <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
        Discover amazing features crafted just for you. Get started today.
      </p>
    </motion.div>
  );
}
