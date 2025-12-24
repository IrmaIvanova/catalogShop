// Данные курсов (из вашего текста)
const coursesData = [
    {
        id: 1,
        title: "The Ultimate Google Ads Training Course",
        price: 100,
        instructor: "Jerome Bell",
        category: "Marketing",
        image: "course1.png"
    },
    {
        id: 2,
        title: "Project Management Fundamentals",
        price: 400,
        instructor: "Miriam McGoney",
        category: "Management",
        image: "course2.png"
    },
    {
        id: 3,
        title: "HR Management and Analytics",
        price: 200,
        instructor: "Leslie Alexander",
        category: "HR & Running",
        image: "course3.png"
    },
    {
        id: 4,
        title: "Brand Management & PR Communications",
        price: 250,
        instructor: "Kristin Watson",
        category: "Marketing",
        image: "course4.png"
    },
    {
        id: 5,
        title: "Graphic Design Basic",
        price: 600,
        instructor: "Guy Hawkins",
        category: "Design",
        image: "course5.png"
    },
    {
        id: 6,
        title: "Business Development Management",
        price: 400,
        instructor: "Diane Russell",
        category: "Management",
        image: "course6.png"
    },
    {
        id: 7,
        title: "Highload Software Architecture",
        price: 400,
        instructor: "Brooklyn Stirnman",
        category: "Development",
        image: "course7.png"
    },
    {
        id: 8,
        title: "Human Resources – Selection and Recruitment",
        price: 150,
        instructor: "Kathryn Murphy",
        category: "HR & Running",
        image: "course8.png"
    },
    {
        id: 9,
        title: "User Experience: Human-centered Design",
        price: 240,
        instructor: "Cody Flover",
        category: "Design",
        image: "course9.png"
    }
];

// Категории из макета
const categories = [
    "All",
    "Marketing",
    "Management",
    "HR & Running",
    "Design",
    "Development"
];

// DOM элементы
let coursesGrid = document.getElementById('courses-grid');
let filtersList = document.querySelector('.filters__list');
let searchInput = document.querySelector('.search__input');

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    initCategories();
    renderCourses(coursesData);
    setupEventListeners();
});

// Инициализация категорий
function initCategories() {
    categories.forEach(category => {
        const button = document.createElement('button');
        button.className = 'filter__button';
        button.textContent = category;
        button.dataset.category = category;
        filtersList.appendChild(button);
    });
}

// Рендер карточек курсов
function renderCourses(courses) {
    coursesGrid.innerHTML = '';
    
    courses.forEach(course => {
        const card = document.createElement('article');
        card.className = 'course-card';
        card.innerHTML = `
            <div class="course-card__image">
                <img src="images/${course.image}" alt="${course.title}">
            </div>
            <div class="course-card__content">
                <h3 class="course-card__title">${course.title}</h3>
                <p class="course-card__instructor">by ${course.instructor}</p>
                <div class="course-card__footer">
                    <span class="course-card__price">$${course.price}</span>
                    <span class="course-card__category">${course.category}</span>
                </div>
            </div>
        `;
        coursesGrid.appendChild(card);
    });
}

// Настройка обработчиков событий
function setupEventListeners() {
    // Фильтрация по категориям
    document.querySelectorAll('.filter__button').forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            filterCourses(category);
            
            // Активный класс
            document.querySelectorAll('.filter__button').forEach(btn => {
                btn.classList.remove('filter__button--active');
            });
            button.classList.add('filter__button--active');
        });
    });

    // Поиск
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        searchCourses(searchTerm);
    });
}

// Фильтрация курсов
function filterCourses(category) {
    if (category === 'All') {
        renderCourses(coursesData);
        return;
    }
    
    const filtered = coursesData.filter(course => course.category === category);
    renderCourses(filtered);
}

// Поиск курсов
function searchCourses(term) {
    const filtered = coursesData.filter(course => 
        course.title.toLowerCase().includes(term) ||
        course.instructor.toLowerCase().includes(term) ||
        course.category.toLowerCase().includes(term)
    );
    renderCourses(filtered);
}