import { render, screen } from '@testing-library/react'
import List from './List'

test('renders content', () => {
  const todos = [{
    text: 'Component testing is done with react-testing-library',
    done: true
  }]

  render(<List todos={todos} />)

  const element = screen.getByText('Component testing is done with react-testing-library')
  expect(element).toBeDefined()
})