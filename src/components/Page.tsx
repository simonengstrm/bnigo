export default function Page( { children }: { children: React.ReactNode } ) {
  return (
    <div>
      <Head />
      <div className="place-items-center justify-center flex w-2/3 m-auto">
        {children}
      </div>
    </div>
  )
}

function Head() {
  return (
    <div className="place-items-center text-center w-full m-auto py-4">
      <span className="text-5xl font-bold">Bnigo</span><br/>
      <span className="font-thin">Kom igen det blir kul!</span>
    </div>
  )
}