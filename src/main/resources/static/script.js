let chart;

document.getElementById('compoundInterestForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const principal = parseFloat(document.getElementById('principal').value);
    const rate = parseFloat(document.getElementById('rate').value);
    const time = parseInt(document.getElementById('time').value);
    const recurringContribution = parseFloat(document.getElementById('recurringContribution').value);
    const apiUrl = `/calculate?principal=${principal}&rate=${rate}&time=${time}&recurringContribution=${recurringContribution}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            document.getElementById('futureValue').textContent = `$${data.futureValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

            // Generate yearly graph data
            const months = time * 12;
            const monthlyRate = rate / 100 / 12;
            let currentValue = principal;
            let graphData = [];
            let totalInvestmentData = [];
            let inflationAdjustedData = [];
            let labels = [];

            // Track value for each year
            for (let month = 1; month <= months; month++) {
                // Apply compound interest for the month
                currentValue = currentValue * (1 + monthlyRate) + recurringContribution;

                const totalInvested = principal + recurringContribution * month;
                const inflationAdjustedValue = currentValue / Math.pow(1 + 0.031, month / 12);

                if (month % 12 === 0) {
                    graphData.push(currentValue);
                    totalInvestmentData.push(totalInvested);
                    inflationAdjustedData.push(inflationAdjustedValue);
                    labels.push(month / 12);
                }
            }
            if (chart instanceof Chart) {
                chart.destroy();
                chart = null;
            }
            
            const canvas = document.getElementById('growthChart');
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Compound Interest Growth',
                            data: graphData,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            fill: false
                        },
                        {
                            label: 'Total Amount Invested',
                            data: totalInvestmentData,
                            borderColor: 'rgba(255, 99, 132, 1)',
                            fill: false
                        },
                        {
                            label: 'Inflation-Adjusted Value',
                            data: inflationAdjustedData,
                            borderColor: 'rgba(54, 162, 235, 1)',
                            fill: false
                        }
                    ]
                },
                options: {
                    responsive: true,
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Years'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Amount ($)'
                            }
                        }
                    }
                }
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
