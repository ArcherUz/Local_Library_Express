const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    first_name : { type: String, required: true, maxLength: 100 },
    family_name: { type: String, required: true, maxLength: 100 },
    date_of_birth: { type: Date },
    date_of_death: { type: Date },

});

//Virtual for author's full name 虚拟属性
AuthorSchema.virtual("name").get(function (){
    //To avoid errors in cases where an author does not have either a family name or first name
    //we want to make sure we handle the exception by returning an empty string for that case
    let fullname = "";
    if (this.first_name && this.family_name){
        fullname = `${this.family_name}, ${this.family_name}`;
    }
    
    if(!this.first_name || !this.family_name){
        fullname = "";
    }
    return fullname;
});

//we dont use an arrow function as we'll need this object
//TODO:
//arrow function and function() diff
AuthorSchema.virtual("url").get(function (){
    return `/catalog/author/${this.id}`;
});
//我们还为 AuthorSchema 声明了一个 "url" 虚拟属性，以返回模型特定实例的绝对 URL。在模板中需要获取特定作者的链接时可使用该属性。
//Declaring our URLs as a virtual in the schema is a good idea because then the URL for an item only ever needs to be changed in one place

module.exports = mongoose.model('Author', AuthorSchema);