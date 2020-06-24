import {Request, Response} from 'express'; //importa o Request e Response dentro do express
import knex from '../database/connection'; //Importa o knex do arquivo connection


class PointsController {
/*We are using javascript str
/*Como estamos usando o desustruturamento do javascrip nao precisamos escrever ali no objeto name:name, 
podemos só utilizar o nome da variavel ja que ela é igual. */
    async index(request: Request, response: Response) {
        //Filtro de cidade, uf, items
        const { city, uf , items } = request.query;
        const parsedItems = String(items)
        .split(',')
        .map(item => Number(item.trim())); // Pega os items separa os por virgulas e remove os espaçamentos da esquerda/direita

        /* Procura pelo menos um dos pontos que ta recebendo no query items */
        const listPoint = await knex('points')
        .join('point_items', 'points.id', '=', 'point_items.point_id')
        .whereIn('point_items.item_id', parsedItems)
        .where('city', String(city))
        .where('uf', String(uf))
        .distinct()
        .select('points.*'); //.distinc() para retornar os pontos de coletas distintos

        return response.json(listPoint);
        
    }
    async show(request: Request, response: Response) {
        const {id} = request.params;
        const showPoint = await knex('points').where('id', id).first();
        if(!showPoint) {
            return response.status(400).json({message: "point not found."})
        }
        //O codigo abaixo esta realizando uma busca dos items de coleta que os locais pegam.
        const items = await knex('items').join('point_items', 'items.id', '=', 'point_items.item_id')
        .where('point_items.point_id', id).select('items.title');

        return response.json({showPoint, items});

    }
    async create(request:Request, response:Response) {
        const {name, email, whatsapp, latitude, longitude, city, uf, items} = request.body;
        const trx = await knex.transaction();
        const point = {
            image: 'https://instagram.fcgb1-1.fna.fbcdn.net/v/t51.2885-15/e35/s1080x1080/101057613_558379261710893_559853166127655108_n.jpg?_nc_ht=instagram.fcgb1-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=loYtUwNtBn4AX-X4j1v&oh=435b8cd4e1162f7e9ee2706baa04c618&oe=5F054C2F',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
        }
        const insertedIds = await trx('points').insert(point);
        const point_id = insertedIds[0] //retorna o id do registro, como so é possivel so fazer um registro de cada vez retorna o registro na posição 0.

        //This creates a relationship between two tables 
        const pointItems = items.map((item_id:number) => { //percorre o array e retorna cada id dentro da variavel item_id
            return {
                item_id,
                point_id, 
            }
        });
    
        await trx('point_items').insert(pointItems);
        await trx.commit();
        return response.json({ 
            id: point_id,
            ...point, // O ... é spread operator, ele faz com que pega as informações de um objeto e retorna em outro
        });
    }
}

export default PointsController;