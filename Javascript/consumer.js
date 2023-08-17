import { semaphore, buffer_queue, render_buffer } from './producer.js';

let consume_process = document.querySelector('.consumer .initial_option');
let confirm_consumption_box = document.querySelector('.consuming_process');

let confirm = document.querySelector('.consuming_process .consume');
let cancel = document.querySelector('.consuming_process .cancel');

consume_process.addEventListener('click', (e) => {
    e.preventDefault();
    if(semaphore.mutex == 0){
        alert("Buffer is currently in use, please wait");
    }
    else{
        if(semaphore.full == 0){
            alert("Buffer is empty, cant consume any process");
        }
        else{
            confirm_consumption_box.style.display = 'flex';
            semaphore.mutex = semaphore._wait(semaphore.mutex);

        }
    }
})

confirm.addEventListener('click', (e) => {
    e.preventDefault();

    semaphore.full = semaphore._wait(semaphore.full);
    
    // consume item from buffer
    let pr_name = buffer_queue.dequeue();
    render_buffer();
    
    semaphore.empty = semaphore._signal(semaphore.empty);
    semaphore.mutex = semaphore._signal(semaphore.mutex);

    confirm_consumption_box.style.display = 'none';

    setTimeout(() => {
        // The process information stops displaying after 3 seconds
        alert(`Process ${pr_name} has been consumed`);
    }, 500);
})

cancel.addEventListener('click', (e) => {
    semaphore.mutex = semaphore._signal(semaphore.mutex);
    confirm_consumption_box.style.display = 'none';
})


