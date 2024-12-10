export class Gift {

    id: number;
    name: string;
    link: string;
    claimed: boolean;

    constructor(id: number, name: string, link: string, claimed: boolean) {
        this.id = id;
        this.name = name;
        this.link = link;
        this.claimed = claimed;
    }
}