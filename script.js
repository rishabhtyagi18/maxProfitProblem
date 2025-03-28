function calculateProperties(timeUnits) {
    const theatreTime = 5;
    const pubTime = 4;
    const parkTime = 10;

    const theatreEarning = 1500;
    const pubEarning = 1000;
    const parkEarning = 3000;

    let maxEarnings = 0;
    let solutions = [];

    for (let t = 0; t <= Math.floor(timeUnits / theatreTime); t++) {
        for (let p = 0; p <= Math.floor(timeUnits / pubTime); p++) {
            for (let c = 0; c <= Math.floor(timeUnits / parkTime); c++) {
                const totalTime = (t * theatreTime) + (p * pubTime) + (c * parkTime);
                if (totalTime <= timeUnits) {
                    const totalEarnings = (t * theatreEarning) + (p * pubEarning) + (c * parkEarning);
                    if (totalEarnings > maxEarnings) {
                        maxEarnings = totalEarnings;
                        solutions = [{ t, p, c }];
                    } else if (totalEarnings === maxEarnings) {
                        solutions.push({ t, p, c });
                    }
                }
            }
        }
    }

    return {
        earnings: maxEarnings,
        solutions: solutions
    };
}

function showResults() {
    const timeUnits = parseInt(document.getElementById('timeUnits').value);
    const resultDiv = document.getElementById('results');
    const { earnings, solutions } = calculateProperties(timeUnits);

    if (solutions.length > 0) {
        let output = `<strong>Earnings:</strong> $${earnings}<br><strong>Solutions:</strong><ul>`;
        solutions.forEach(solution => {
            output += `<li>T: ${solution.t} P: ${solution.p} C: ${solution.c}</li>`;
        });
        output += '</ul>';
        resultDiv.innerHTML = output;
        resultDiv.style.display = 'block';
    } else {
        resultDiv.innerHTML = `<strong>No valid solutions found for ${timeUnits} time units.</strong>`;
        resultDiv.style.display = 'block';
    }
}