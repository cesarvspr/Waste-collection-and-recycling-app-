import Knex from 'knex';
/*we created a list with predefined itens for the application*/

export async function seed(knex:Knex) {
   await knex('items').insert([
        { title: 'Lamps', image: 'lampadas.svg' },
        { title: 'batteries', image: 'baterias.svg' },
        { title: 'Papers', image: 'papeis-papelao.svg' },
        { title: 'Eletric garbage', image: 'eletronicos.svg' },
        { title: 'Organic garbage', image: 'eletronicos.svg' },
        { title: 'kitchen oil', image: 'oleo.svg' }
    ])
}