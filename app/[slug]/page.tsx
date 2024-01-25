
import { Faq } from "../../components/faq";
import { Page } from "../../components/page";
import { client } from "../../tina/__generated__/databaseClient";
import NotFound from "../not-found";


export default async function Home(props: { params: {slug: string; }}) {
  const { slug } = props.params;

  const faq = await client.queries.faq({ relativePath: `${slug}.md` });
  const page = await client.queries.page({ relativePath: `${!slug ? "home" : slug}.md` });
  const home = await client.queries.page({ relativePath: `home.md` });

  if (!faq.data && !page.data) {
    return <NotFound />;
  }

  if (faq.data) {
    return (<Faq
      // https://github.com/vercel/next.js/issues/47447
      data={JSON.parse(JSON.stringify(faq.data))}
      query={faq.query}
      variables={faq.variables}
      homeData={JSON.parse(JSON.stringify(home.data))}
    />);
  }

  return (
    <Page
      // https://github.com/vercel/next.js/issues/47447
      data={JSON.parse(JSON.stringify(page.data))}
      query={page.query}
      variables={page.variables}
      homeData={JSON.parse(JSON.stringify(home.data))}
    />
  );
}

export async function generateStaticParams() {
  const faq = await client.queries.faqConnection();
  const page = await client.queries.pageConnection();

  return [...faq.data.faqConnection.edges ?? [], ...page.data.pageConnection.edges ?? []].map((page) => ({
      params: { filename: page?.node?._sys.filename },
    }));
}
