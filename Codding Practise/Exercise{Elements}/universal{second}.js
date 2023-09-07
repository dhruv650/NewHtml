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