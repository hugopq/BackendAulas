function multiplosEficiente()
{
    for (let i = 5; i < 20; i+=5){
        console.log(i+ " ");5       
    }
}
function multiplos()
{
    for (let i = 1; i < 20; i++) {
        if(i % 5 == 0)        
            console.log(i+ " ");
    }
}

multiplos();
multiplosEficiente();