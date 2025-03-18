// Initialize Trends Chart
const trendsChart = new Chart(
  document.getElementById('trendsChart'),
  {
    type: 'line',
    data: {
      labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN'],
      datasets: [
        {
          label: 'Requests Raised',
          data: [465, 475, 480, 479, 500, 449],
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4,
          pointRadius: 4,
          pointHoverRadius: 6
        },
        {
          label: 'Requests Processed',
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

// Initialize Box Status Chart
const boxStatusChart = new Chart(
  document.getElementById('boxStatusChart'),
  {
    type: 'doughnut',
    data: {
      labels: ['Delivered', 'In Transit', 'Processing', 'Pending'],
      datasets: [{
        data: [45, 25, 20, 10],
        backgroundColor: [
          'rgb(34, 197, 94)',
          'rgb(59, 130, 246)',
          'rgb(234, 179, 8)',
          'rgb(107, 114, 128)'
        ],
        borderWidth: 0,
        hoverOffset: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            usePointStyle: true,
            pointStyle: 'circle',
            padding: 20
          }
        }
      }
    }
  }
);

// Initialize Delivery Performance Chart
const deliveryChart = new Chart(
  document.getElementById('deliveryChart'),
  {
    type: 'bar',
    data: {
      labels: ['MON', 'TUE', 'WED', 'THU', 'FRI'],
      datasets: [
        {
          label: 'On Time',
          data: [65, 75, 70, 80, 75],
          backgroundColor: 'rgb(34, 197, 94)',
          borderRadius: 4
        },
        {
          label: 'Delayed',
          data: [35, 25, 30, 20, 25],
          backgroundColor: 'rgb(239, 68, 68)',
          borderRadius: 4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            usePointStyle: true,
            pointStyle: 'circle',
            padding: 20
          }
        }
      },
      scales: {
        x: {
          stacked: true,
          grid: {
            display: false
          }
        },
        y: {
          stacked: true,
          grid: {
            color: 'rgba(0, 0, 0, 0.05)'
          }
        }
      }
    }
  }
);

// Initialize Client Distribution Chart
const clientChart = new Chart(
  document.getElementById('clientChart'),
  {
    type: 'pie',
    data: {
      labels: ['Raymond James', 'True Blue', 'Tech Corp', 'Others'],
      datasets: [{
        data: [40, 30, 20, 10],
        backgroundColor: [
          'rgb(59, 130, 246)',
          'rgb(34, 197, 94)',
          'rgb(234, 179, 8)',
          'rgb(107, 114, 128)'
        ],
        borderWidth: 0,
        hoverOffset: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            usePointStyle: true,
            pointStyle: 'circle',
            padding: 20
          }
        }
      }
    }
  }
);

// Initialize Logistics Performance Chart
const logisticsChart = new Chart(
  document.getElementById('logisticsChart'),
  {
    type: 'line',
    data: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [
        {
          label: 'Processing Time',
          data: [24, 28, 22, 25],
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4,
          fill: true
        },
        {
          label: 'Delivery Time',
          data: [48, 45, 50, 46],
          borderColor: 'rgb(234, 179, 8)',
          backgroundColor: 'rgba(234, 179, 8, 0.1)',
          tension: 0.4,
          fill: true
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            usePointStyle: true,
            pointStyle: 'circle',
            padding: 20
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(0, 0, 0, 0.05)'
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      }
    }
  }
);

// Initialize tooltips
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

// Initialize dropdowns
const dropdowns = document.querySelectorAll('.dropdown-toggle');
dropdowns.forEach(dropdown => {
  new bootstrap.Dropdown(dropdown);
});

// Add search functionality to tables
document.querySelectorAll('input[placeholder*="Search"]').forEach(searchInput => {
  searchInput.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const table = this.closest('.card').querySelector('table');
    const rows = table.querySelectorAll('tbody tr');
    
    rows.forEach(row => {
      const text = row.textContent.toLowerCase();
      row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
  });
});

// Handle notification click
document.querySelector('.notifications').addEventListener('click', function() {
  const notificationOffcanvas = new bootstrap.Offcanvas(document.getElementById('notificationOffcanvas'));
  notificationOffcanvas.show();
});

// Handle sidebar navigation
document.querySelectorAll('.sidebar-nav .nav-link').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#' || !href) {
      e.preventDefault();
      window.location.href = '/construction.html';
    }
  });
});

    document.getElementById('downloadDropdown').addEventListener('click', function (event) {
        event.preventDefault(); // Prevents the default behavior of the dropdown toggle
    });

