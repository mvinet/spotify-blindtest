
export class Music {

    private readonly _url: string

    private readonly _author: string

    private readonly _title: string


    constructor(url: string, author: string, title: string) {
        this._url = url
        this._author = author
        this._title = title
    }


    get url(): string {
        return this._url
    }

    get author(): string {
        return this._author
    }

    get title(): string {
        return this._title
    }
}