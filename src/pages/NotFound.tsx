import { ButtonLink } from '../components/ui/Button'
import { Band, PageHero } from '../components/ui/Page'

export function NotFound() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Page not found' }]}
        eyebrow="Error 404"
        title="We couldn’t find that page"
        lead="The link may be old, or the address mistyped. These will get you back on track."
      />
      <Band className="!pt-2">
        <div className="flex flex-wrap gap-3">
          <ButtonLink to="/" size="lg" arrow>
            Go to the home page
          </ButtonLink>
          <ButtonLink to="/plans" size="lg" variant="outline">
            Browse plans
          </ButtonLink>
          <ButtonLink to="/contact" size="lg" variant="outline">
            Contact us
          </ButtonLink>
        </div>
      </Band>
    </>
  )
}
