import { UserService } from './../providers/user/user.service';
export class User {
    constructor(
        public name: string, public username: string, public email: string, public photo: string
    ) {
        console.log('constructor user', this);

    }

    
    public key(): string {
        console.log('chamou key');
        let userService :UserService;

        console.log('obtendo key usuario', this);
        
        return userService.obterKey(this);
    }
    
}