var gk_isXlsx = false;
var gk_xlsxFileLookup = {};
var gk_fileData = {};

function filledCell(cell) {
  return cell !== '' && cell != null;
}

function loadFileData(filename) {
  if (gk_isXlsx && gk_xlsxFileLookup[filename]) {
    try {
      var workbook = XLSX.read(gk_fileData[filename], { type: 'base64' });
      var firstSheetName = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[firstSheetName];

      // Convert sheet to JSON to filter blank rows
      var jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, blankrows: false, defval: '' });
      // Filter out blank rows (rows where all cells are empty, null, or undefined)
      var filteredData = jsonData.filter(row => row.some(filledCell));

      // Heuristic to find the header row by ignoring rows with fewer filled cells than the next row
      var headerRowIndex = filteredData.findIndex((row, index) =>
        row.filter(filledCell).length >= filteredData[index + 1]?.filter(filledCell).length
      );
      // Fallback
      if (headerRowIndex === -1 || headerRowIndex > 25) {
        headerRowIndex = 0;
      }

      // Convert filtered JSON back to CSV
      var csv = XLSX.utils.sheet_to_sheet(filteredData.slice(headerRowIndex));
      csv = XLSX.utils.sheet_to_csv(csv, { header: 1 });
      return csv;
    } catch (e) {
      console.error(e);
      return "";
    }
  }
  return gk_fileData[filename] || "";
}

// Smooth scrolling for nav links
document.querySelectorAll('.nav-link, .cta-button').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    window.scrollTo({
      top: targetSection.offsetTop - 60,
      behavior: 'smooth'
    });
  });
});

// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Form validation
const form = document.getElementById('contact-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !email || !message) {
    alert('Please fill in all fields.');
    return;
  }

  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  alert('Message sent successfully! (This is a demo.)');
  form.reset();
});

// Dynamic Projects
const projects = [
  {
    id: 1,
    title: 'Project 1',
    description: 'A web app built with HTML, CSS, and JavaScript.',
    details: 'Interactive dashboard with real-time data visualization, built using modern JavaScript frameworks.',
    image: 'https://images.unsplash.com/photo-1516321310768-61f0f8b1dd1f',
    demoLink: '#'
  },
  {
    id: 2,
    title: 'Project 2',
    description: 'A responsive portfolio website using React.',
    details: 'Dynamic single-page application with smooth animations and responsive design, powered by React and Tailwind CSS.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    demoLink: '#'
  },
  {
    id: 3,
    title: 'Project 3',
    description: 'An e-commerce platform with dynamic features.',
    details: 'Feature-rich platform with cart functionality, payment integration, and responsive design.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    demoLink: '#'
  }
];

const projectsGrid = document.getElementById('projects-grid');

function renderProjects() {
  projectsGrid.innerHTML = '';
  projects.forEach((project, index) => {
    const card = document.createElement('div');
    card.classList.add('project-card');
    card.style.animationDelay = `${index * 0.2}s`;
    card.innerHTML = `
      <img src="${project.image}" alt="${project.title}">
      <div class="project-info">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <button class="details-button" data-project-id="${project.id}">View Details</button>
      </div>
    `;
    projectsGrid.appendChild(card);
  });
}

// Modal Handling
const modal = document.getElementById('project-modal');
const modalImage = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalDetails = document.getElementById('modal-details');
const modalDemo = document.getElementById('modal-demo');
const modalClose = document.querySelector('.modal-close');

function openModal(projectId) {
  const project = projects.find(p => p.id === projectId);
  if (project) {
    modalImage.src = project.image;
    modalImage.alt = project.title;
    modalTitle.textContent = project.title;
    modalDescription.textContent = project.description;
    modalDetails.textContent = project.details;
    modalDemo.href = project.demoLink;
    modal.classList.add('active');
  }
}

function closeModal() {
  modal.classList.remove('active');
}

// Event Listeners
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('details-button')) {
    const projectId = parseInt(e.target.getAttribute('data-project-id'));
    openModal(projectId);
  }
});

modalClose.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Initialize projects
renderProjects();