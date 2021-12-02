import { render, screen } from '@testing-library/react';
import PokemonList from './PokemonList';
import ReactTestUtils from 'react-dom/test-utils';
import ReactDOM from 'react-dom'

const setup = () => render(
  <PokemonList/>
)

describe('PokemonList', () => {
  test('Deve conter o titulo do card', () => {
      setup()
      const title = screen.getByText('Pokédex')

      expect(title).toBeInTheDocument()
  })
});