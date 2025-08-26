interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className={`text-center mb-12`}>
      <h2
        className={`text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
