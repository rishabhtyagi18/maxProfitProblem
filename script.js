const establishments = [
    { id: "T", value: "Theatre", time: 5, earning: 1500 },
    { id: "P", value: "Pub", time: 4, earning: 1000 },
    { id: "C", value: "Commercial Park", time: 10, earning: 3000 },
];

function findCombinations(n, nums = [4, 5, 10]) {
    const result = [];
    function backtrack(current, sum) {
        if (sum > n) return;
        result.push([...current]);
        for (let num of nums) {
            current.push(num);
            backtrack(current, sum + num);
            current.pop();
        }
    }
    backtrack([], 0);
    return result.filter((numArr) => numArr.length);
}

function getTotalOperatingTime(n, count, time) {
    let totalTime = 0;
    for (let i = 1; i <= count; i++) {
        totalTime += n - i * time;
    }
    return totalTime;
}

function showResults(n) {
    const combinations = findCombinations(n);
    
    const resultArr = combinations.reduce((acc, curr) => {
        const theatreTime = curr.filter((num) => num === 5).length;
        const pubTime = curr.filter((num) => num === 4).length;
        const parkTime = curr.filter((num) => num === 10).length;

        const theatreEarning = getTotalOperatingTime(n - pubTime * 4 - parkTime * 10, theatreTime, 5) * 1500;
        const pubEarning = getTotalOperatingTime(n - theatreTime * 5 - parkTime * 10, pubTime, 4) * 1000;
        const parkEarning = getTotalOperatingTime(n - pubTime * 4 - theatreTime * 5, parkTime, 10) * 3000;
        const maxEarnings = theatreEarning + pubEarning + parkEarning;

        const obj = { earnings: maxEarnings, solutions: { t: theatreTime,p: pubTime, c: parkTime } };
        return [...acc, obj];
    }, []);

    return [...resultArr]
        .sort((a, b) => a.earnings - b.earnings)
        .reduce((acc, curr) => {
            let arr = [...acc, curr];
            arr = arr.filter((item) => item.earnings >= curr.earnings);
            return arr;
        }, [])
        .filter(
            (obj, index, self) =>
                index === self.findIndex((o) => JSON.stringify(o) === JSON.stringify(obj))
        );
}

document.getElementById('calculateButton').addEventListener('click', () => {
    const inputValue = parseInt(document.getElementById('timeUnits').value);
    const results = showResults(inputValue);
    const resultsDiv = document.getElementById('results');
    
    resultsDiv.innerHTML = '';
    resultsDiv.style.display = 'block';

    if (results.length === 0) {
        resultsDiv.innerHTML = '<p>No combinations found for the given time units.</p>';
        return;
    }

    const resultHTML = results.map(result => {
        return `<p>Earnings: $${result.earnings}, Theatres (T): ${result.solutions.t}, Pubs (P): ${result.solutions.p}, Commercial Parks (C): ${result.solutions.c}</p>`;
    }).join('');

    resultsDiv.innerHTML = resultHTML;
});
