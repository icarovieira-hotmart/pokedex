import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Chip, Typography, IconButton } from '@mui/material';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from 'react-router-dom';

import './PokemonDetails.scss'

const PokemonDetails = () => {
	const params = useParams()
	const [pokemon, setPokemon] = useState<any>({})
	const navigate = useNavigate()

	useEffect(() =>{
		const getPokemonInfo = async () => {
			const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}/`)
			const pokemonData = await data.json()

			setPokemon(pokemonData)
		}

		getPokemonInfo()
	}, [])

	const handleBackClick = () => {
		console.log('vo pa rota barra')
		navigate(`/`)
	}

	const renderHeader = () => {
		return (
			<div className="pokemon-details__header">
				<IconButton aria-label="delete" size="small" onClick={handleBackClick}>
        	<KeyboardBackspaceIcon fontSize="inherit" />
				</IconButton>
				<Typography variant="h4" gutterBottom component="div">
					{pokemon.name} | {pokemon.id}
				</Typography>
			</div>
		)
	}

	const renderTypeBadges = () => {
		return (
			<div className="pokemon-detail__badge">
				{pokemon?.types?.map( (item:any,key:number) => {
					return <Chip label={item.type.name} />
				})}
			</div>
		)
	}

	const renderStats = () => {
		return (
			<div className="pokemon-details__stats">
				{pokemon?.stats?.map( (item:any, key:number) => {
					return (
						<div>
							{item.stat.name} | {item.base_stat}
							<LinearProgress 
								className="pokemon-details__stats__bar"
								variant="determinate"
								value={item.base_stat} />
						</div>
					)
				})}
			</div>
		)
	}

	const renderAbout = () => {
		return (
			<div className="pokemon-details__about">
				Height: {pokemon?.height} |
				Weight: {pokemon?.weight}
			</div>
		)
	}

	return (
		<div className="pokemon-details">
			{renderHeader()}
			<img
        src={pokemon?.sprites?.front_default}
        alt={pokemon.name}
        loading="lazy"/>
			{renderTypeBadges()}
			{renderAbout()}
			{renderStats()}
		</div>
	);
}

export default PokemonDetails;