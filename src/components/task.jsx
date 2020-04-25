import React from 'react'
import { Checkbox, Input, Container } from 'semantic-ui-react'

const Task = () => (
  <Container>
    <Checkbox style={{width:"40px", fontSize: "48px"}}/>
    <Input style={{width:"600px"}} placeholder='Task Description...' />
  </Container>
)

export default Task