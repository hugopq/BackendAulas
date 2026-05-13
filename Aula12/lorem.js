const fs = require('fs');
const filename = "bigtext.txt";
const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eget ante vitae justo viverra suscipit ut et nibh. Sed nisl metus, tempus at libero ac, pulvinar commodo felis. Praesent vitae ipsum maximus, feugiat nulla ac, blandit ipsum. Nunc quam ex, dictum vitae nisl a, condimentum rutrum orci. Quisque sit amet ligula hendrerit lacus vehicula suscipit. Suspendisse tortor urna, facilisis eu ex eu, ullamcorper mollis lorem. Donec ultricies egestas velit, non ultricies turpis. Mauris pharetra massa elit. Morbi ipsum lacus, gravida nec vulputate vitae, commodo quis nunc. Phasellus lacinia neque arcu, ac faucibus nisi tincidunt ac. Pellentesque iaculis, ante sit amet sodales tempus, odio magna malesuada leo, mollis consectetur nulla mauris a orci. Praesent imperdiet ullamcorper porta. Praesent pretium convallis ligula, ut lobortis elit ultricies a. Sed sit amet sem at lorem posuere eleifend. Morbi ac molestie dolor. Nunc euismod leo et augue vulputate auctor. "

function writeBigText(){
    let finalText = ""
    for(let i=0; i<100000; i++){
        finalText += text;
    }
    fs.writeFileSync(filename, finalText, 'utf-8');
}

writeBigText();