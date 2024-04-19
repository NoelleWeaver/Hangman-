$(document).ready(function(){
    //array of words for the game
    var words = ['banana', 'orange', 'apple', 'kiwi', 'grape', 'pear', 'danielisstupid']

    //Choosing random words using index
    var chosenWord = words[Math.floor(Math.random()*words.length)]
    var guessedLetters = []
    var remainingGuesses = 6

    //Display underscores for each letter of the chosen 
    for(var i=0;i< chosenWord.length;i++){
        $('#word-container').append('<div class="hidden-letter">_</div>')
    }

    //Functions to update the display of the guesses letters
    function updateGuesses(){
        $('#guess-container').empty()
        $('#guess-container').text("Guessed Letters: " + guessedLetters.join(', '))
    }

    //Function to check if the guess letter is in the chosen word
    function checkGuess(letter){
        if(chosenWord.indexOf(letter) === -1){
            remainingGuesses--
            $('#remaining-guesses').text("Remaining Guesses: " + remainingGuesses)
        }else{
            //Reveal the guessed letter
            $('.hidden-letter').each(function(index){
                if(chosenWord[index] === letter){
                    $(this).text(letter)
                }
            })
        }
        updateGuesses()
        checkGameStatus()
    }

    //function to check if the game has been won or lost
    function checkGameStatus(){
        if($('.hidden-letter:contains("_")').length === 0){
            alert('Congratulations You Won')
            resetGame()
        }else if(remainingGuesses === 0){
            alert("You suck the word was: " + chosenWord)
            resetGame()
        }
    }

    //function to reset the game
    function resetGame(){
        guessedLetters = []
        remainingGuesses = 6
        $('#remaining-guesses').text('Remaining Guesses: ' + remainingGuesses)
        $('#word-container').empty()
        chosenWord = words[Math.floor(Math.random()*words.length)];
        for(var i=0;i< chosenWord.length;i++){
            $('#word-container').append('<div class="hidden-letter">_</div>')
        }
        updateGuesses()
    }

    //Event handler for key presses
    $(document).keypress(function(event){
        var letter = String.fromCharCode(event.which).toLowerCase()
        if(letter.match(/[a-z]/) && guessedLetters.indexOf(letter) === -1){
            guessedLetters.push(letter)
            checkGuess(letter)
        }
    })

    //Event handler for the reset button
    $('#reset-button').click(function(){
        resetGame()
    })

    //Initial display of remaining guesses
    $('#remaining-guesses').text('Remaining Guesses: '+ remainingGuesses)

})