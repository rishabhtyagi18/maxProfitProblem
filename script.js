
function MaxiumProfitCalculate(TotalTime, earning, buildingarr, businesss, probability) {
    for (let i = 0; i < probability.length; i++) {
      let currTime = TotalTime;
      if (currTime - probability[i].time <= 0) {
        if (earning >= businesss.earning) {
         
          if (businesss.built.length === 0)
            businesss.built.push([...buildingarr]);
          else if (
            businesss.earning === earning &&
            businesss.built.length > 0
          ) {
            let flag = true;
            for (let j = 0; j < businesss.built.length; j++) {
              if (
                businesss.built[j][0] === buildingarr[0] &&
                businesss.built[j][1] === buildingarr[1] &&
                businesss.built[j][2] === buildingarr[2]
              ) {
                flag = false;
                break;
              }
            }
            if (flag) businesss.built.push([...buildingarr]);
          } else if (businesss.earning < earning) {
            businesss.built = [];
            businesss.built.push([...buildingarr]);
          }
          businesss.earning = earning;
        }
      } else {
        currTime -= probability[i].time;
        earning += currTime * probability[i].cost;
        buildingarr[i] += 1;
        MaxiumProfitCalculate(currTime, earning, buildingarr, businesss, probability);
        buildingarr[i] -= 1;
        earning -= currTime * probability[i].cost;
      }
    }
    return;
  }
  
  function MaximumProfit(TotalTime) {
    let buildingarr = [0, 0, 0];
    let businesss = { earning: 0, built: [] };
    let probability = [
      { time: 5, cost: 1500 },
      { time: 4, cost: 1000 },
      { time: 10, cost: 3000 },
    ];
    MaxiumProfitCalculate(TotalTime, 0, buildingarr, businesss, probability);
    if (businesss["earning"] === 0) {
      console.log(`T:${0}P:${0}C:${0}`);
    } else {
      console.log("Earnings:", businesss.earning);
      for (let i = 0; i < businesss.built.length; i++) {
        console.log(
          `T:${businesss.built[i][0]}P:${businesss.built[i][1]}C:${businesss.built[i][2]}`
        );
      }
    }
  }
  
  MaximumProfit(7);
  MaximumProfit(8);
  MaximumProfit(13);
  
  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
  readline.question("Input: ", (inp) => {
  MaximumProfit(inp.split(" ").map((dt) => Number(dt))[0]);
    readline.close();
  });