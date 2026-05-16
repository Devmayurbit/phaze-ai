import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Hero from '../components/landing/Hero'
import Features from '../components/landing/Features'
import PipelineShowcase from '../components/landing/PipelineShowcase'
import Testimonials from '../components/landing/Testimonials'
import Pricing from '../components/landing/Pricing'
import Footer from '../components/landing/Footer'

export default function Landing() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full overflow-hidden"
    >
      <Hero />
      <Features />
      <PipelineShowcase />
      <Testimonials />
      <Pricing />
      <Footer />
    </motion.div>
  )
}
