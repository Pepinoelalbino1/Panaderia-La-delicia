let count = 0;
const countElement = document.getElementById('count');

function incrementCount() {
    count++;
    countElement.textContent = count;
    if (count === 1) {
        alert('¡Felicidades! Has horneado tu primer pan del día.');
    } else if (count % 10 === 0) {
        alert('¡Increíble! Has horneado ' + count + ' panes.');
    }
}