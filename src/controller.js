import logging   from "logging";
import datenbank from "./datenbank.js";
import { Fluglinie } from './fluglinie.js';

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
    logger.info( `Route registriert: GET ${routeRessource}` );

    app.get( routeCollection, getCollection );
    logger.info( `Route registriert: GET ${routeCollection}` );

    app.post( routeCollection, postCollection );
    logger.info( `Route registriert: POST ${routeCollection}` );
}


function getResource( req, res ) {

    let iataCode = req.params.iataCode;
    iataCode = iataCode.toUpperCase();

    const ergebnisObjekt = datenbank.readFluglinie( iataCode )
    if ( ergebnisObjekt ) {

        logger.info( `Fluglinie mit IATA-Code "${iataCode}" gefunden.` );
        res.status( 200 );
        res.json( ergebnisObjekt );

    } else {

        logger.info( `Keine Fluglinie mit IATA-Code "${iataCode}" gefunden.` );
        res.status( 404 );
        res.json( {} );
    }
}


function getCollection( req, res ) {

    const suchString = req.query.q;

    const ergebnisArray = datenbank.searchFluglinie( suchString );

    const anzahl = ergebnisArray.length

    logger.info( `Anzahl Fluglinien: ${anzahl}` );
    res.setHeader( "X-ANZAHL", anzahl );
    res.status( 200 );
    res.json( ergebnisArray );
}


function postCollection( req, res ) {

    const { iataCode, name, land } = req.body;

    if ( !iataCode || !name || !land ) {

        logger.warn( "Versuch, Fluglinie mit unvollständigen Attribute anzulegen." );
        res.status( 400 )
           .json({ nachricht: "Nicht alle Attribute gesetzt." });

    } else {

        const neueFluglinie = new Fluglinie( iataCode, name, land );
        datenbank.createFluglinie(neueFluglinie);
        logger.info( `Neue Flugline angelegt: ${neueFluglinie}` );
        res.status( 201 )
           .json({ nachricht: "Neue Fluglinie angelegt" });

    }
}