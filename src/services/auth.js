import { PostCredentials } from './postCredentials';

class Auth{
    constructor(){
        this.authenticated = false;
    }

    login(credentials){
        if(credentials){
            PostCredentials('login.php', credentials).then((result) => {
                let responseJSON = result;
                
                if(responseJSON.userData){
                    localStorage.setItem('userData', JSON.stringify(responseJSON));
                    console.log(responseJSON);
                    this.authenticated = true;
                }
                else{
                    console.log(responseJSON);
                    this.authenticated = false;
                }
            });
        }
        return this.authenticated;
    }

    logout(){
        console.log("Logging out");
        localStorage.setItem('userData', '');
        localStorage.clear();
        this.authenticated = false;
    }

    isAuthenticated(){
        if(localStorage.getItem('userData')){
          this.authenticated = true;
        }
        else{
          this.authenticated = false;
        }
        return this.authenticated;
    }

    getLocalData(){
        if(this.isAuthenticated()){
            const user =  JSON.parse(localStorage.getItem('userData'));
            return user.userData;
        }
    }
}

export default new Auth();