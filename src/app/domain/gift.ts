export class Gift {

    id: number;
    name: string;
    link: string;
    claimed: boolean;
    category: string;
    quantity: string;

    constructor(id: number, name: string, link: string, claimed: boolean, category: string, quantity: string) {
        this.id = id;
        this.name = name;
        this.link = link;
        this.claimed = claimed;
        this.category = category;
        this.quantity = quantity;
    }
}