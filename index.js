const inputHeight = document.getElementById("input-info-height");
const inputWeight = document.getElementById("input-info-weight");
const inputAge = document.getElementById("input-info-age");
const resultCalories = document.getElementById("result-calories");
const resultProteinGm = document.getElementById("result-p-gram");
const resultProteinCal = document.getElementById("result-p-calories");
const resultFatGm = document.getElementById("result-f-gram");
const resultFatCal = document.getElementById("result-f-calories");
const resultCarbGm = document.getElementById("result-c-gram");
const resultCarbCal = document.getElementById("result-c-calories");
const calculateBtn = document.getElementById("calculate")
const resetBtn = document.getElementById("reset")
let bmr;
let energyReq;
let pieChart;

calculateBtn.addEventListener("click", () => {

    if(inputHeight.value === "" || inputWeight.value === "" || inputAge.value === "" ) {
        alert("Please fill out all the blank field.");
    } else {
        const activity = activityLevel();
        const bmr = calculateBmr();
        
        if(activity === "low") {
            energyReq = Math.round(bmr * 1.5);
        } else if(activity === "medium") {
            energyReq = Math.round(bmr * 1.75);
        } else {
            energyReq = Math.round(bmr * 2);
        }

        resultCalories.textContent = energyReq;
        //protein
        const pCal = Math.round(energyReq * 0.2);
        const pGm = Math.round(pCal / 4);
        resultProteinCal.textContent = pCal;
        resultProteinGm.textContent = pGm;
        //fat
        const fCal = Math.round(energyReq * 0.3);
        const fGm = Math.round(fCal / 9);
        resultFatCal.textContent = fCal;
        resultFatGm.textContent = fGm;
        //carb
        const cCal = Math.round(energyReq * 0.5);
        const cGm = Math.round(cCal / 4);
        resultCarbCal.textContent = cCal;
        resultCarbGm.textContent = cGm;
        //create pie chart
        const dataArr = [pGm, fGm, cGm];
        createPieChart(dataArr);
    }

})

function activityLevel() {
    const activity = document.getElementsByName("activity-level");
    for(let i = 0; i < activity.length; i++) {
        if(activity[i].checked) {
            return activity[i].value
        }
    }
}

function genderSelected() {
    const gender = document.getElementsByName("input-info-gender");
    for(let i = 0; i < gender.length; i++) {
        if(gender[i].checked) {
            return gender[i].value
        }
    }
}

function calculateBmr() {
    const heightVal = inputHeight.value;
    const weightVal = inputWeight.value;
    const ageVal = inputAge.value;
    const gender = genderSelected();

    if(gender === "male") {
        return Math.round((0.0481 * weightVal + 0.0234 * heightVal - 0.0138 * ageVal - 0.4235) * 1000 / 4.186);
    } else if(gender === "female") {
        return Math.round((0.0481 * weightVal + 0.0234 * heightVal - 0.0138 * ageVal - 0.9708) * 1000 / 4.186);
    }
}

resetBtn.addEventListener("click", () => {
    inputHeight.value = "";
    inputWeight.value = "";
    inputAge.value = "";
    resultCalories.textContent = 0;
    resultProteinGm.textContent = 0;
    resultProteinCal.textContent = 0;
    resultFatGm.textContent = 0;
    resultFatCal.textContent = 0;
    resultCarbGm.textContent = 0;
    resultCarbCal.textContent = 0;
    energyReq = 0;
    document.querySelector('input[name="input-info-gender"][checked]').checked = true;
    document.querySelector('input[name="activity-level"][checked]').checked = true;
    pieChart.destroy();
})

function createPieChart(dataArr) {
    const ctx = document.getElementById('pieChart');
    pieChart = new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["Protein", "Fat", "Carb"],
            datasets: [{
                data: dataArr,
                backgroundColor: ['rgb(253, 114, 142)', 'rgb(251, 205, 87)', 'rgb(63, 170, 236)'],
                datalabels: {
                    color: "black"
                }
            }]
        },
        plugins: [ChartDataLabels], //plugin for putting a label on each pie
        options: {
            responsive: true
        }
    })
}