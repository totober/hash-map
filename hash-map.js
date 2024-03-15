// hash map

class HashMap {

    constructor(){
        this.buckets = [],
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

            if(current.value.key === key) return {current, i}

            current = current.next
        }

        return null
    }

    set(key, value){

        let hash = this.hash(key)

        this.indexLimit(hash)

        if(typeof this.buckets[hash] === "undefined"){

            let list = new LinkedList()
            list.prepend({key, value})

            this.buckets[hash] = list
            this.capacity ++
            this.extend()

            return
        } 
        
        if(this.listTraverse(hash, key) !== null) {
        
            let {i} = this.listTraverse(hash, key)

            this.buckets[hash].insertAt({key, value}, i)
            this.buckets[hash].removeAt(i + 1)

            return
        } 


        if(this.buckets[hash].head === null) this.capacity ++

        this.extend()
        this.buckets[hash].append({key, value})            
    }

    get(key){

        let hash = this.hash(key)

        if(typeof this.buckets[hash] === "undefined" || this.listTraverse(hash, key) === null) return null

        let {current} = this.listTraverse(hash, key)

        return current.value.value
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

        for(let i = 0; i < this.buckets.length; i++){

           if(typeof this.buckets[i] === "undefined") continue

            let current = this.buckets[i].head

            let j = 0

            while(current !== null) {

                arr.push([this.buckets[i].at(j).value.key, this.buckets[i].at(j).value.value])
                j++
                current = current.next
           }
        }

        return arr
    };
}