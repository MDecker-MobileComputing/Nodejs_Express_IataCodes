
import logging from "logging";

import { Fluglinie } from './fluglinie.js';

const logger = logging.default( "datenbank" );


/**
 * IATA-Code der Airline wird auf Objekt mit Daten zur Airline abgebildet.
 */
const fluglinienObjekt = {

    "AA": new Fluglinie( "American Airlines"  , "USA"         ),
    "BA": new Fluglinie( "British Airways"    , "GB"          ),
    "LH": new Fluglinie( "Lufthansa"          , "Deutschland" ),
    "LO": new Fluglinie( "LOT Polish Airlines", "Polen"       )
};

logger.info( `Anzahl der Datensätze: ${Object.keys( datenObjekt ).length}` );


// Methoden für CRUDS-Operationen

export function readFluglinie( iataCode ) {

    const fluglinie = fluglinienObjekt[ iataCode.toUpperCase() ];
    return fluglinie;
}