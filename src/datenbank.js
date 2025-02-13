
import logging from "logging";

import { Fluglinie } from './fluglinie.js';

const logger = logging.default( "datenbank" );


/**
 * IATA-Code der Airline wird auf Objekt mit Daten zur Airline abgebildet.
 */
const fluglinienObjekt = {

    "AA": new Fluglinie( "AA", "American Airlines"  , "USA"         ),
    "BA": new Fluglinie( "BA", "British Airways"    , "GB"          ),
    "LH": new Fluglinie( "LH", "Lufthansa"          , "Deutschland" ),
    "LO": new Fluglinie( "LO", "LOT Polish Airlines", "Polen"       )
};

logger.info( `Anzahl der Datensätze: ${Object.keys( fluglinienObjekt ).length}` );


// Methoden für CRUDS-Operationen

export function readFluglinie( iataCode ) {

    const fluglinie = fluglinienObjekt[ iataCode.toUpperCase() ];
    return fluglinie;
}

export function searchFluglinie( suchString ) {

    return  Object.values( fluglinienObjekt );
}


/**
 * Alle Funktionen als Default-Objekt exportieren.
 */
export default {

    readFluglinie,
    searchFluglinie
};
