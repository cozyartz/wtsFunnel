import { forwardRef } from 'react';

const Textarea = forwardRef(({ 
  label, 
  error, 
  className = '',
  rows = 4,
  ...props 
}, ref) => {
  const baseClasses = `
    w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white 
    placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 
    focus:border-transparent transition-all duration-200 resize-vertical
  `;

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-300">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        rows={rows}
        className={`${baseClasses} ${error ? 'border-red-500 focus:ring-red-500' : ''} ${className}`}
        {...props}
      />
      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}
    </div>
  );
});

export default Textarea;