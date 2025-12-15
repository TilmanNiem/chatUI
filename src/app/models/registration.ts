import { Credentials } from "./credentials";

export interface Registration extends Credentials {
    firstName: string;
    lastName: string;
}

