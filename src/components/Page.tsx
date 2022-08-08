/* eslint-disable @next/next/no-html-link-for-pages */
import Link from "next/link";
import Head from "next/head";

export default function Page({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Head>
        <title>Bnigo 💕</title>
        <link rel="shortcut icon" href="/favicon.ico"/>
      </Head>
      <Header />
      <div className="flex-col grow w-11/12 m-auto">
        {children}
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="place-items-center text-center w-full m-auto py-4 mb-2 border-b border-gray-300 bg-white">
      <a href="/">
        <span className="text-5xl font-bold">Bnigo</span>
        <br />
        <span className="font-thin">Bingo fast felstavat 💕</span>
      </a>
    </div>
  );
}
