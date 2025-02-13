
/**
 * Ein Objekt dieser Klasse enthält Details zu einer Fluglinie.
 */
export class Fluglinie {

    /**
     * Konstruktor, um eine neue Fluglinie zu erstellen.
     *
     * @param {*} name Name der Fluglinie, z.B. "Lufthansa"
     *
     * @param {*} land Heimatland der Fluglinie, z.B. "Deutschland"
     */
    constructor( name, land ) {

        this.name = name;
        this.land = land;
    }

}