
import logging       from "logging";
import { Fluglinie } from './fluglinie.js';

const logger = logging.default( "datenbank" );


/**
 * IATA-Code der Airline wird auf Objekt mit Daten zur Airline abgebildet.
 * Einige Datensätze sind bereits vorhanden.
 */
const fluglinienObjekt = {

    "AA": new Fluglinie( "AA", "American Airlines"  , "USA"         ),
    "BA": new Fluglinie( "BA", "British Airways"    , "GB"          ),
    "LH": new Fluglinie( "LH", "Lufthansa"          , "Deutschland" ),
    "LO": new Fluglinie( "LO", "LOT Polish Airlines", "Polen"       )
};

const anzahl = Object.keys( fluglinienObjekt ).length;
logger.info( `Anzahl der Datensätze beim Programmstart: ${anzahl}` );


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

    const ergebnis = fluglinienObjekt[ iataCode.toUpperCase() ];
    if ( ergebnis ) {

        return ergebnis.clone();

    } else {

        return null;
    }
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

    fluglinienObjekt[ fluglinie.iataCode ] = fluglinie.clone();
    return true;
}


/**
 * Fluglinie für bestimmten IATA-Code löschen.
 *
 * @param {string} iataCode IATA-Code der Fluglinie
 *
 * @return {boolean} `true` wenn Fluglinie erfolgreich gelöscht wurde,
 *                   `false` wenn Fluglinie nicht existiert.
 */
function deleteFluglinie( iataCode ) {

    const istDa = readFluglinie( iataCode );
    if ( istDa ) {

        delete fluglinienObjekt[ iataCode ];
        return true;

    } else {

        return false;
    }
}


/**
 * Fluglinie für bestimmten IATA-Code ersetzen.
 *
 * @param {Fluglinie} Fluglinien-Objekt mit neuen Daten
 *                    (alle Attribute inkl. IATA-Code müssen gesetzt sein).
 *
 * @return {boolean} `true` wenn Fluglinie ersetzt werden konnte,
 *                   `false` wenn Fluglinie nicht existiert.
 */
function updateFluglinie( fluglinie ) {

    const objekt = readFluglinie( fluglinie.iataCode );
    if ( objekt ) {

        objekt.name = fluglinie.name;
        objekt.land = fluglinie.land;

        fluglinienObjekt[ fluglinie.iataCode ] = objekt;

        return true;

    } else {

        return false;
    }
}


/**
 * Alle Funktionen als Default-Objekt exportieren.
 */
export default {

    // Lese-Operationen
    readFluglinie,
    searchFluglinie,

    // Schreib-Operationen
    createFluglinie,
    deleteFluglinie,
    updateFluglinie
};
