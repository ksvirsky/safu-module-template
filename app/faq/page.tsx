import { Faq } from "../../components/faq";
import { client } from "../../tina/__generated__/databaseClient";

export default async function Home(props) {
  const faq = await client.queries.faq({ relativePath: `faq.md` });
  const page = await client.queries.page({ relativePath: `home.md` });

  return (
    <Faq
      // https://github.com/vercel/next.js/issues/47447
      data={JSON.parse(JSON.stringify(faq.data))}
      query={faq.query}
      variables={faq.variables}
      pageData={JSON.parse(JSON.stringify(page.data))}
    />
  );
}
