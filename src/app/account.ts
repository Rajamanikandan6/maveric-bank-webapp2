import { Balance } from "./balance";
import { Transaction } from "./transaction";

export class Account {
    _id:string;
    type:string;
    customerId:string;
    createdAt:Date;
    updatedAt:Date;
    balance:Balance;
    Transaction:Transaction[];

    constructor(){
    }
}
