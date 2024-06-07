import { faker } from '@faker-js/faker';
import { Room } from '../models/rooms-model';

// Función para generar un objeto Room
const generateRoom = (): Room => {
  return {
    id_room: faker.number.int({ min: 1, max: 1000 }),
    number: faker.number.int({ min: 1, max: 100 }),
    type: faker.helpers.arrayElement(['single', 'double', 'suite', 'deluxe']),
    value: faker.commerce.price({ min: 50, max: 500, dec: 0, symbol: '$' }),
    is_available: faker.helpers.arrayElement([true, false]),
    state: faker.helpers.arrayElement([true, false]),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  };
};

// Generar un array de 20 objetos Room
export const ROOMS_MOCK: Room[] = Array.from({ length: 30 }, generateRoom);
