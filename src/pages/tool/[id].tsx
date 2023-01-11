import { useState, useCallback } from "react"
import { useRouter } from "next/router"
import { api } from "utils/api"
import { ToolHeader, ToolForm, ToolOutput, Container, Grid, Column } from "components"

const Tool = () => {
  const router = useRouter()
  const utils = api.useContext()
  const { id } = router.query

  const [requestParams, setRequestParams] = useState<Record<string, string>>({})

  const { data: tool } = api.tool.get.useQuery({ id: id as string }, { enabled: id !== undefined })
  const { data: outputs, isFetching } = api.openai.completion.useQuery(
    { id: id as string, params: requestParams },
    {
      enabled: id !== undefined && Object.keys(requestParams).length > 0,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      retry: false,
      staleTime: Infinity,
      cacheTime: 0
    }
  )

  const onSubmit = useCallback(
    (formData: Record<string, string>) => {
      utils.openai.completion.invalidate()
      setRequestParams(formData)
    },
    [utils]
  )

  return tool ? (
    <>
      <ToolHeader tool={tool} />
      <Container>
        <Grid>
          <Column span="6">
            <ToolForm tool={tool} completionInProgress={isFetching} onSubmit={onSubmit} />
          </Column>
          <Column span="6">
            <ToolOutput tool={tool} loading={isFetching} outputs={outputs} />
          </Column>
        </Grid>
      </Container>
    </>
  ) : null
}

export default Tool
