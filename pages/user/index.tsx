import { getCookie } from "cookies-next";
import Page from "../../src/components/Page";

export default function Admin() {

  console.log(getCookie("bnigoLoggedIn")?.valueOf)

  return (
    <Page>
      <h1>Welcome!</h1>
    </Page>
  );
}
