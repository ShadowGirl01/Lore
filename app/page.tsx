import HeroSection from '@/components/ui/HeroSection'
import React from 'react'
import {sampleBooks} from '@/lib/constants';
import BookCard from '@/components/ui/BookCard'

const page = () => {
  return (
    <main>
      <HeroSection />
      <div className="library-hero-grid">
        {sampleBooks.map((book) => {
  return <BookCard />
})}
      </div>
    </main>
  )
}

export default page