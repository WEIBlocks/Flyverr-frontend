'use client';
import { motion } from 'framer-motion';

export function AnimatedHero() {
  return (
    <section className="py-16 bg-flyverr-primary/5 dark:from-gray-900 dark:via-flyverr-primary/10 dark:to-flyverr-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-flyverr-text dark:text-white mb-6">
            Join the Digital Revolution
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Where digital assets appreciate in value and every transaction creates opportunity.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
