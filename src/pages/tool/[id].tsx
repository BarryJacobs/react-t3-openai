import { ToolHeader, ToolForm, Container, Grid, Column } from "components"
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
          <Column span="6">world</Column>
        </Grid>
      </Container>
    </>
  )
}

export default Tool
