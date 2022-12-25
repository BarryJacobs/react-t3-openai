import { type NextPage } from "next"
import { Container, Title, Grid, Header, ToolLink } from "components"
import Head from "next/head"

const Home: NextPage = () => {
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
          <ToolLink
            id="abcde12345"
            group="Programming"
            title="Explain code"
            description="Interpret some code based on the language, code and syntax provided"
          />
        </Grid>
      </Container>
    </>
  )
}

export default Home
