import App from './components/App.js';
let namePlayer = "";
let numberCards="";

if (window.location.pathname=="/memory-match-random-characters.vercel.app/"){
    document.getElementById("text").addEventListener('change',function(){
        namePlayer = document.getElementById("text").value;
        const saveToLocalStorage = () => {
            localStorage.setItem("PlayerName", namePlayer);
        }
        saveToLocalStorage();
        if (namePlayer!=""){
            let str = "Se escaparon mis Pokemones y dicen que solo regresarán si encontramos a sus parejas... ¿me ayudas a atraparlos?";
            let arr = Array.from(str);
            for (let i=0;i<arr.length;i++){
                setTimeout(function(){
                    document.getElementById('p').innerHTML+=arr[i];
                },50*i);
            }
            setTimeout(function(){
                document.getElementById('start').style.visibility='visible';
            },6000);
        }
        let option=document.getElementById('number');
        option.addEventListener('change',function(){
            let selectedIndex= this.options.selectedIndex;
            if(selectedIndex ==1){
                numberCards=8; 
            } else if (selectedIndex==2){
            numberCards=15; 
            } else{
                numberCards=24; 
            }
            const saveToLocal = () => {
                localStorage.setItem("numberCards", numberCards);
            }
            saveToLocal();
            if(numberCards!=""){
                document.getElementById('vamos').style.visibility='visible';
            };
        });
    })
}

if (window.location.pathname!="/memory-match-random-characters.vercel.app/"){   
    let audio = new Audio('audios/main-theme.mp3');
    audio.play();
    audio.volume = 0.2;
    audio.loop=true;   
    let cardList = App.createCardList();
    let duplicatedList = App.duplicateList(cardList);
    let shuffled = App.shuffle(duplicatedList);
    let bigDiv = App.createBoardElements(shuffled);
    document.getElementById('gameContainer').appendChild(bigDiv);
}

"/SCL020-memory-match/"