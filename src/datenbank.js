
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


// Methoden für CRUDS-Operationen: Create, Read, Update, Delete, Search


export function readFluglinie( iataCode ) {

    const fluglinie = fluglinienObjekt[ iataCode.toUpperCase() ];
    return fluglinie;
}


export function searchFluglinie( suchString ) {

    const fluglinienArray = Object.values( fluglinienObjekt );

    if ( suchString ) {

        return fluglinienArray.filter( fluglinie => fluglinie.enthaelt( suchString ) );

    } else {

        return fluglinienArray;
    }
}


/**
 * Alle Funktionen als Default-Objekt exportieren.
 */
export default {

    readFluglinie,
    searchFluglinie
};
