import { Card, CardMedia, Typography, Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { colors } from './../Helpers';


import './PokemonCard.scss';
import './../Colors.scss';

interface Pokemon {
    name: string,
    url: string
}

const PokemonCard = ({name, url}: Pokemon) => {
    const navigate = useNavigate()
    const [pokemonInfo, setPokemonInfo ] = useState<any>({})

    useEffect( () => {
      const getPokemonInfo = async () => {
        const pokemonInfo = await fetch(url)
        const info = await pokemonInfo.json()

        setPokemonInfo(info)
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
      <div data-testid="pokemon-card" onClick={handleClick}>
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