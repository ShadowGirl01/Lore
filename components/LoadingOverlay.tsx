import React from 'react'

const LoadingOverlay = () => {
  return (
    <div className="loading-wrapper">
      <div className="loading-shadow-wrapper">
        <div className="loading-shadow">
          <div className="loading-animation h-12 w-12 rounded-full border-4 border-[#663820] border-t-transparent" />
          <div className="text-center">
            <p className="loading-title">Preparing your book...</p>
            <p className="text-sm text-[#5b5043]">This may take a moment while we process your PDF.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoadingOverlay