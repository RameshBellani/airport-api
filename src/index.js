const express = require('express');
const { createConnection } = require('typeorm');
const Airport = require('./entity/Airport');
const City = require('./entity/City');
const Country = require('./entity/Country');

const app = express();
const PORT = process.env.PORT || 3000;

createConnection({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'ramesh',
    database: 'airport_app',
    entities: [Airport, City, Country],
    synchronize: true,
}).then(connection => {
    console.log('Database connected');

    app.get('/airport/:iata_code', async (req, res) => {
        const { iata_code } = req.params;
        try {
            const airportRepository = connection.getRepository('Airport');
            const airport = await airportRepository.findOne({
                where: { iata_code },
                relations: ['city', 'city.country'],
            });

            if (!airport) {
                return res.status(404).json({ message: 'Airport not found' });
            }

            const response = {
                airport: {
                    id: airport.id,
                    icao_code: airport.icao_code,
                    iata_code: airport.iata_code,
                    name: airport.name,
                    type: airport.type,
                    latitude_deg: airport.latitude_deg,
                    longitude_deg: airport.longitude_deg,
                    elevation_ft: airport.elevation_ft,
                    address: {
                        city: {
                            id: airport.city.id,
                            name: airport.city.name,
                            country_id: airport.city.country_id,
                            is_active: airport.city.is_active,
                            lat: airport.city.lat,
                            long: airport.city.long
                        },
                        country: airport.city.country ? {
                            id: airport.city.country.id,
                            name: airport.city.country.name,
                            country_code_two: airport.city.country.country_code_two,
                            country_code_three: airport.city.country.country_code_three,
                            mobile_code: airport.city.country.mobile_code,
                            continent_id: airport.city.country.continent_id
                        } : null
                    }
                }
            };

            res.json(response);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    });

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(error => console.error('Error connecting to the database', error));
