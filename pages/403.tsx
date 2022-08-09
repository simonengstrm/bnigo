import Link from "next/link";
import Page from "../src/components/Page";

export default function Unauthorized() {
  return (
    <Page>
      <div className="text-center">
        <span className="text-xl font-bold">Error 403</span><br/>
        <span>
          Only authorized users can access this page. Are you <Link href="/login"><a className="underline text-blue-500">logged in</a></Link>?
        </span>
      </div>
    </Page>
  )
}