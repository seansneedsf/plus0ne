module.exports = class Guest{
    constructor(email, response = 0){
        this.email = email;
        this.response = response; //reponse can only be 0(no) or 1(yes) 
        this.created = new Date(Date.now());
    }
}
