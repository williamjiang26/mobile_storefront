import React from 'react'
import Footer from '../components/footer'
import Header from '../components/header'

const Page = () => {
  return (
    
    <div className="flex flex-col bg-zinc-300">
      <Header />
      {/* scrollable */}
      <div className="flex-1 mt-30 overflow-y-auto space-y-3 bg-zinc-300 scroll-smooth font-sans dark:bg-black">
        Contact
      </div>
      <Footer />
    </div>
  )
}

export default Page
