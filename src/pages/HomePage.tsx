import { CalculatorSection } from '../components/calculator/CalculatorSection'
import { Hero } from '../components/hero/Hero'
import { Products } from '../components/sections/Products'
import { Journey } from '../components/sections/Journey'
import { Services } from '../components/sections/Services'
import { GoalPicker } from '../components/sections/GoalPicker'
import { ClientVoices } from '../components/sections/ClientVoices'
import { Trust } from '../components/sections/Trust'

export function HomePage() {
  return (
    <>
      <Hero />
      <GoalPicker />
      <Products />
      <CalculatorSection />
      <Trust />
      <Journey />
      <ClientVoices />
      <Services />
    </>
  )
}
