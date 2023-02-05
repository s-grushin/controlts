import uuid from 'react-uuid'

export class Table {

    #columns = []
    #rows = []

    addColumns(...columns) {
        this.#columns = [...this.#columns, columns]
    }

    clearColumns() {
        this.columns = []
    }

    addRow(row) {
        this.#rows.push(row)
    }

    clearRow() {
        this.#rows = []
    }

}

export class Cell {
    constructor(value, title) {
        this.value = value
        this.title = title
    }
}

export class Column {
    constructor(name, title) {
        this.name = name
        this.title = title
    }
}

export class Row {

    constructor(...cells) {
        this.id = uuid()
        this.cells = []
        this.cells.push(...cells)
    }

    static getEmptyRow(cellQty) {
        return new Row(...new Array(cellQty).fill(new Cell('', '')))
    }
}
