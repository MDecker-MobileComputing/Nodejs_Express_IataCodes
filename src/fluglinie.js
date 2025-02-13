
/**
 * Ein Objekt dieser Klasse enthält Details zu einer Fluglinie.
 */
export class Fluglinie {

    /**
     * Konstruktor, um eine neue Fluglinie zu erstellen.
     *
     * @param {string} IATA-Code einer Fluglinie, z.B. "LH"
     *
     * @param {string} name Name der Fluglinie, z.B. "Lufthansa"
     *
     * @param {string} land Heimatland der Fluglinie, z.B. "Deutschland"
     */
    constructor( iataCode, name, land ) {

        this.iataCode = iataCode;
        this.name     = name;
        this.land     = land;
    }


    /**
     * Volltextsuche in Datensatz.
     *
     * @param {string} suchstring
     *
     * @returns {boolean} `true`gdw. `suchstring` im Namen oder Land der Fluglinie enthalten ist
     */
    enthaelt( suchstring ) {

        const suchstringNormalisiert = suchstring.toLowerCase().trim();

        return this.name.toLowerCase().includes( suchstringNormalisiert ) ||
               this.land.toLowerCase().includes( suchstringNormalisiert );
    }

}