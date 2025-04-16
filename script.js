document.addEventListener('DOMContentLoaded', function() {
    // Обработчик кнопки "Заказать праздник"
const orderBtn = document.getElementById('order-btn');
const orderModal = document.getElementById('order-modal');
const orderCloseBtn = orderModal.querySelector('.close');

orderBtn.addEventListener('click', function() {
    orderModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Инициализация карты (если еще не инициализирована)
    if (!window.orderMap) {
        initOrderMap();
    }
});

orderCloseBtn.addEventListener('click', function() {
    orderModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Функция для инициализации карты
function initOrderMap() {
    // Координаты центра карты
    const center = [51.624154, 45.973235];
    
    // Создаем карту
    window.orderMap = new ymaps.Map('order-map', {
        center: center,
        zoom: 16
    });
    
    // Добавляем метку
    const placemark = new ymaps.Placemark(center, {
        hintContent: 'ЧайЛэнд',
        balloonContent: 'Детский развлекательный центр ЧайЛэнд'
    }, {
        iconLayout: 'default#image',
        iconImageHref: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
        iconImageSize: [40, 40],
        iconImageOffset: [-20, -40]
    });
    
    window.orderMap.geoObjects.add(placemark);
}

// Обработчик формы заказа
document.getElementById('order-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Здесь можно добавить отправку данных на сервер
    alert('Ваша заявка принята! Мы свяжемся с вами в ближайшее время.');
    
    // Закрываем модальное окно
    orderModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Очищаем форму
    this.reset();
});

// Подключаем API Яндекс.Карт
function loadYandexMap() {
    const script = document.createElement('script');
    script.src = 'https://api-maps.yandex.ru/2.1/?apikey=ваш_api_ключ&lang=ru_RU';
    script.onload = function() {
        ymaps.ready(initOrderMap);
    };
    document.head.appendChild(script);
}

// Загружаем карты при открытии страницы
loadYandexMap();
    const burgerMenu = document.querySelector('.burger-menu');
   const navMenu = document.querySelector('nav ul');
   
   burgerMenu.addEventListener('click', function() {
       navMenu.classList.toggle('show');
               if (navMenu.classList.contains('show')) {
           navMenu.style.display = 'flex';
           setTimeout(() => {
               navMenu.style.opacity = '1';
               navMenu.style.transform = 'translateY(0)';
           }, 10);
       } else {
           navMenu.style.opacity = '0';
           navMenu.style.transform = 'translateY(-20px)';
           setTimeout(() => {
               navMenu.style.display = 'none';
           }, 300);
       }
   });
   // Функция для загрузки API Яндекс.Карт
function loadYandexMaps() {
    const script = document.createElement('script');
    script.src = 'https://api-maps.yandex.ru/2.1/?apikey=ВАШ_API_КЛЮЧ&lang=ru_RU';
    script.onload = function() {
        ymaps.ready(initMainMap);
    };
    document.head.appendChild(script);
}

// Функция инициализации карты
function initMainMap() {
    // Координаты центра карты
    const center = [51.624154, 45.973235];
    
    // Создаем карту
    const map = new ymaps.Map('main-map', {
        center: center,
        zoom: 16
    });
    
    // Создаем метку
    const placemark = new ymaps.Placemark(center, {
        hintContent: 'ЧайЛэнд',
        balloonContent: 'Детский развлекательный центр ЧайЛэнд'
    }, {
        // Опции метки
        iconLayout: 'default#image',
        iconImageHref: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', // Иконка метки
        iconImageSize: [40, 40],
        iconImageOffset: [-20, -40]
    });
    
    // Добавляем метку на карту
    map.geoObjects.add(placemark);
    
    // Добавляем элементы управления
    map.controls.remove('geolocationControl');
    map.controls.remove('searchControl');
    map.controls.remove('trafficControl');
    map.controls.remove('typeSelector');
    map.controls.remove('fullscreenControl');
    map.controls.remove('rulerControl');
}

// Загружаем карты при открытии страницы
loadYandexMaps();

       navMenu.style.display = 'none';
   navMenu.style.opacity = '0';
   navMenu.style.transform = 'translateY(-20px)';
   navMenu.style.transition = 'all 0.3s ease';
   
  
   document.querySelectorAll('nav ul li a').forEach(link => {
       link.addEventListener('click', function() {
           if (window.innerWidth <= 768) {
               navMenu.classList.remove('show');
               navMenu.style.opacity = '0';
               navMenu.style.transform = 'translateY(-20px)';
               setTimeout(() => {
                   navMenu.style.display = 'none';
               }, 300);
           }
       });
   });
   
   
   document.querySelectorAll('a[href^="#"]').forEach(anchor => {
       anchor.addEventListener('click', function(e) {
           e.preventDefault();
           
           const targetId = this.getAttribute('href');
           const targetElement = document.querySelector(targetId);
           
           if (targetElement) {
               window.scrollTo({
                   top: targetElement.offsetTop - 80,
                   behavior: 'smooth'
               });
           }
       });
   });
   
   
   const calculatorForm = document.getElementById('service-calculator');
   const checkboxes = document.querySelectorAll('input[type="checkbox"]');
   const childrenInput = document.getElementById('children');
   const selectedServicesDiv = document.getElementById('selected-services');
   const totalAmountDiv = document.querySelector('.total-amount');
   const payBtn = document.getElementById('pay-btn');
   const paymentModal = document.getElementById('payment-modal');
   const closeModal = document.querySelector('.close');
   const paymentDetails = document.getElementById('payment-details');
   
   let selectedServices = [];
   let totalAmount = 0;
   
   
   function updateCalculator() {
       selectedServices = [];
       totalAmount = 0;
       const childrenCount = parseInt(childrenInput.value) || 1;
       
       
       document.querySelectorAll('input[name="service"]:checked').forEach(checkbox => {
           const service = {
               name: checkbox.dataset.name,
               price: parseInt(checkbox.value) * childrenCount
           };
           selectedServices.push(service);
           totalAmount += service.price;
       });
       
               document.querySelectorAll('input[name="extra"]:checked').forEach(checkbox => {
           const service = {
               name: checkbox.dataset.name,
               price: parseInt(checkbox.value) * childrenCount
           };
           selectedServices.push(service);
           totalAmount += service.price;
       });
       
               updateSelectedServicesDisplay();
       updateTotalAmount();
   }
   
       function updateSelectedServicesDisplay() {
       selectedServicesDiv.innerHTML = '';
       
       if (selectedServices.length === 0) {
           selectedServicesDiv.innerHTML = '<p>Выберите услуги из списка выше</p>';
           return;
       }
       
       selectedServices.forEach(service => {
           const serviceElement = document.createElement('div');
           serviceElement.innerHTML = `<strong>${service.name}</strong>: ${service.price} руб.`;
           selectedServicesDiv.appendChild(serviceElement);
       });
   }
   
       function updateTotalAmount() {
       totalAmountDiv.textContent = `${totalAmount} руб.`;
       payBtn.disabled = totalAmount === 0;
   }
   
      checkboxes.forEach(checkbox => {
       checkbox.addEventListener('change', updateCalculator);
   });
   
   childrenInput.addEventListener('input', updateCalculator);
   
   updateCalculator();
   
    payBtn.addEventListener('click', function() {
       if (totalAmount > 0) {
                      paymentDetails.innerHTML = `
               <h3>Детали заказа</h3>
               ${selectedServices.map(service => `
                   <div>${service.name} - ${service.price} руб.</div>
               `).join('')}
               <div style="margin-top: 10px; font-weight: bold; border-top: 1px solid #ddd; padding-top: 10px;">
                   Итого: ${totalAmount} руб.
               </div>
           `;
           
                      paymentModal.style.display = 'block';
           document.body.style.overflow = 'hidden';
       }
   });
   
      closeModal.addEventListener('click', function() {
       paymentModal.style.display = 'none';
       document.body.style.overflow = 'auto';
   });
   
     window.addEventListener('click', function(event) {
       if (event.target === paymentModal) {
           paymentModal.style.display = 'none';
           document.body.style.overflow = 'auto';
       }
   });
   
      document.getElementById('card-form').addEventListener('submit', function(e) {
       e.preventDefault();
       
      
       alert('Оплата прошла успешно! Спасибо за заказ.');
       
       
       paymentModal.style.display = 'none';
       document.body.style.overflow = 'auto';
       
     
       this.reset();
       calculatorForm.reset();
       selectedServices = [];
       totalAmount = 0;
       updateCalculator();
   });
   
      window.addEventListener('resize', function() {
       if (window.innerWidth > 768) {
           navMenu.style.display = 'flex';
           navMenu.style.opacity = '1';
           navMenu.style.transform = 'translateY(0)';
       } else {
           if (!navMenu.classList.contains('show')) {
               navMenu.style.display = 'none';
               navMenu.style.opacity = '0';
               navMenu.style.transform = 'translateY(-20px)';
           }
       }
   });
});
// Адаптация номера телефона
function adaptPhoneNumber() {
    const phoneElement = document.querySelector('.header-phone');
    if (window.innerWidth <= 480) {
        phoneElement.innerHTML = '<i class="fas fa-phone"></i>';
        phoneElement.title = '+7 (927) 136-94-53';
    } else {
        phoneElement.innerHTML = '<i class="fas fa-phone"></i> +7 (927) 136-94-53';
    }
}

// Вызываем при загрузке и изменении размера
window.addEventListener('load', adaptPhoneNumber);
window.addEventListener('resize', adaptPhoneNumber);
