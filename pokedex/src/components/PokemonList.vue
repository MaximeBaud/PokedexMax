<template>
  <div class="pokemon-list">
    <h1>Pokedex</h1>
    <div class="toolbar">
      <input
        v-model="search"
        placeholder="Filter..."
      >
    </div>
    <div class="pokemons">
      <PokemonListItem
        v-for="pokemon in filteredPokemons"
        :key="pokemon.id"
        :pokemon="pokemon"
      />
    </div>
    <div class="bottom-actions">
      <BaseLoader v-if="loadingMore" />
      <button
        v-else
        @click="showMore()"
      >
        Load more
      </button>
    </div>
  </div>
</template>

<script>
import pokemons from '@/assets/pokemons.json'
import PokemonListItem from './PokemonListItem'
import gql from 'graphql-tag'

export default {
  components: {
    PokemonListItem
  },
  data () {
    return {
      search: '',
      loadingMore: false,
      width: window.innerWidth
    }
  },
  apollo: {
    pokemons: gql`
      query Pokemons {
        pokemons {
          id
          name
          image
        }
      }
    `
  },
  computed: {
    filteredPokemons () {
      if (!this.search) {
        return this.pokemons
      }
      const pattern = this.search.replace(/\s+/g, '|')
      const regex = new RegExp(pattern, 'i')
      return this.pokemons.filter(
        (pokemon) => regex.test(pokemon.name)
      )
    }
  },

  methods: {
    async showMore () {
      this.loadingMore = true
      page++
      // Fetch more data and transform the original result
      await this.$apollo.queries.pokemons.fetchMore({
        // New variables
        variables: {
          page
        },
        // Transform the previous result with new data
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newPokemons = fetchMoreResult.pokemons
          return {
            pokemons: [
              ...previousResult.pokemons,
              ...newPokemons
            ]
          }
        }
      })
      this.loadingMore = false
    }
  }

}
</script>

<style lang="stylus" scoped>
.pokemon-list
  margin $padding

.pokemons
  display grid
  grid-template-columns repeat(auto-fill, 200px)
  grid-auto-rows 200px
  grid-gap 12px

.toolbar
  margin-bottom $padding
</style>
