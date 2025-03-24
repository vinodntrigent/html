// Revenue Chart
const revenueChart = new Chart(
  document.getElementById('revenueChart'),
  {
    type: 'line',
    data: {
      labels: ['New York', 'Boston', 'Atlanta', 'Seattle', 'California', 'Las Vegas'],
      datasets: [
        {
          label: 'Revenue (in Million $)',
          data: [2, 3, 5, 4, 6.7, 8],
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4,
          pointRadius: 4,
          pointHoverRadius: 6
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        intersect: false,
        mode: 'index'
      },
      plugins: {
        legend: {
          position: 'top',
          labels: {
            usePointStyle: true,
            pointStyle: 'circle',
            padding: 20
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: 12,
          titleColor: '#fff',
          titleFont: {
            size: 14,
            weight: 'bold'
          },
          bodyFont: {
            size: 13
          }
        }
      },
      scales: {
        y: {
          beginAtZero: false,
          min: 1,
          max: 10,
          grid: {
            color: 'rgba(0, 0, 0, 0.05)'
          }
        },
        x: {
          grid: {
            color: 'rgba(0, 0, 0, 0.05)'
          }
        }
      }
    }
  }
);


// Profit Chart
const profitChart = new Chart(
  document.getElementById('profitChart'),
  {
    type: 'line',
    data: {
      labels: ['JAN', 'FEB', 'MAR'],
      datasets: [
        {
          label: 'Profit (in Million $)',
          data: [5, 8, 10],
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4,
          pointRadius: 4,
          pointHoverRadius: 6
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        intersect: false,
        mode: 'index'
      },
      plugins: {
        legend: {
          position: 'top',
          labels: {
            usePointStyle: true,
            pointStyle: 'circle',
            padding: 20
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: 12,
          titleColor: '#fff',
          titleFont: {
            size: 14,
            weight: 'bold'
          },
          bodyFont: {
            size: 13
          }
        }
      },
      scales: {
        y: {
          beginAtZero: false,
          min: 2,
          max: 10,
          grid: {
            color: 'rgba(0, 0, 0, 0.05)'
          }
        },
        x: {
          grid: {
            color: 'rgba(0, 0, 0, 0.05)'
          }
        }
      }
    }
  }
);


// Asset Utilization Chart
const assetChart = new Chart(
  document.getElementById('assetChart'),
  {
    type: 'doughnut',
    data: {
      labels: ['Hours Worked', 'Hours Billed'],
      datasets: [
        {
          label: 'Asset Utilization (in %)',
          data: [100, 85],
          labels: ['Red', 'Orange'],
          tension: 0.4,
          pointRadius: 4,
          pointHoverRadius: 6
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        intersect: false,
        mode: 'index'
      },
      plugins: {
        legend: {
          position: 'top',
          labels: {
            usePointStyle: true,
            pointStyle: 'circle',
            padding: 20
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: 12,
          titleColor: '#fff',
          titleFont: {
            size: 14,
            weight: 'bold'
          },
          bodyFont: {
            size: 13
          }
        }
      }
    }
  }
);



// Initialize Trends Chart
const chargesChart = new Chart(
  document.getElementById('chargesChart'),
  {
    type: 'line',
    data: {
      labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN'],
      datasets: [
        {
          label: 'Receiving/Handling',
          data: [465, 475, 480, 479, 500, 449],
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4,
          pointRadius: 4,
          pointHoverRadius: 6
        },
        {
          label: 'Storage Charges',
          data: [475, 490, 495, 500, 500, 450],
          borderColor: 'rgb(239, 68, 68)',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          tension: 0.4,
          pointRadius: 4,
          pointHoverRadius: 6
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        intersect: false,
        mode: 'index'
      },
      plugins: {
        legend: {
          position: 'top',
          labels: {
            usePointStyle: true,
            pointStyle: 'circle',
            padding: 20
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: 12,
          titleColor: '#fff',
          titleFont: {
            size: 14,
            weight: 'bold'
          },
          bodyFont: {
            size: 13
          }
        }
      },
      scales: {
        y: {
          beginAtZero: false,
          min: 400,
          max: 550,
          grid: {
            color: 'rgba(0, 0, 0, 0.05)'
          }
        },
        x: {
          grid: {
            color: 'rgba(0, 0, 0, 0.05)'
          }
        }
      }
    }
  }
);


