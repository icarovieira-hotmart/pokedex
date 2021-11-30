import { useEffect, useState } from "react";
import PokemonCard from "../PokemonCard/PokemonCard";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField'
import Container from '@mui/material/Container'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { ReactComponent as Pokeball } from "../../assets/svg/pokeball.svg";
import './PokemonList.scss';


const PokemonList = () => {
	const [ pokemons, setPokemons ] = useState<any[]>([]);
  const [ pokemonsListBackup, setPokemonsListBackup] = useState<any[]>([]);
	const [ search, setSearch ] = useState('');

	useEffect( () =>  {
		try {
			const getPokemonsList = async () => {
				const pokemonsList = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=100')
				const pokemons = await pokemonsList.json()

				setPokemons(pokemons.results)
        setPokemonsListBackup(pokemons.results)
				console.log('Pokemons: ',pokemons.results)
			}

			getPokemonsList()
		} catch (e) {
			console.log('error')
		}
	}, [])

  useEffect( () =>  {
    if (search === '') {
      setPokemons(pokemonsListBackup)
    } else {
      setPokemons(pokemonsListBackup.filter((pokemon) => {return pokemon.name.includes(search.toLowerCase())}))
    }
	}, [search])

	return (
		<div>
      <Container maxWidth="xs" className="pokemon-box" >
        <Stack className="pokemon-box__header" alignItems="center" spacing={3} direction="row" >
          <Pokeball />
          <h2>Pokédex</h2>
        </Stack>
        <TextField
          sx={{ margin: '15px auto' }}
          fullWidth
          type="text"
          id="search"
          label="Pesquisar"
          defaultValue={search}
          onChange={event => {
            setSearch(event.target.value)
          }}
        />
        <Box className="pokemon-box__list" sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', maxWidth:'444px', gap: 2 }}>
          {pokemons.map( (item, key) => {
            return (
              <PokemonCard
                name={item.name}
                url={item.url} />
            );
          })}
          </Box>
      </Container>
		</div>
	);
}

export default PokemonList;