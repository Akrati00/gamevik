// CustomBlockquote.tsx
import React from 'react'

const CustomBlockquote = ({ children }) => (
  <blockquote className="border-l-4 border-primary-500 pl-4 italic text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 my-6">
    {children}
  </blockquote>
)

export default CustomBlockquote
