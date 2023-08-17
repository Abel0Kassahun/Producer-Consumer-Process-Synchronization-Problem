class Semaphore{
    constructor(){
        this.mutex = 1; // 1 is free, 0 is held
        this.empty = 10;
        this.full = 0;
        this.acronym = 0;
    }
    _wait(s){
        while(s <= 0){
            // no statement
        }
        return --s;
    }
    
    _signal(s){
        return ++s;
    }
}
