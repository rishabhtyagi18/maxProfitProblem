const time_unit = [4, 5, 10];
let allSolutions = [];
let maxEarnings = 0;

document.getElementById("calculateButton").addEventListener("click", calculateEarnings);

function calculateEarnings() {
    const n = parseInt(document.getElementById("timeUnits").value);
    if (isNaN(n) || n < 4) {
        alert("Please enter a valid time unit (minimum 4).");
        return;
    }

    allSolutions = [];
    maxEarnings = 0;
    find(n, [0, 0, 0], 0);

    const resultsDiv = document.getElementById("results");
    resultsDiv.style.display = "block";
    
    resultsDiv.innerHTML = `
        <h2>Max Earnings: $${maxEarnings}</h2>
        <p>Possible Solutions:</p>
        <ul>
            ${allSolutions.map(sol => `<li>${sol}</li>`).join('')}
        </ul>
    `;
}

function find(n, counts, currentEarnings) {
    for (let i = 0; i < time_unit.length; i++) {
        if (n >= time_unit[i]) {
            const earnings = currentEarnings + (n - time_unit[i]) * 
                (1000 * (i === 0) + 1500 * (i === 1) + 3000 * (i === 2));
            
            counts[i]++;

            if (earnings > maxEarnings) {
                maxEarnings = earnings;
                allSolutions = [];
            }

            if (earnings === maxEarnings) {
                const solution = `Theatres (T): ${counts[1]}, Pubs (P): ${counts[0]}, Commercial Parks (C): ${counts[2]}`;
                if (!allSolutions.includes(solution)) {
                    allSolutions.push(solution);
                }
            }
            
            find(n - time_unit[i], counts.slice(), earnings);
            counts[i]--;
        }
    }
}