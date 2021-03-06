export async function getPokemons ({ filter, page = 0 }, context) {
  const variables = []
  let query = `
  SELECT id, display_name as name, habitat
  FROM pokemon_species `

  if (filter) {
    query += ' WHERE display_name LIKE ? '
    variables.push(`%${filter}%`)
  }

  query += ' ORDER BY id LIMIT ?, 20'
  variables.push(page * 20)

  return context.db.all(query, ...variables)
}

export async function getPokemonById (context, id) {
  return context.db.get(`
  SELECT id, display_name as name, habitat
  FROM pokemon_species
  WHERE id = ?
  `, id)
}

export async function updatePokemon ({ id, habitat }, context) {
  await context.db.get(`
  UPDATE pokemon_species
  SET habitat = ?
  WHERE id = ?`
  , habitat, id)
}
