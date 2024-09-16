export default class Human {
    #_name;
    #_age;
    #_gender;

    constructor(name, age, gender) {
        this.#_name = name;
        this.#_age = age;
        this.#_gender = gender;
    }
    
    getInfo() {
      return `Name: ${this.#_name}, Age: ${this.#_age}, Gender: ${this.#_gender}`;
    }
    
    celebrateBirthday() {
      this.#_age += 1;
      return `Happy Birthday, ${this.#_name}! You are now ${this.#_age} years old.`;
    }

    setName(new_name) {
        this.#_name = new_name
    }

    getName() {
        this.#_name
    }

    setAge(new_age) {
        this.#_age = new_age
    }

    getAge() {
        this.#_age
    }

    setGender(new_gender) {
        this.#_gender = new_gender
    }

    getGender() {
        this.#_gender
    }
}




import "dotenv/config"
import EventEmitter from 'events';

const start = performance.now()
//console.log(process.pid)
//console.log(process.env.APP_TITLE)
console.log(`Time: ${performance.now() - start}`)


// Створення класу Buyer
class Buyer {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }

    notify() {
        console.log(`Уведомление для ${this.name} (${this.email}): разпродажа!`);
    }
}

// Створення екземпляра EventEmitter
const emitter = new EventEmitter();

// Створення покупців
const buyer1 = new Buyer('Иван', 'ivan@example.com');

// Підписка покупців на подію "sale"
emitter.on('sale', () => buyer1.notify());
// Виникнення події "sale"
emitter.emit('sale');