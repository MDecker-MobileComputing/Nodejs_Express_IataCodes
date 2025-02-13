
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

}