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
        category: "HR & Recruting",
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
        category: "HR & Recruting",
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
    "HR & Recruting",
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
    const filtersList = document.getElementById('filtersList');

    categories.forEach((category, index) => {
        const button = document.createElement('button');
        button.className = index === 0 ? 'filter__button filter__button--active' : 'filter__button';
        button.textContent = category;
        button.dataset.category = category;
        button.type = 'button';
        button.setAttribute('aria-label', `Filter by ${category}`);
        filtersList.appendChild(button);
    });
}
// Рендер карточек курсов
function renderCourses(courses) {
    const coursesGrid = document.getElementById('coursesGrid');
    const noResults = document.getElementById('noResults');

    coursesGrid.innerHTML = '';

    if (courses.length === 0) {
        noResults.classList.remove('hidden');
        return;
    }

    noResults.classList.add('hidden');

    courses.forEach(course => {
        const card = document.createElement('article');
        card.className = 'course-card fade-in';

        // Используем placeholder изображение если нет реального
        const imageUrl = course.image ? `images/${course.image}` : `https://picsum.photos/400/200?random=${course.id}`;

        const className = course.category
            .toLowerCase()               // в нижний регистр
            .replace(/\s+/g, '')        // пробелы на дефисы

        card.innerHTML = `
            <div class="course-card__image">
                <img src="${imageUrl}" alt="${course.title}" loading="lazy">
            </div>
            <div class="course-card__content">
             <span class="course-card__category course-card__category--${className.includes("hr") ? "hr" : className}">${course.category}</span>
                <h3 class="course-card__title">${course.title}</h3>
 
                <div class="course-card__footer">
                    <span class="course-card__price">$${course.price}</span>
                    <span class="course-card__divider"></span>
                    <p class="course-card__instructor">by ${course.instructor}</p>
                   
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
        button.addEventListener('click', function () {
            const category = this.dataset.category;
            filterCourses(category);

            // Удаляем активный класс у всех кнопок
            document.querySelectorAll('.filter__button').forEach(btn => {
                btn.classList.remove('filter__button--active');
            });

            // Добавляем активный класс нажатой кнопке
            this.classList.add('filter__button--active');

            // Сбрасываем поиск если есть
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                searchInput.value = '';
            }
        });
    });

    // Поиск с debounce
    const searchInput = document.getElementById('searchInput');
    let searchTimeout;

    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const searchTerm = e.target.value.trim().toLowerCase();
            searchCourses(searchTerm);

            // Сбрасываем активную категорию при поиске
            document.querySelectorAll('.filter__button').forEach(btn => {
                btn.classList.remove('filter__button--active');
            });
            // Активируем кнопку "All"
            document.querySelector('.filter__button[data-category="All"]')?.classList.add('filter__button--active');
        }, 300);
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