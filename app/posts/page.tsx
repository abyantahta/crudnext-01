import { Metadata } from "next"

export const metadata : Metadata = {
  title: 'Posts List',
  description: 'Generated by create next app',
}

export default function Posts() {
  return (
    <div className="bg-slate-300">
      <h1>Posts List</h1>
    </div>
  )
}