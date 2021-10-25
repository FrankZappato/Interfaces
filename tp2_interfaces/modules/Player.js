class Player {
    constructor(token,name){
        this.token = token;
        this.name = name;
    }

    getToken () {
        return this.token;
    }

    getName () {
        return this.name;
    }
    setName(name){
        this.name = name;
    }
}