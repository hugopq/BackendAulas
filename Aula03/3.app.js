const started = () => {
    console.log('Download Started');
}
const finished = () => {
    console.log('Download Finished');
}
const update = (percent) => {
    console.log(`${percent}% completed`);
}

function performDownload(started, update, completed){
    started();
    for (let i = 1; i <= 100; i++) {
        update(i);        
    }
    completed();
}

performDownload(started, update, finished);