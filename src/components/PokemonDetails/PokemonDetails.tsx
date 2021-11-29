import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PokemonDetails = () => {
	const params = useParams()
	const [pokemon, setPokemon] = useState<any>({})

	useEffect(() =>{
		const getPokemonInfo = async () => {
			const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}/`)
			const pokemonData = await data.json()

			setPokemon(pokemonData)
		}

		getPokemonInfo()
	}, [])

	return (
		<div>
			{pokemon.name}
		</div>
	);
}

export default PokemonDetails;