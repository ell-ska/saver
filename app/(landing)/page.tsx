import Header from './Header'
import Hero from './Hero'
import Showcase from './Showcase'
import Footer from './Footer'

const LandingPage = () => {
  return (
    <>
      <Header />
      <main className='mb-12 flex flex-col items-center px-6 md:mb-6'>
        <Hero />
        <Showcase />
      </main>
      <Footer />
    </>
  )
}

export default LandingPage
