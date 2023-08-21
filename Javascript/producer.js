import {Buffer} from './Buffer.js';
// import { Semaphore } from './wait&signal.js';

let buffer = document.querySelector('.buffer');

let produce_process = document.querySelector('.producer .initial_option');

let producing_process = document.querySelector('.producing_process');
let producing_process_inputs = producing_process.querySelectorAll('*');

let process_infn_box = document.querySelector('.process_infn');
let process_infn = process_infn_box.querySelectorAll('*');

export let buffer_queue = new Buffer();
export let semaphore = new Semaphore();

class Process{
    constructor(name, wt, bt, acr){
        this.name = name;
        this.wt = wt;
        this.bt = bt;
        this.acr = acr;
    }    
}


produce_process.addEventListener('click', (e) => {
    e.preventDefault();
    if(semaphore.mutex == 0){
        alert("Buffer is currently in use, please wait");
    }
    else{
        if(semaphore.empty == 0){
            alert("Buffer is full, cant create another process");
        }
        else{
            producing_process.style.display = 'flex';
            semaphore.mutex = semaphore._wait(semaphore.mutex);
            // console.log(semaphore.mutex);
        }
    }
})


// create button
producing_process_inputs[7].addEventListener('click', (e) => {
    e.preventDefault();
    if(producing_process_inputs[1].value === ''){
        alert("Process name cant be empty");
    }
    else{
        semaphore.empty = semaphore._wait(semaphore.empty);
        create_process(producing_process_inputs[1].value, 
            producing_process_inputs[3].value,producing_process_inputs[5].value);
        
        // console.log(buffer_queue.processes[0]);
        semaphore.full = semaphore._signal(semaphore.full);
        semaphore.mutex = semaphore._signal(semaphore.mutex);
        producing_process.style.display = 'none';

        // console.log(semaphore.empty, semaphore.full, semaphore.mutex, semaphore.acronym);

    }
})

// cancel button for creating process
producing_process_inputs[8].addEventListener('click', (e) => {
    e.preventDefault();
    producing_process.style.display = 'none';
    semaphore.mutex = semaphore._signal(semaphore.mutex);

})

function create_process(name, wt, bt){
    const new_pr = new Process(name, wt, bt, semaphore.acronym++);
    buffer_queue.enqueue(new_pr);
    render_buffer();
}

export function render_buffer(){
    let back = buffer_queue.backIndex;
    let front = buffer_queue.frontIndex;

    // delete all the children elements (processes) from the parent div (bufffer)
    delete_child_elements();
    for(; front < back; front++){
        create_element(buffer_queue.processes[front]);
    }
}

function create_element(pr){
    // Create a new div element with the single-result class
    const newProcess = document.createElement('div');
    newProcess.classList.add('single-process');

    // Create the inner elements and content
    const name = document.createElement('h2');
    name.innerHTML = "P" + pr.acr;


    newProcess.appendChild(name);

    // Append the new div element to the page
    buffer.appendChild(newProcess);
    
    newProcess.addEventListener('click', (e) => {
        // create a dialog box that holds all the process information and disappears after 5 seconds
        process_infn_box.style.display = 'flex';
        process_infn[0].innerHTML = 'Process name :- ' + pr.name;
        process_infn[1].innerHTML = 'Waiting Time :- ' + pr.wt;
        process_infn[2].innerHTML = 'Burst TIme :- ' + pr.bt;

        // setTimeout(() => {
        //     // The process information stops displaying after 3 seconds
        //     process_infn_box.style.display = 'none';
        // }, 3000);
    });
}

// the close in the process information
process_infn[3].addEventListener('click', (e) => {
    process_infn_box.style.display = 'none';
})


function delete_child_elements(){
    while(buffer.firstChild){
        buffer.removeChild(buffer.firstChild);
    }
}

