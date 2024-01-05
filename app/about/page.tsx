import { Metadata } from "next"

export const metadata : Metadata = {
  title: 'About Page',
  description: 'Generated by create next app',
}

export default function About() {
  return (
    <div className="bg-slate-300">
      <h1>About Page</h1>
    </div>
  )
}