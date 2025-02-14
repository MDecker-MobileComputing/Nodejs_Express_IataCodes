
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


/**
 * Fluglinie für gegebenen IATA-Code auslesen.
 *
 * @param {string} iataCode IATA-Code der Fluglinie
 *
 * @return {Fluglinie|undefined} Fluglinie-Objekt, wenn Fluglinie gefunden wurde,
 *                               ansonsten `undefined`.
 */
function readFluglinie( iataCode ) {

    const fluglinie = fluglinienObjekt[ iataCode.toUpperCase() ];
    return fluglinie;
}


/**
 * Suche nach Fluglinien anhand eines Suchstrings.
 *
 * @param {string} suchString String, der in Name oder Land der Fluglinie enthalten sein soll
 *
 * @returns {Fluglinie[]} Array mit Fluglinien, die den Suchstring enthalten, ansonsten leeres Array
 */
function searchFluglinie( suchString ) {

    const fluglinienArray = Object.values( fluglinienObjekt );

    if ( suchString ) {

        return fluglinienArray.filter( fluglinie => fluglinie.enthaelt( suchString ) );

    } else {

        return fluglinienArray;
    }
}


/**
 * Neue Fluglinie anlegen.
 *
 * @param {Fluglinie} fluglinie Neu anzulegende Fluglinie
 *
 * @returns {boolean} `true` wenn Fluglinie erfolgreich angelegt wurde,
 *                    `false` wenn Fluglinie bereits existiert.
 */
function createFluglinie( fluglinie ) {

    const schonDa = readFluglinie( fluglinie.iataCode );
    if ( schonDa ) {

        logger.info( `Fluglinie mit IATA-Code "${fluglinie.iataCode}" existiert bereits: ${schonDa}` );
        return false;
    }

    fluglinienObjekt[ fluglinie.iataCode ] = fluglinie;
    return true;
}


/**
 * Alle Funktionen als Default-Objekt exportieren.
 */
export default {

    readFluglinie,
    searchFluglinie,

    createFluglinie
};
