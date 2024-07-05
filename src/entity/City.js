const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
    name: 'City',
    tableName: 'city',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true,
        },
        name: {
            type: 'varchar',
        },
        country_id: {
            type: 'int',
        },
        lat: {
            type: 'decimal',
        },
        long: {
            type: 'decimal',
        },
        is_active: {
            type: 'boolean',
        },
    },
    relations: {
        country: {
            type: 'many-to-one',
            target: 'Country',
            joinColumn: { name: 'country_id' },
        },
        airports: {
            type: 'one-to-many',
            target: 'Airport',
            inverseSide: 'city',
        },
    },
});
