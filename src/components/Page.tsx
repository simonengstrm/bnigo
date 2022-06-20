/* eslint-disable @next/next/no-html-link-for-pages */
import Link from "next/link"

export default function Page( { children }: { children: React.ReactNode } ) {
  return (
    <div>
      <Head />
      <div className="place-items-center justify-center flex w-11/12 lg:w-1/2 m-auto">
        {children}
      </div>
    </div>
  )
}

function Head() {
  return (
    <div className="place-items-center text-center w-full m-auto py-4">
      <a href="/">
        <span className="text-5xl font-bold">Bnigo</span><br/>
        <span className="font-thin">When you need to bingo your heart out ❤️</span>
      </a>
    </div>
  )
}