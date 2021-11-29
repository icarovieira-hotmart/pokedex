import { useEffect, useState } from "react";
import PokemonCard from "../PokemonCard/PokemonCard";
import Box from '@mui/material/Box';

const PokemonList = () => {
	const [ pokemons, setPokemons ] = useState<any[]>([]);

	useEffect( () =>  {
		try {
			const getPokemonsList = async () => {
				const pokemonsList = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=100')
				const pokemons = await pokemonsList.json()

				setPokemons(pokemons.results)
				console.log('Pokemons: ',pokemons.results)
			}

			getPokemonsList()
		} catch (e) {
			console.log('error')
		}
	}, [])
	return (
		<div>
			 <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, maxWidth: '600px', margin: 'auto' }}>
				{pokemons.map( (item, key) => {
					return (
						<PokemonCard
							name={item.name}
							url={item.url} />
					);
				})}
      </Box>
		</div>
	);
}

export default PokemonList;