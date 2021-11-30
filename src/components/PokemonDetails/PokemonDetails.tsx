import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Chip, Typography, IconButton } from '@mui/material';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import HeightIcon from '@mui/icons-material/Height';
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
				<IconButton aria-label="delete" size="medium" onClick={handleBackClick}>
        	<KeyboardBackspaceIcon fontSize="inherit" />
				</IconButton>
				<Typography variant="h4" gutterBottom component="div">
					{pokemon.name} | #{pokemon.id}
				</Typography>
			</div>
		)
	}

	const renderTypeBadges = () => {
		return (
			<div className="pokemon-details__badge">
				{pokemon?.types?.map( (item:any,key:number) => {
					return <Chip className="pokemon-details__badge__item" label={item.type.name} />
				})}
			</div>
		)
	}

	const renderAbout = () => {
		return (
			<div className="pokemon-details__about">
				<Typography 
					className="pokemon-details__about__title"
					gutterBottom
					component="span">
					About
				</Typography>
				<div className="pokemon-details__about__atributes">
					<div className="pokemon-details__about__atributes__item">
						<div className="pokemon-details__about__atributes__stat">
							<FitnessCenterIcon fontSize="inherit" />
							{pokemon?.weight}
						</div>
						<div className="pokemon-details__about__atributes__label">
							Weight
						</div>
					</div>

					<div className="pokemon-details__about__atributes__item">
						<div className="pokemon-details__about__atributes__stat">
							<HeightIcon fontSize="inherit" />
							{pokemon?.height}
						</div>
						<div className="pokemon-details__about__atributes__label">
							Height
						</div>
					</div>
				</div>
			</div>
		)
	}

	const renderStats = () => {
		return (
			<div className="pokemon-details__stats">
				<Typography 
					className="pokemon-details__stats__title"
					gutterBottom
					component="span">
					Base Stats
				</Typography>
				{pokemon?.stats?.map( (item:any, key:number) => {
					return (
						<div className="pokemon-details__stats__item">
							<Typography 
								className="pokemon-details__stats__item__description"
								gutterBottom
								component="span">
								{item.stat.name} | {item.base_stat}
							</Typography>
							<LinearProgress 
								className="pokemon-details__stats__item__bar"
								variant="determinate"
								value={item.base_stat} />
						</div>
					)
				})}
			</div>
		)
	}

	return (
		<div className="pokemon-details">
			{renderHeader()}
			<div className="pokemon-details__image">
				<img
					src={pokemon?.sprites?.front_default}
					alt={pokemon.name}
					loading="lazy"/>
			</div>
			{renderTypeBadges()}
			{renderAbout()}
			{renderStats()}
		</div>
	);
}

export default PokemonDetails;