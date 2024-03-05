let tableChart = document.querySelector('.table_chart')
let localDataForChart = []
let complete = 0
let uncomplete = 0

let greenImg = './assets/icon8-green.png'
let redImg = './assets/icons8-red.png'
let yellowImg = './assets/icons8-yellow.png'
function handlerLocalDataForChart() {
    let counter = 1

    for (let i = localDataForChart.length - 1; i >= 0; i--) {
        let sourceImg = greenImg
        if (localDataForChart[i].PercentOfComplete < 33) {
            sourceImg = redImg
        } else if (localDataForChart[i].PercentOfComplete >= 33 && localDataForChart[i].PercentOfComplete < 66) {
            sourceImg = yellowImg
        }
        let startCharts = (`<tr class="row_inside">
            <th scope="row">${counter}</th>
            <td>${localDataForChart[i].Order}</td>
            <td>${localDataForChart[i].BoxSerial}</td>
             <td>${localDataForChart[i].Status}</td>
              <td>${localDataForChart[i].SkusOrdered}</td>
               <td>${localDataForChart[i].SkusManufactured}</td>
                <td>${localDataForChart[i].PercentOfComplete} % </td>
                <td><img src="${sourceImg}" style="height: 15px;width: 15px;"></td>
        </tr>`)
        tableChart.insertAdjacentHTML('beforeend', startCharts)
        counter++;
    }
}

function getDataFromMiddleEnd() {
    let requestOptions = {
        method: 'POST',
        redirect: 'follow'
    };

    fetch("http://localhost:5103/api/getvisual", requestOptions)
        .then(response => response.json())
        .then(function (result) {
            localDataForChart = result
            handlerLocalDataForChart()
            localDataForChart.forEach(element => {
                if (element.PercentOfComplete === 100) {
                    complete++;
                } else {
                    uncomplete++;
                }
            })
            new Chart(document.getElementById("pie-chart"), {
                type: 'doughnut',
                data: {
                    labels: ["Выполненные", "Не выполненные"],
                    datasets: [{
                        backgroundColor: ["#008000", "#FFA500"],
                        data: [complete, uncomplete]
                    }]
                },
                options: {
                    title: {
                        display: true,
                        text: 'Процент выполнения заказов'
                    }
                }
            })
        }
        )
        .catch(error => console.log('error', error));
}

window.addEventListener('load', () => {
    getDataFromMiddleEnd();
});
