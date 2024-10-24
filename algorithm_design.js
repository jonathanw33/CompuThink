document.addEventListener('DOMContentLoaded', function() {
    const steps = document.querySelectorAll('.step');
    const algorithmArea = document.getElementById('algorithmArea');
    const checkAlgorithmButton = document.getElementById('checkAlgorithm');
    const feedbackArea = document.getElementById('feedbackArea');

    // Add event listeners for drag and drop
    steps.forEach(step => {
        step.addEventListener('dragstart', dragStart);
        step.addEventListener('dragend', dragEnd);
        step.addEventListener('touchstart', touchStart);
        step.addEventListener('touchend', touchEnd);
    });

    algorithmArea.addEventListener('dragover', dragOver);
    algorithmArea.addEventListener('drop', drop);
    algorithmArea.addEventListener('touchmove', touchMove);

    // Drag Start
    function dragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.innerText);
        e.target.classList.add('dragging');
    }

    // Drag End
    function dragEnd(e) {
        e.target.classList.remove('dragging');
    }

    // Touch Start
    function touchStart(e) {
        const touch = e.touches[0];
        const target = document.elementFromPoint(touch.clientX, touch.clientY);
        if (target && target.classList.contains('step')) {
            e.dataTransfer.setData('text/plain', target.innerText);
            target.classList.add('dragging');
        }
    }

    // Touch End
    function touchEnd(e) {
        const touch = e.changedTouches[0];
        const target = document.elementFromPoint(touch.clientX, touch.clientY);
        if (target && target.id === 'algorithmArea') {
            drop(e);
        }
        e.target.classList.remove('dragging');
    }

    // Touch Move
    function touchMove(e) {
        e.preventDefault(); // Prevent scrolling while dragging
    }

    // Drag Over
    function dragOver(e) {
        e.preventDefault(); // Prevent default to allow drop
    }

    // Drop
    function drop(e) {
        e.preventDefault();
        const data = e.dataTransfer.getData('text/plain');
        
        // Find the original step element
        const originalStep = Array.from(steps).find(step => step.innerText === data);
        
        // Create a new step element in the algorithm area
        const newStep = document.createElement('div');
        newStep.classList.add('step');
        newStep.innerText = data;
        newStep.setAttribute('draggable', 'true');
        newStep.addEventListener('dragstart', dragStart);
        newStep.addEventListener('dragend', dragEnd);
        
        // Append the new step to the algorithm area
        algorithmArea.appendChild(newStep);
        
        // Remove the original step from the steps container
        if (originalStep) {
            originalStep.parentNode.removeChild(originalStep);
        }
    }

    // Check Algorithm Button
    checkAlgorithmButton.addEventListener('click', checkAlgorithm);

    function checkAlgorithm() {
        const stepsInAlgorithm = Array.from(algorithmArea.children).map(step => step.innerText);
        const correctOrder = [
            "Get bread slices",
            "Gather ingredients",
            "Put ingredients on bread",
            "Close sandwich",
            "Cut sandwich diagonally"
        ];
    
        if (JSON.stringify(stepsInAlgorithm) === JSON.stringify(correctOrder)) {
            feedbackArea.innerText = "Correct! You've made the sandwich successfully.";
            feedbackArea.classList.add('correct');
            feedbackArea.classList.remove('incorrect');
            feedbackArea.style.backgroundColor = 'green'; // Set background to green
        } else {
            feedbackArea.innerText = "Oops! The steps are not in the correct order. Try again.";
            feedbackArea.classList.add('incorrect');
            feedbackArea.classList.remove('correct');
            feedbackArea.style.backgroundColor = 'red'; // Set background to red
        }
    }
});