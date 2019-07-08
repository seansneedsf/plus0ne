module.exports = class Guest{
    constructor(email, response = -1){
        this.email = email;
        this.response = response; //reponse can only be -1 (no responded), 0(no), 1(yes) 
        this.created = new Date(Date.now());
    }
}
