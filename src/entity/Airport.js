const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
    name: 'Airport',
    tableName: 'airport',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true,
        },
        icao_code: {
            type: 'varchar',
        },
        iata_code: {
            type: 'varchar',
        },
        name: {
            type: 'varchar',
        },
        type: {
            type: 'varchar',
        },
        latitude_deg: {
            type: 'decimal',
        },
        longitude_deg: {
            type: 'decimal',
        },
        elevation_ft: {
            type: 'int',
        },
    },
    relations: {
        city: {
            type: 'many-to-one',
            target: 'City',
            joinColumn: { name: 'city_id' },
        },
    },
});
