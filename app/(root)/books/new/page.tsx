import React from 'react'
import UploadForm from '@/components/UploadForm'

const Page = () => {
  return (
    <main className="new-book">
      <div className="mx-auto max-w-3xl space-y-10">
        <section className="space-y-4">
          <h1 className="page-title-xl">Add a New Book</h1>
          <p className="subtitle">Upload a PDF to generate your interactive reading experience</p>
        </section>

        <UploadForm />
      </div>
    </main>
  )
}

export default Page