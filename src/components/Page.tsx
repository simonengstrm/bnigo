/* eslint-disable @next/next/no-html-link-for-pages */
import Link from "next/link";
import Head from "next/head";
import { Icon } from "@iconify/react";

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
    <div className=" py-4 mb-2 border-b border-gray-300 bg-white w-full">
      <div className="flex flex-row justify-between place-items-center w-11/12 m-auto ">
        <div className="flex">
          <Link href="/">
            <a>
              <span className="text-5xl font-bold">Bnigo</span>
              <br />
              <span className="font-thin">Bingo fast felstavat 💕</span>
            </a>
          </Link>
        </div>
        <div className="flex flex-row hover:scale-110 ease-in-out transition-all">
          <Link href="/user"><a><Icon icon="octicon:person-16" width={24} height={24}/></a></Link>
        </div>
      </div>
    </div>
  );
}
