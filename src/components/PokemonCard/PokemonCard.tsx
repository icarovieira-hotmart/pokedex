import { Card, CardMedia, Typography, Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './PokemonCard.scss';
import './../Colors.scss';

interface Pokemon {
    name: string,
    url: string
}

const PokemonCard = ({name, url}: Pokemon) => {
    const navigate = useNavigate()
    const [pokemonInfo, setPokemonInfo ] = useState<any>({})
    const colors = [
      {
        type: 'normal',
        color: '#AAA67F',
      },

      {
        type: 'fighting',
        color: "#C12239",
      },

      {
        type: 'flying',
        color: "#A891EC",
      },

      {
        type: 'ground',
        color: "#DEC16B",
      },

      {
        type: 'poison',
        color: "#A43E9E",
      },

      {
        type: 'rock',
        color: "#B69E31",
      },

      {
        type: 'bug',
        color: "#A7B723",
      },

      {
        type: 'ghost',
        color: "#70559B",
      },

      {
        type: 'steel',
        color: "#B7B9D0",
      },

      {
        type: 'fire',
        color: "#F57D31",
      },

      {
        type: 'water',
        color: "#6493EB",
      },

      {
        type: 'grass',
        color: "#74CB48 ",
      },

      {
        type: 'electric',
        color: "#F9CF30",
      },

      {
        type: 'psychic',
        color: "#FB5584",
      },

      {
        type: 'ice',
        color: "#9AD6DF",
      },

      {
        type: 'dragon',
        color: "#7037FF",
      },

      {
        type: 'dark',
        color: "#75574C",
      },

      {
        type: 'fairy',
        color: "#E69EAC",
      },
    ]
    useEffect( () => {
        const getPokemonInfo = async () => {
            const pokemonInfo = await fetch(url)
            const info = await pokemonInfo.json()

            setPokemonInfo(info)
            console.log(info)
        }

        getPokemonInfo()
    }, [url])

    const handleClick = () => {
        navigate(`pokemon/${pokemonInfo.id}`)
    }

    const getColor = () => {
      return colors.find(color => color.type === pokemonInfo.types[0].type.name)?.color
    }

  if(pokemonInfo.types) {
    return (
      <div onClick={handleClick}>
          <Card
            sx={{borderColor: getColor()}}
            className="pokemon-card">
              <Typography
                  sx={{color: getColor()}}
                  className="pokemon-card__id">
                    #{pokemonInfo?.id}
              </Typography>
              <CardMedia
                  component="img"
                  className="pokemon-card__image"
                  image={pokemonInfo?.sprites?.front_default}
                  alt={name}
              />
              <Typography
                sx={{backgroundColor: getColor()}}
                className="pokemon-card__title" component="span">
                      {name}
              </Typography>
          </Card>
      </div>
    );
  } else {
    return (
    <div>
      <Skeleton variant="text" />
      <Skeleton variant="rectangular" width={210} height={118} />
      <Skeleton variant="text" />
    </div>);
  }
}

export default PokemonCard;