import './globals.css'
import { SiteShell } from '../components/Site'

export const metadata = {
  title: "Bait Al-Nu'as — Curtains & Majlis",
  description: "Luxury curtains, bespoke majlis seating and refined interior styling.",
}

export default function RootLayout({ children }) {
  return <html lang="en"><body><SiteShell>{children}</SiteShell></body></html>
}
