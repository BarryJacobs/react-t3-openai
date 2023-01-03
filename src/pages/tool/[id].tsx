import { useState, useCallback } from "react"
import { useRouter } from "next/router"
import { trpc } from "utils/trpc"
import { ToolHeader, ToolForm, ToolOutput, Container, Grid, Column } from "components"

const Tool = () => {
  const router = useRouter()
  const { id } = router.query

  const [requestParams, setRequestParams] = useState<Record<string, string>>({})

  const { data: tool } = trpc.tool.get.useQuery({ id: id as string }, { enabled: id !== undefined })
  const { data: outputs, isFetching } = trpc.openai.completion.useQuery(
    { id: id as string, params: requestParams },
    {
      enabled: id !== undefined && Object.keys(requestParams).length > 0
    }
  )

  const onSubmit = useCallback((formData: Record<string, string>) => {
    setRequestParams(formData)
  }, [])

  return tool ? (
    <>
      <ToolHeader tool={tool} />
      <Container>
        <Grid>
          <Column span="6">
            <ToolForm tool={tool} onSubmit={onSubmit} />
          </Column>
          <Column span="6">
            <ToolOutput loading={isFetching} tool={tool} outputs={outputs} />
          </Column>
        </Grid>
      </Container>
    </>
  ) : null
}

export default Tool
