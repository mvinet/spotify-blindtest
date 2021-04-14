export class Music {

    private readonly _url: string

    private readonly _author: string

    private readonly _title: string

    private readonly _cover: string

    private readonly _link: string

    constructor(url: string, author: string, title: string, cover: string, link: string) {
        this._url = url
        this._author = author
        this._title = title
        this._cover = cover
        this._link = link
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

    get cover(): string {
        return this._cover
    }

    get link(): string {
        return this._link
    }
}