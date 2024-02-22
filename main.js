$(document).ready(function() {
    $('#newGame').click(function() {

      newGame();
    });

    $('#saveSettings').click(function() {
        sessionStorage.setItem('playerName', $('#playerName').val());
        sessionStorage.setItem('numberOfCards', $('#numberOfCards').val());
        location.reload(); 
    });
  
     
      if (sessionStorage.getItem('numberOfCards')) {
        let numberOfCards = sessionStorage.getItem('numberOfCards');
        generateCards(parseInt(numberOfCards, 10));
    }


    $("#tabs").tabs();

newGame();
  });
    
  let cards = [];
    let cardValues = [];
    let cardIds = [];
    let cardsFlipped = 0;

    images.forEach(image => {
      let img = new Image();
      img.src = `memory_1-1/memory_1/images/${image}`; 
    });
  
    
   
function newGame() {
  cardsFlipped = 0;
  let output = '';
  let numCards = $('#num_cards').val() || 48; 
  cardValues = generateCardValues(numCards);
  shuffleArray(cardValues);
  for (let i = 0; i < cardValues.length; i++) {
      
      output += '<div id="card_' + i + '" class="card" onclick="flipCard(this,\'' + cardValues[i] + '\')"></div>';
  }
  $('#cards').html(output);
}


function generateCards(numberOfCards) {
  let cards = [];
  for (let i = 0; i < numberOfCards / 2; i++) {
      cards.push(i, i); 
  }
  cards.sort(() => 0.5 - Math.random()); 

  let cardsHTML = '';
  cards.forEach(card => {
    
      cardsHTML += `<div class="cards"><img src="memory_1-1/memory_1/images/card_${card}.png""></div>`;
  });
  $('#cards').html(cardsHTML);
}
  
    
    function generateCardValues(numCards) {
        let values = [];
       
        for(let i = 0; i < numCards / 2; i++) {
            values.push(i);
            values.push(i);
        }
        return values;
    }

    
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    
    $(document).on('click', '.card', function() {
    window.flipCard = function(card, value) {
        if (card.innerHTML == "" && cardValues.length > cardsFlipped) {
            card.style.background = '#FFF'; 
            card.innerHTML = value; 
            if (cardIds.length == 0) {
                cardIds.push(card.id);
                cardValues.push(value);
            } else if (cardIds.length == 1) {
                cardIds.push(card.id);
                cardValues.push(value);
                if (cardValues[0] == cardValues[1]) {
                    cardsFlipped += 2;
                    
                    cardIds = [];
                    cardValues = [];
                    if (cardsFlipped == cardValues.length) {
                       
                        $('#cards').html('<h2>Game Over!</h2>');
                    }
                } else {
                    
                    function flipBack(){
                        let cardOne = document.getElementById(cardIds[0]);
                        let cardTwo = document.getElementById(cardIds[1]);
                        cardOne.style.background = '#000'; 
                        cardOne.innerHTML = "";
                        cardTwo.style.background = '#000'; 
                        cardTwo.innerHTML = "";
                        cardIds = [];
                        cardValues = [];
                    }
                    setTimeout(flipBack, 700);
                }
            }
        }
    }
});


    $(document).on('click', '.card', function() {
        $(this).find('img').fadeOut(500, function() {
          
          $(this).attr('src', 'memory_1-1\memory_1\images\blank.png').fadeIn(500);
        });
      });


function updateHighScore(score) {
  let highScore = localStorage.getItem('highScore') || 0;
  if (score > highScore) {
    localStorage.setItem('highScore', score);
    $('#highScore').text(score);
  }
}

$(document).ready(function() {
    $("#tabs").tabs();
  });