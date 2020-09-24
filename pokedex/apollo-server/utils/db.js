import sqlite from 'sqlite'
import path from 'path'

const filePath = path.resolve(process.cwd(), 'C:/Users/Epulapp/Documents/POLYTECH/S6/Vue/Pokedex.db')

console.log('SQLite', filePath)

const db = sqlite.open(filePath, {
  cached: true
})

export {
  db
}
