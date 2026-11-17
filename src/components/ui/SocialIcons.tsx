import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const base = { viewBox: '0 0 24 24', width: 18, height: 18, 'aria-hidden': true, focusable: false } as const

export function FacebookIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path
        fill="currentColor"
        d="M13.6 21v-7.4h2.5l.4-3h-2.9V8.8c0-.9.3-1.5 1.5-1.5h1.5V4.6c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.3H8.2v3h2.5V21z"
      />
    </svg>
  )
}

export function XIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path
        fill="currentColor"
        d="M17.2 3.5h3l-6.6 7.5 7.8 9.5h-6.1l-4.8-5.9-5.5 5.9h-3l7-7.9L1.6 3.5h6.2l4.3 5.4zm-1 15.2h1.7L6.9 5.2H5.1z"
      />
    </svg>
  )
}

export function YouTubeIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M21.6 7.7a2.6 2.6 0 0 0-1.8-1.8C18.2 5.5 12 5.5 12 5.5s-6.2 0-7.8.4A2.6 2.6 0 0 0 2.4 7.7 27 27 0 0 0 2 12a27 27 0 0 0 .4 4.3 2.6 2.6 0 0 0 1.8 1.8c1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4a2.6 2.6 0 0 0 1.8-1.8A27 27 0 0 0 22 12a27 27 0 0 0-.4-4.3zM10 15V9l5.2 3z"
      />
    </svg>
  )
}

export function LinkedInIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path
        fill="currentColor"
        d="M6.9 8.9H3.6V20h3.3zM5.3 3.5a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8zM20.4 13.6c0-3-.6-5-4.1-5-1.6 0-2.7.9-3.2 1.7V8.9H10V20h3.3v-5.5c0-1.4.3-2.8 2-2.8s1.8 1.6 1.8 2.9V20h3.3z"
      />
    </svg>
  )
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.4" cy="6.6" r="1.25" fill="currentColor" />
    </svg>
  )
}

export const SOCIALS = [
  { name: 'Facebook', Icon: FacebookIcon },
  { name: 'X', Icon: XIcon },
  { name: 'YouTube', Icon: YouTubeIcon },
  { name: 'LinkedIn', Icon: LinkedInIcon },
  { name: 'Instagram', Icon: InstagramIcon },
]
