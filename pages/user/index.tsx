import Page from "../../src/components/Page";
import { useRouter } from "next/router";

export default function Admin() {

  const router = useRouter();
  
  async function logout() {
    const result = await fetch("/api/auth/logout", {
      method: 'POST',
    });

    if (result.status == 200) {
      router.push(new URL("/", document.baseURI));
    } else {
      alert("Unable to log you out\n"+result.status+": "+result.statusText);
    }
  }
  
  return (
    <Page>
      <div>
        <h1>Welcome!</h1>
        <button className="bg-red-600 hover:bg-red-500 p-2 rounded-xl text-white" onClick={logout}>Log out</button>
      </div>
    </Page>
  );
}
