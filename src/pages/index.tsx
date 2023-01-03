import { type NextPage } from "next"
import { trpc } from "utils/trpc"
import { Container, Title, Grid, Header, ToolLink } from "components"
import Head from "next/head"

const Home: NextPage = () => {
  const { data } = trpc.tool.getAll.useQuery()
  return (
    <>
      <Head>
        <title>Open AI</title>
        <meta name="description" content="React T3 Open AI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Container className="px-4 py-4 md:px-28 md:py-8 lg:py-12 ">
        <Title title="Programming" />
        <Grid>
          {data &&
            data.map(tool => {
              return (
                <ToolLink
                  key={tool.id}
                  id={tool.id}
                  group={tool.category.name}
                  title={tool.title}
                  description={tool.description}
                />
              )
            })}
        </Grid>
      </Container>
    </>
  )
}

export default Home
