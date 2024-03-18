// Hash Map [with private properties and methods]

class HashMap {

    #buckets;
    #size;
    #capacity;
    #loadFactor;


    constructor(){
        this.#buckets = [],
        this.#size = 16
        this.#capacity = 0
        this.#loadFactor = 0.75

        this.#buckets.length = this.#size
    }

    #extend() {

        if((this.#capacity / this.#buckets.length) < this.#loadFactor) return

        let entries = this.entries()
        this.#buckets = []
        this.#size *= 2
        this.#buckets.length = this.#size
        this.#capacity = 0

        for(let i = 0; i < entries.length; i++){

            this.set(entries[i][0], entries[i][1])

        }
    }

    #indexLimit(index) {

        if (index < 0 || index >= this.#buckets.length) {
            throw new Error("Trying to access index out of bound")
        }
    };

    #hash(key){

        let hashCode = 0;
        
        const primeNumber = 31;

        for (let i = 0; i < key.length; i++) {

            hashCode = (primeNumber * (hashCode + key.charCodeAt(i))) % 16;
        }

        return hashCode;
    };

    #listTraverse(hash, key) {

        let list = this.#buckets[hash]

        let i = -1
        let current = list.head

        while(current !== null) {

            i++

            if(current.value.key === key) return {current, i}

            current = current.next
        }

        return null
    }

    set(key, value){

        let hash = this.#hash(key)

        this.#indexLimit(hash)

        if(typeof this.#buckets[hash] === "undefined"){

            let list = new LinkedList()
            list.prepend({key, value})

            this.#buckets[hash] = list
            this.#capacity ++
            this.#extend()

            return
        } 
        
        if(this.#listTraverse(hash, key) !== null) {
        
            let {i} = this.#listTraverse(hash, key)

            this.#buckets[hash].insertAt({key, value}, i)
            this.#buckets[hash].removeAt(i + 1)

            return
        } 


        if(this.#buckets[hash].head === null) this.#capacity ++

        this.#extend()
        this.#buckets[hash].append({key, value})            
    }

    get(key){

        let hash = this.#hash(key)

        if(typeof this.#buckets[hash] === "undefined" || this.#listTraverse(hash, key) === null) return null

        let {current} = this.#listTraverse(hash, key)

        return current.value.value
    }

    has(key){

        let hash = this.#hash(key)

        if(typeof this.#buckets[hash] === "undefined" || this.#listTraverse(hash, key) === null) return false

        return true
    }

    remove(key){

        let hash = this.#hash(key)

        if(typeof this.#buckets[hash] === "undefined" || this.#listTraverse(hash, key) === null) return false

        
        let {i} = this.#listTraverse(hash, key)
        this.#buckets[hash].removeAt(i)

        if(this.#buckets[hash].head === null) this.#capacity --

        return true
    }

    clear(){

       this.#buckets = []
       this.#size = 16
       this.#buckets.length = this.#size
       this.#capacity = 0      
    }

    length(){

       let array = this.entries()

       return array.length
    }

    keys(index = 0){

        let array = this.entries()

        let result = []

        array.forEach(subArr => result.push(subArr[index]))

        return result
    }

    values(){
        return this.keys(1)
    }

    entries(){

        let arr = []

        for(let i = 0; i < this.#buckets.length; i++){

           if(typeof this.#buckets[i] === "undefined") continue

            let current = this.#buckets[i].head

            let j = 0

            while(current !== null) {

                arr.push([this.#buckets[i].at(j).value.key, this.#buckets[i].at(j).value.value])
                j++
                current = current.next
           }
        }

        return arr
    };
}



// Hash Set

class HashSet {

    constructor(){
        this.buckets = []
        this.size = 16
        this.buckets.length = this.size
        this.capacity = 0
        this.loadFactor = 0.75
    }
    
    extend() {
    
        if((this.capacity / this.buckets.length) < this.loadFactor) return
    
        let entries = this.entries()
        this.buckets = []
        this.size *= 2
        this.buckets.length = this.size
        this.capacity = 0
    
        for(let i = 0; i < entries.length; i++){
    
            this.set(entries[i][0], entries[i][1])
    
        }
    }
    
    indexLimit(index) {
    
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bound")
        }
    };
    
    hash(key){
    
        let hashCode = 0;
        
        const primeNumber = 31;
    
        for (let i = 0; i < key.length; i++) {
    
            hashCode = (primeNumber * (hashCode + key.charCodeAt(i))) % 16;
        }
    
        return hashCode;
    };
    
    listTraverse(hash, key) {
    
        let list = this.buckets[hash]
    
        let i = -1
        let current = list.head
    
        while(current !== null) {
    
            i++
    
            if(current.value === key) return {current, i}
    
            current = current.next
        }
    
        return null
    }
    
    set(key){
    
        let hash = this.hash(key)
    
        this.indexLimit(hash)
    
        if(typeof this.buckets[hash] === "undefined"){
    
            let list = new LinkedList()
            list.prepend(key)
    
            this.buckets[hash] = list
            this.capacity ++
            this.extend()
    
            return
        } 
        
        if(this.listTraverse(hash, key) !== null) {
        
            let {i} = this.listTraverse(hash, key)
    
            this.buckets[hash].insertAt(key, i)
            this.buckets[hash].removeAt(i + 1)
    
            return
        } 
    
    
        if(this.buckets[hash].head === null) this.capacity ++
    
        this.extend()
        this.buckets[hash].append(key)            
    }
    
    get(key){
    
        let hash = this.hash(key)
    
        if(typeof this.buckets[hash] === "undefined" || this.listTraverse(hash, key) === null) return null
    
        let {current} = this.listTraverse(hash, key)
    
        return current.value
    }
    
    has(key){
    
        let hash = this.hash(key)
    
        if(typeof this.buckets[hash] === "undefined" || this.listTraverse(hash, key) === null) return false
    
        return true
    }
    
    remove(key){
    
        let hash = this.hash(key)
    
        if(typeof this.buckets[hash] === "undefined" || this.listTraverse(hash, key) === null) return false
    
        
        let {i} = this.listTraverse(hash, key)
        this.buckets[hash].removeAt(i)
    
        if(this.buckets[hash].head === null) this.capacity --
    
        return true
    }
    
    clear(){
    
       this.buckets = []
       this.size = 16
       this.buckets.length = this.size
       this.capacity = 0   
    }
    
    length(){
    
       let array = this.entries()
    
       return array.length
    }
    
    keys(){
    
        let array = this.entries()
    
        let result = []
    
        array.forEach(subObj => result.push(subObj.key))
    
        return result
    }
    
    values(){
        return this.keys()
    }
    
    entries(){
    
        let arr = []
    
        for(let i = 0; i < this.buckets.length; i++){
    
           if(typeof this.buckets[i] === "undefined") continue
    
            let current = this.buckets[i].head
    
            let j = 0
    
            while(current !== null) {
    
                arr.push({key: this.buckets[i].at(j).value, value: this.buckets[i].at(j).value})
                j++
                current = current.next
           }
        }
    
        return arr
    };
}








//--------------------------------------------------------------------------------------------------------------//

// NodeList and Node from the previous exercise:

class LinkedList {

    constructor(){

        this.head = null;
        this.tail = null;
        this.size = 0;
    };

    traverse(condition = null, index = Infinity){

        let prev = null;
        let current = this.head;
        let i = -1;

        while((current !== condition) && (i < index)){
            i++;
            prev = current;
            current = current.next;
        };

        return {prev, current};
    };

    append(value) {

        if(this.head === null) {
            this.prepend(value);
            return;
        };

        let {prev} = this.traverse();
        prev.next = new Node(value, null);
        this.tail = prev.next;
        this.size ++;
        return; 
    };

    prepend(value){

        if(this.head === null) {

            this.head =  new Node(value, null);
            this.tail = this.head;
            this.size ++;
            return;
        }

        let {prev} = this.traverse(this.head.next);
        this.head = new Node(value, prev);
        this.size ++;
    };

    at(index){

        if(index > this.size - 1) return null;

        let {prev} = this.traverse(null, index);
        return prev;
    };

    pop() {

        if(this.size === 1) {
           this.removeAt(0);
           return;
        }

        let {prev} = this.traverse(null, this.size -2);
        prev.next = null;
        this.tail = prev;
        this.size --;
    };

    shift(){

        if(this.size === 1) {
           this.removeAt(0);
           return;
        };

        this.head = this.head.next;
        this.size --;
        return;
    };

    contains(value, find = false){

        if(!value) return console.error(new Error("Please enter a value"));

        let current = this.head;
        let i = -1;

        while(current !== null){

            i++;

            if(value === current.value) return find ? i : true;
           
            current = current.next;
        };

        return find ? null : false;
    };

    find(value){

       return this.contains(value, true);
    };

    toString() {

        let current = this.head;

        let str = "";

        while(current !== null){

            str += `(${current.value}) --> `;

            current = current.next;
        };
        
        return str += "null";
    };

    insertAt(value, index){

        
        if(index === 0){
            this.prepend(value)
            return
        }

        if(!(value && index)) {
            return console.error(new Error("You need 'value' and 'index' arguments"));
        };

        if(index > this.size - 1) return null;
        
        let {prev, current} = this.traverse(null, index - 1);
        
        prev.next = new Node(value, current);
        this.size ++;
    };

    removeAt(index){

        if(index > this.size - 1) return null;

        if(this.size === 1) {

            this.head = null;
            this.tail = null;
            this.size --;
            return;
        };

        if(index === 0) {
            this.shift();
            return;
        };

        if(index === this.size - 1){
            this.pop();
            return;
        };

        let {prev, current} = this.traverse(null, index - 1);
        prev.next = current.next;
        this.size --;
    };
};


class Node {

    constructor(value, nextNode){

        this.value = value || null,
        this.next = nextNode || null
    };
};