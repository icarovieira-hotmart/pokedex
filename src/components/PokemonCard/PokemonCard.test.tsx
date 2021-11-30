import { render, screen } from '@testing-library/react';
import PokemonCard from './PokemonCard';

test('renders card', () => {
  render(<PokemonCard name="bulbasaur" url="https://pokeapi.co/api/v2/pokemon/1/" />);
  const Element = screen.getByText('Bulbasaur');
  expect(Element).toBeInTheDocument();
});
