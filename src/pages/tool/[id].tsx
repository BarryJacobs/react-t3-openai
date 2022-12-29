import { ToolHeader, ToolForm, ToolOutput, Container, Grid, Column } from "components"
import { example } from "data"

const Tool = () => {
  return (
    <>
      <ToolHeader tool={example} />
      <Container>
        <Grid>
          <Column span="6">
            <ToolForm tool={example} />
          </Column>
          <Column span="6">
            <ToolOutput loading={false} tool={example} />
          </Column>
        </Grid>
      </Container>
    </>
  )
}

export default Tool
