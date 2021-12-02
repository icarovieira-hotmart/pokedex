import { render, screen } from '@testing-library/react';
import PokemonCard from './PokemonCard';

const pokemon = {
  name: "bulbasaur",
  url: "https://pokeapi.co/api/v2/pokemon/1/"
}

const setup = () => render(
  <PokemonCard name={pokemon.name} url = {pokemon.url}/>
)

describe('PokemonCard', () => {
  test('Should render the PokemonCard Component', () => {
    setup()
    const element = screen.getByTestId('pokemon-card')
    expect(element).toBeInTheDocument();
  })
});
