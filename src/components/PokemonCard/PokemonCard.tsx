import { Card, CardMedia, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import './PokemonCard.scss';

interface Pokemon {
	name: string,
	url: string
}

const PokemonCard = ({name, url}: Pokemon) => {
	const [pokemonInfo, setPokemonInfo ] = useState<any>({})

	useEffect( () => {
		const getPokemonInfo = async () => {
			const pokemonInfo = await fetch(url)
			const info = await pokemonInfo.json()

			setPokemonInfo(info)
			console.log(info)
		}

		getPokemonInfo()
	}, [url])

  return (
		<div className="pokemon-card">
			<Card>
				<CardMedia
					component="img"
					className="pokemon-card__image"
					image={pokemonInfo?.sprites?.front_default}
					alt={name}
				/>
				<Typography className="pokemon-card__title" component="span">
						{name}
					</Typography>
			</Card>
		</div>
	);
}

export default PokemonCard;