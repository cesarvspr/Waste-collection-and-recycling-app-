import knex from '../database/connection'
import {Request, Response} from 'express'

class itemsController {
    //Busca uma lista de items
    async index(request: Request, response: Response) {
        const items = await knex('items').select('*'); // Busca todos os campos da tabela item, sempre que for utilizar uma query do 
        //bd usar o await antes para aguardar ter os resultado para retornar o json.
        const serializedItems = items.map(item => {
        return {
            id: item.id,
            title: item.title,
            image_url: `http://localhost:3333/uploads/${item.image}`,
        }
    })//transforma os dados em novo formato que for mais acessivel para q, está acessando
    return response.json(serializedItems);           
    }
}

// Service Pattern
// Repository Pattern

export default itemsController;