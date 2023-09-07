 function showAnswer(questionNumber) {
            var answerContainer = document.getElementById('answer-' + questionNumber);
            var showButton = document.getElementById('show-button-' + questionNumber);
            
            if (answerContainer.style.display === 'none') {
                answerContainer.style.display = 'block';
                showButton.innerHTML = 'Hide Answer';
            } else {
                answerContainer.style.display = 'none';
                showButton.innerHTML = 'Show Answer';
            }
        }
        
        function markComplete(questionNumber) {
            var questionContainer = document.getElementById('question-' + questionNumber);
            var doneButton = document.getElementById('done-button-' + questionNumber);
            
            questionContainer.classList.add('completed');
            doneButton.disabled = true;
            
            updateCompletionStatus();
            saveCompletionStatus(questionNumber);
        }
        
        function updateCompletionStatus() {
            var completedCount = document.querySelectorAll('.completed').length;
            var totalQuestions = 100;
            
            var completedIndicator = document.getElementById('completed-indicator');
            completedIndicator.innerHTML = 'You have completed ' + completedCount + ' out of ' + totalQuestions + ' questions.';
            
            if (completedCount === totalQuestions) {
                completedIndicator.innerHTML += ' Congratulations!';
                completedIndicator.classList.add('completed');
            } else {
                completedIndicator.classList.remove('completed');
            }
        }
        
        function saveCompletionStatus(questionNumber) {
            var completionStatus = getCompletionStatus();
            completionStatus[questionNumber] = true;
            localStorage.setItem('completionStatus', JSON.stringify(completionStatus));
        }
        
        function getCompletionStatus() {
            var completionStatus = localStorage.getItem('completionStatus');
            return completionStatus ? JSON.parse(completionStatus) : {};
        }
        
        function restoreCompletionStatus() {
            var completionStatus = getCompletionStatus();
            for (var questionNumber in completionStatus) {
                if (completionStatus.hasOwnProperty(questionNumber) && completionStatus[questionNumber]) {
                    var questionContainer = document.getElementById('question-' + questionNumber);
                    var doneButton = document.getElementById('done-button-' + questionNumber);
                    questionContainer.classList.add('completed');
                    doneButton.disabled = true;
                }
            }
            updateCompletionStatus();
        }
        
        function updateProgress() {
            var completedCount = document.querySelectorAll('.completed').length;
            var totalQuestions = 100;
            
            var progressIndicator = document.getElementById('progress-indicator');
            progressIndicator.innerHTML = 'You have completed ' + completedCount + ' out of ' + totalQuestions + ' questions.';
        }
        
        window.onload = function() {
            restoreCompletionStatus();
            updateCompletionStatus();
            updateProgress();
        };
