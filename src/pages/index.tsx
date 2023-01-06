import { useMemo, useCallback, useState } from "react"
import { type NextPage } from "next"
import { trpc } from "utils/trpc"
import { Container, Title, Grid, Header, ToolLink, Divider, Menu } from "components"
import type { Tools } from "types"
import Head from "next/head"

const Home: NextPage = () => {
  const [tools, setTools] = useState<Tools | undefined>(undefined)
  const { data } = trpc.tool.getAll.useQuery(undefined, {
    onSuccess(data) {
      setTools(data)
    }
  })

  const onSearchUpdate = useCallback(
    (value: string) => {
      if (data && value) {
        setTools(
          data.filter(
            tool =>
              tool.title.toLowerCase().includes(value.toLowerCase()) ||
              tool.description.toLowerCase().includes(value.toLowerCase()) ||
              tool.category.name.toLowerCase().includes(value.toLowerCase())
          )
        )
      } else {
        setTools(data)
      }
    },
    [data]
  )

  const categories = useMemo(() => {
    if (!tools) return []
    const values = new Set<string>()
    for (const tool of tools) {
      values.add(tool.category.name)
    }
    return Array.from(values).sort()
  }, [tools])

  return (
    <>
      <Head>
        <title>Open AI</title>
        <meta name="description" content="React T3 Open AI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Menu displaySearch={true} onSearchUpdate={onSearchUpdate} />
      <Container className="px-4 py-4 md:px-28 md:py-8 lg:py-12 ">
        {categories.length > 0 &&
          categories.map((category, index) => {
            return (
              <div key={index}>
                <Title title={category} />
                <Grid>
                  {tools &&
                    tools
                      .filter(tool => tool.category.name === category)
                      .map(tool => {
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
                {index < categories.length - 1 && <Divider />}
              </div>
            )
          })}
      </Container>
    </>
  )
}

export default Home
