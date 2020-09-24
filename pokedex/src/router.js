import Vue from 'vue'
import Router from 'vue-router'
import PokemonList from './components/PokemonList'
import PokemonDetails from './components/PokemonDetail'
import NotFound from './components/NotFound.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: PokemonList
    },
    {
      path: '/pokemon/:id',
      props: route => {
        return { id: parseInt(route.params.id) }
      },
      name: 'pokemon-details',
      component: PokemonDetails
    },
    {
      path: '*',
      name: 'not-found',
      component: NotFound
    }
  ]
})
