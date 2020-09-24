
<template>
  <div class="edit-pokemon">
    <div>
      <label for="pokemon-habitat">Habitat: </label>
      <select
        id="pokemon-habitat"
        name="pokemon-habitat"
      >
        <option value="" />
        <option
          v-for="option of habitats"
          :key="option"
          :value="option"
        >
          {{ option }}
        </option>
      </select>
      <div class="actions">
        <button type="submit">
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import habitats from '@/assets/habitat.json'
import gql from 'graphql-tag'

export default {
  props: {
    pokemon: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      habitats,
      formData: {
        habitat: this.pokemon.habitats
      }
    }
  },

  methods: {
    async save () {
      await this.$apollo.mutate({
        mutation: gql`
          mutation EditPokemon ($input: EditPokemonInuput!) {
            EditPokemon (input: $input) {
              id
              name
              imgage
              habitat
            }
          }
          `,
        variables: {
          input: {
            id: this.pokemon.id,
            habitat: this.formData.habitat
          }
        }
      })

      this.$emit('done')
    }
  }
}
</script>
