import logging from "logging";

const logger = logging.default( "controller" );

const API_PREFIX = "/api/v1";
const ENTITY_TYP = "fluglinie";


/**
 * Routen für die einzelnen REST-Endpunkte registrieren.
 *
 * @param app Express-Objekt
 */
export default function routenRegistrieren( app ) {

    const prefixFuerRouten = `${API_PREFIX}/${ENTITY_TYP}`;

    const routeRessource  = `${prefixFuerRouten}/:iataCode`;
    const routeCollection = `${prefixFuerRouten}/`;

    app.get( routeRessource, getResource );
    logger.info(`Route registriert: GET ${routeRessource}`);

    app.get( routeCollection, getCollection );
    logger.info(`Route registriert: GET ${routeCollection}`);
}


function getResource(req, res) {
}


function getCollection(req, res) {
}