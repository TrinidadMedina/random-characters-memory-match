import utilities from '../utilities.js';
 
let matchCount=0;
let counting=0;
let turn=0;
let selectedCardsMiniDiv=[];
let pokemones =[];
let cantidad=localStorage.getItem('numberCards');
 
function getRandomInt(min, max) {
  let random = Math.floor(Math.random() * (max - min)) + min;
   return random;
 }
 
function list(){
  for(let i=0;i<cantidad;i++){
    let random=getRandomInt(1,890);
    if (random<100 && random>9){
      random="0"+random;
    } else if (random <10){
      random="0"+"0"+random;
    }
    let item = { id: i, image: 'https://www.serebii.net/pokemongo/pokemon/'+random+'.png', audio: 'audios/pika.mp3'};
    pokemones.push(item);
  if(pokemones.length>1&&pokemones[i].image===pokemones[i-1].image){
      pokemones.pop();
      cantidad = cantidad+1;
    }
  }
  return pokemones;
};
 
const App = {
  createCardList : () => {
    let cardList = list();
    return cardList;
  },
  duplicateList : (cardList) => {
    let duplicatedList = cardList.concat(cardList);
    return duplicatedList;
  },
  shuffle : (duplicatedList)=>{
    let shuffled =[];
    shuffled = shuffled.concat(duplicatedList);
    for(let i=0; i<shuffled.length;i++ ){
      let randomNumber = Math.floor(Math.random() * (shuffled.length-i))+i;
      let ranNumLoop = shuffled[i];
      shuffled[i]=shuffled[randomNumber];
      shuffled[randomNumber] = ranNumLoop;
    }
    return shuffled;
  },
  createBoardElements: (shuffled)=>{
    let bigDiv = document.createElement("div");
    let player = document.createElement('div');
    let divCount = document.createElement('div');
    let divProgress = document.createElement('div');
    let divBar = document.createElement('div');
    let bar = document.createElement('div');
    let divPokebolas = document.createElement('div');
    let parCaptures = document.createElement('div');
    let divCard = document.createElement('div');
    bigDiv.id = "bigDiv";
    player.id='player';
    divCount.id ='divCount';
    divBar.id = "myProgress";
    bar.id = 'myBar';
    divPokebolas.id = "divPokebolas";
    divCard.id = "divCard";
    bigDiv.className = "big-div";
    player.className='player';
    divCard.className = "div-card";
    player.textContent = 'Jugador@: '+localStorage.getItem('PlayerName');
    divCount.textContent='Intentos: '+counting;
    divProgress.textContent='Progreso: ';
    parCaptures.textContent='Capturas: ';
    if (cantidad==15){
      divCard.style.gridTemplateColumns= "repeat(6, 1fr)";
      divCard.style.width= "800 px";
      divCard.style.height= "500px";
    }else if(cantidad==24){
      divCard.style.gridTemplateColumns= "repeat(8, 1fr)";
      divCard.style.width= "800px";
      divCard.style.height= "620px";
      divCard.style.margin= "2%";
    }
    player.appendChild(divCount);
    player.appendChild(divProgress);
    divBar.appendChild(bar);
    player.appendChild(divBar);
    player.appendChild(parCaptures);
    player.appendChild(divPokebolas);
    bigDiv.appendChild(player);
    bigDiv.appendChild(divCard);
    for(let i in shuffled){
      let miniDiv = document.createElement('div');
      miniDiv.id = i;
      miniDiv.name = shuffled[i].id;
      miniDiv.className = "mini-div";
      miniDiv.audio = shuffled[i].audio;
      divCard.appendChild(miniDiv);
      let cardImageBack = document.createElement('img');
      cardImageBack.id = "cardImageBack";
      cardImageBack.className = "card-image-back";
      cardImageBack.src = "pictures/back-goldencard-img.png";
      miniDiv.appendChild(cardImageBack);
      let cardImageFront = document.createElement('img');
      cardImageFront.id = 'cardImageFront';
      cardImageFront.className = "card-image-front";
      cardImageFront.src = shuffled[i].image;
      miniDiv.appendChild(cardImageFront);
      miniDiv.addEventListener('click', App.flipSelectedCard);
    }
    return bigDiv;
  },
 
  flipSelectedCard: function (){
    if (turn<2){
      turn++;
      this.style.transform = 'rotateY(180deg)';
      selectedCardsMiniDiv.push(this);
      if (turn===2 && selectedCardsMiniDiv[0].id==selectedCardsMiniDiv[1].id){
        selectedCardsMiniDiv.pop();
        turn=1;
      }
      else{
        if (turn ===2){
          setTimeout(function(){
            counting++;
            utilities.actualCount(counting);
            let cardsForMatch = App.checkMatch(selectedCardsMiniDiv[0].name, selectedCardsMiniDiv[1].name);
            if(cardsForMatch){
              App.match();
            }else{
              App.noMatch();
            }
          },850)
        }
      }
    }
  },
 
  checkMatch:(card1,card2)=>{
    if(card1==card2){
      return true
    } else {
      return  false
    }
  },
 
  match:()=>{
 
      matchCount++;
      selectedCardsMiniDiv[0].style.visibility ="hidden";
      selectedCardsMiniDiv[1].style.visibility ="hidden";
      utilities.modalMatch(selectedCardsMiniDiv);
      utilities.catchPokemon(selectedCardsMiniDiv);
      utilities.fillBar(pokemones,matchCount);
      App.resetValues();
      if(matchCount===pokemones.length){
        setTimeout(function(){
          utilities.modalWin(counting);
        },3000);
      } 
  },
 
  noMatch:()=>{
    setTimeout(function(){
      selectedCardsMiniDiv[0].style.transform = 'rotateY(0deg)';
      selectedCardsMiniDiv[1].style.transform = 'rotateY(0deg)';
      let audioNoMatch = new Audio("audios/nope.mp3");
      audioNoMatch.playbackRate=2;
      audioNoMatch.volume = 0.7;
      audioNoMatch.play();
      App.resetValues();
    },1000);
    return      
  },  
 
  resetValues: ()=>{
    turn=0;
    selectedCardsMiniDiv=[];
    return
  },
}          
export default App;

