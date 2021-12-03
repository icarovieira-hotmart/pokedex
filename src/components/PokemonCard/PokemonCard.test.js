import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import PokemonCard from './PokemonCard';
import { BrowserRouter } from "react-router-dom";

const pokemon = {
  name: "bulbasaur",
  url: "https://pokeapi.co/api/v2/pokemon/1/"
}

const setup = () => render(
  <BrowserRouter>
    <PokemonCard name={pokemon.name} url = {pokemon.url}/>
  </BrowserRouter>
)

describe('PokemonCard', () => {
  it('Should render the Skeleton of the page', () => {
    setup()
    const element = screen.queryByText('Bulbasaur')
    expect(element).toBeNull()
  })

  it('Should render the PokemonCard Component', async  () => {
    setup()
    await waitFor(() => {
      const element = screen.getByTestId('pokemon-card')
      expect(element).toBeInTheDocument();
    });
  })

  it('Should render the name of Pokemon', async  () => {
    setup()
    await waitFor(() => {
      const element = screen.getByText(/Bulbasaur/i)
      expect(element).toBeInTheDocument();
    });
  })

  it('Should render the id of Pokemon', async  () => {
    setup()
    await waitFor(() => {
      const element = screen.getByAltText(/bulbasaur/i)
      expect(element).toBeInTheDocument();
    });
  })

  it('Should render the image with alt atribute', async  () => {
    setup()
    await waitFor(() => {
      const element = screen.getByText('#1')
      expect(element).toBeInTheDocument();
    });
  })
});
