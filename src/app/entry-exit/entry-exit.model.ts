export class EntryExit {

    public description: string
    public amount: number
    public type: "Ingreso" | "Egreso" = "Ingreso"

    constructor(entryExit: IEntryExit){
        this.description = entryExit && entryExit.description || null
        this.amount = entryExit && entryExit.amount || null
        this.type = entryExit && entryExit.type || null
    }
}

interface IEntryExit{
    description: string
    amount: number
    type: "Ingreso" | "Egreso"
}