// CustomCodeBlock.tsx
import React from 'react'

const CustomCodeBlock = ({ children }) => (
  <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto my-6">
    <code>{children}</code>
  </pre>
)

export default CustomCodeBlock
