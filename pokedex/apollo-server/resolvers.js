import GraphQLJSON from 'graphql-type-json'
import { getPokemons, getPokemonById, updatePokemon } from './connectors/pokemons'

export default {
  JSON: GraphQLJSON,

  Pokemon: {
    image: (pokemon, args, context) => {
      let imgId = ''
      const pokemonId = pokemon.id
      if (pokemonId < 10) {
        imgId = '00'
      } else if (pokemonId < 100) {
        imgId = '0'
      }
      imgId += pokemonId
      return `https://www.pokemontrash.com/pokedex/images/sprites5g2/${imgId}.gif`
    }
  },

  Query: {
    pokemons: (root, args, context) => getPokemons(args, context),
    pokemon: (root, { id }, context) => getPokemonById(context, id)
  },

  Mutation: {
    editPokemon: (root, { input }, context) => updatePokemon(input, context)

  },

  Subscription: {
    mySub: {
      subscribe: (parent, args, { pubsub }) => pubsub.asyncIterator('hey')
    }

  }
}
