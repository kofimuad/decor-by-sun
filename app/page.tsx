import Hero from '@/components/home/Hero'
import ServicesPreview from '@/components/home/ServicesPreview'
import PortfolioPreview from '@/components/home/PortfolioPreview'
import Testimonials from '@/components/home/Testimonials'
import BookingForm from '@/components/home/BookingForm'

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <PortfolioPreview />
      <Testimonials />
      <BookingForm />
    </>
  )
}
