> Написание текста для этого файла в процессе. Он включен в репозиторий для того, чтобы дать приблизительное представление о том, как будут выглядеть соглашения об именовании в дальнейшем
## Именование классов
1. Добавляйте постфикс с описанием типа элемента в зависимости от его тэга и содержимого
    ```html
	<a class="addresses-of-shops-link">
      Адреса магазинов в г.Ростов-на-Дону
    </a>
   
    <span class="copyright-text">
      @ 0000-0000 Nobody
    </span>

	<button class="remove-btn"></button>

	<svg class="cross-icon">
      <use href="#cross"></use>
    </svg>
    ```
2. Если элемент содержит в себе больше одного элемента, давайте общее название, описывающее его содержимое
    ```html
    <div class="reviews">
      <h1>Обзоры</h1>
      <div class="reviews-cont-wrap-wrap">
        ...
      </div>
    </div>

	<div class="empty-cart">
      <svg>
        <use href='#cart'><use>
      <svg>
      <h1>Ваша корзина пуста</h1>
    </div>

	<div class="cart-items">
	  <div class="cart-item"><div>
	  <div class="cart-item"><div>
    </div>

	<div class="total">
      <span class="price">Итого:</span>
      <button class="make-order-btn">
        Оформить заказ
      </button>
      <button class="clear-cart-btn">
        Очистить корзину
      </button>
    </div>
    ```
   .1. В обратном случае добавляйте постфикс wrapper. Для лучшего понимания ассоциируйте это с тем, что wrapper это **обёртка** вокруг **единственной** конфеты
    ```html
    <div class="catalog-wrapper">
      <div class="catalog">
        ...
      </div>
    </div>
    ```
3. Если элемент содержит в себе элемент, описанный в подпункте 1 пункта 2, то добавляйте постфикс wrap. Делайте так же при увеличении вложенности
    ```html
    <div class="news-cont-wrap-wrap">
      <div class="news-cont-wrap">
        <div class="news-cont">
          ...
        </div>
      </div>
    </div>
    ```
4. Если элемент, вложенный в элемент, описанный в пункте 2, по сути должен иметь такое же имя, то добавляйте постфикс cont для избежания конфликта 
    ```html
	<div class="items">
      <h1>Лучшие предложения</h1>
      <div class="items-cont"></div>
    </div>

    <div class="actions">
      <h1>Акции</h1>
      <div class="actions-cont-wrap-wrap">
        <div class="actions-cont-wrap">
          <div class="actions-cont">
	        ...
		  </div>
        </div>
      </div>
    </div>
    ```
5. Cлова разделяются с помощью and, если имя должно быть таким, как описанно в пункте 2, но содержимое элемента нельзя описать одним словом
    ```html
	<div class="prices-and-payments">
      <div class="price-list">
        ...
      </div>
      <div class="payment-methods">
        ...
      </div>
    </div>
    ```
   Или если элемент выполняет несколько ролей
    ```html
	<div class="news-item">
      <div class="cont">
        <a class="img">
          <img src="img.jpg">
        </a>
        <!--
		  Этот элемент содержит описание новости
		  и при этом имеет градиент в качестве
		  фона, который накладывается поверх
		  изображения новости
		-->
        <a class="descr-and-gradient-mask">
          Lorem ipsum dolor
        </a>
      </div>
      <span class="date">
        26 февраля 2019 г. 10:41
      </span>
    </div>
    ```
   Возможно в зависимости от разрешения экрана
   
   - Здесь элемент на телефонах и планшетах выполняет роль ссылки, поскольку там поверх него накладывается маска, являющаяся ссылкой, а на компьютерах он выполняет роль заголовка
     ```html
	 <h1 class="header-and-link">
       <span>Прайс листы</span>
       <svg>
         <use href="#arrow-right"></use>
       </svg>
       <a class="header-and-link-link-mask"></a>
     </h1>
     ```
6. Если элемент содержит невзаимосвязанные элементы, находясь на одном уровне с другими невзаимосвязанными элементами, и **вы были вынуждены добавить его в разметку, так как иначе макет был бы неисправным**, то давайте имя cont. Для лучшего понимания ассоциируйте это с тем, что cont это **новый контейнер** для множества игрушек из **разных** материалов, в отличие от уже имеющихся у вас **контейнеров, например, только для мягких** игрушек (описано в пункте 4), а также купленный, потому что игрушки были разбросаны, что **было проблемой**. Также этот контейнер **стоит среди игрушек**, находящихся на своем месте
    ```html
	<div class="item">
      <div class="cont">
        <a class="img">
	      ...
		</a>
        <div class="rating">
		  ...
		</div>
      </div>
      <p class="description">Lorem ipsum</p>
      <span class="price">5000</span>
      <button class="buy-btn">Купить</button>
    </div>

	<footer>
      <div class="projects">
        ...
      </div>
      <div class="cont-wrapper">
        <div class="cont">
          <div class="links">
            ...
          </div>
          <div class="prices-and-payments">
            ...
          </div>
          <div class="stay-with-us">
            ...
          </div>
        </div>
      </div>
      <p class="responsibility-text">
        Lorem ipsum dolor
      </p>
      <span class="copyright-text">
        @ 0000-0000 Nobody
      </span>
    </footer>
    ```
7. Если элемент должен лишь накладываться поверх другого элемента, то добавляйте постфикс mask
     ```html
	 <div class="review">
       <div class="cont">
         ...
       </div>
       <span class="date">
         26 февраля 2019 г. 02:35
       </span>
       <!--
	     Этот элемент накладывается поверх
         внешнего элемента, чтобы при нажатии
         на него выполнялся переход на другую
         страницу, симулируя нажатие
         на внешний элемент
	   --> 
       <a class="link-mask"></a>
     </div>
     ```
## Именование переменных
1. Если переменная содержит цифру, то имя должно это обозначить, возможно используя постфикс
    ```javascript
    const price = 2000
    
    const totalPrice = 12000
    
    const showMoreItemsCount = 2

	const sum = 1

	const maxSum = 10

	const storDataInd = cartItemsStorData.findIndex(
      (storData) => storData.id === data.id
    );
    ```
2. Если переменная содержит массив, то имя должно оканчиваться словом в множественном числе, а перед ним для краткости должны идти слова в единственном числе, даже если можно было бы написать их в множественном числе, исходя из контекста
	```javascript
    // Плохо
    const itemsIds = [128, 150, 186]
  
    // Хорошо
    const itemIds = [128, 150, 186]
    ```
3. Если переменная содержит объект с данными, **возможно и не загруженными с сервера, а находящимися в самом коде** (например, для использования в v-for), то ее имя должно быть словом data
    ```html
    <button v-for="data in menuItemsData">
      {{ data.text }}
    <button>
    ```
    ```javascript
    data() {
      return {
        menuItemsData: [
          { text: 'Войти', id: 0 },
          { text: 'Корзина', id: 1 }
        ]
      };
    }
    const data = menuItemsData[0]
    ```
   Или storData, если он получен из localStorage
    ```javascript
    const data = fetchData()
    console.log(data)
    // => { maxSum: 9, id: 128, ... }
    
    localStorage.data = JSON.stringify(
      { data.maxSum, data.id }
    )
    const storData = JSON.parse(localStorage.data)
    ```
4. Если переменная содержит массив с объектами данных, то ее имя должно иметь постфикс Data
    ```javascript
    const menuItemsData = [
      { text: 'Войти', id: 0 },
      { text: 'Корзина', id: 1 }
    ]
    ```
   Или StorData
    ```javascript
    const itemsData = fetchItemsData()
    console.log(itemsData)
    // => [
	//   { maxSum: 9, id: 128, ... },
    //   { maxSum: 12, id: 150, ... }
	// ]

	const cartItemsData = itemsData.reduce(
	  (cartItemsData, data) => {
	    cartItemsData.push({
	      maxSum: data.maxSum,
	      id: data.id
	    }) 
	  }, []
	)
	localStorage.cartItemsData = JSON.stringify(
	  cartItemsData
	)
    const cartItemsStorData = JSON.parse(
      localStorage.cartItemsData
    )
    ```
5. Если переменная содержит булево значение (boolean), то ее имя должно иметь префикс is
    ```javascript
    const catalogItemsData = [
      { text: 'Назад', isCloseBtn: true, id: 0 },
      { text: 'Компьютеры', id: 1 }
    ]
    const isCloseBtn = catalogItemsData[0].isCloseBtn
    ```
6. Если переменная содержит html элемент, то ее имя должно это обозначить, возможно используя постфикс
    ```javascript
    const catalog = document.querySelector('.catalog')
    
    const body = document.querySelector('body')
    
    const catalogWrapper = document.querySelector('.catalog-wrapper')

	const showCatalogBtn = document.querySelector('.show-catalog-btn')
	
    // Если не найдется подходящий постфикс,
    // он заменяется постфиксом El
    const searchEl = document.querySelector('.search')
    ```
## Именование функций
1. Так как все функции, относящиеся к компоненту, находятся в одном файле из-за природы однофайловых компонентов vue (далее SFC), ненужные постфиксы для подчеркивания взаимосвязи **именно с ним, а не его именем**, опускаются. Пример для SFC `RptItem.vue`
    ```javascript
    // Плохо
    addItemToCart() {...}

	// Хорошо
	addToCart() {...}
    ```
   Пример для SFC `TheItems.vue`, служащего контейнером для повторяющегося SFC `RptCartItem.vue`
   - Эта функция отвечает за загрузку дополнителных данных и отображение товаров, представленных в виде SFC RptItem.vue на их основе в дальнейшем, а значит она не относится непосредственно к SFC `TheItems.vue`
     ```javascript
     // Плохо
     showMore() {...}

	 // Хорошо
	 showMoreItems() {...}
     ```
2. Если функция это метод, то имя должно обозначать действие
    ```javascript
    methods: { addToCart() {...} }
    ```
3. Если функция это вычисляемое свойство, то имя должно быть именем для ее возвращаемого значения 

   * Здесь SFC загружается только после того, как загрузились данные, относящиеся к нему
     ```html
     <component
       :is="RptItem"
       v-for="data in itemsData"
     />
     ```
     ```javascript
     computed: {
       RptItem() {
         if (this.itemsData) {
	       return () => import('./RptItem.vue')
         }
       }
     }
     ```
   Или, если у нее имеются геттеры и сеттеры, имя должно обозначать действие
   * Здесь можно задать количество покупаемого товара с помощью клавиатуры
     ```html
     <input
       v-model.number="changeSumByTyping"
       type="number"
     >
     ```
     ```javascript
     computed: {
       changeSumByTyping: {
         get() {
           return this.sum;
         },
         set(sum) {...}
       }
	 }
     ```
## Именование параметров функций
1. Если из окружающего кода ясно, с чем взаимосвязан второй параметр встроенного метода массива reduce (далее reduce), то ненужные префиксы опускаются. Он может быть взаимосвязан с именем массива, для которого вызывается reduce
    ```javascript
    const cartItemDataUrls = cartItemsStorData.reduce(
      // Плохо
      (cartItemDataUrls, storData) => {...}, []
      // Хорошо
      (urls, storData) => {...}, []
    )
    ```
   Такие же правила действуют для первого параметра, но только если он взаимосвязан с именем переменной, которой присвается значение, возвращаемое вызовом reduce
    ```javascript
    cartItemsTotalPrice = this.cartItemsData.reduce(
	  // Плохо
      (cartItemsTotalPrice, data) => {...}
      // Хорошо
      (totalPrice, data) => {...}
    )
    ```
   Или именем функции, окружающей вызов reduce
    ```javascript
    bannerTemplatesData() {
      return this.names.reduce(
	    // Плохо
        (bannerTemplatesData, name, i) => {...}
        // Хорошо
        (templatesData, name, i) => {...}
      )
    }
    ```
## Именование реактивных свойств
1. Если с помощью реактивного свойства контролируется наличие класса active, который меняет различные стили, то к его имени добавляется постфикс Active
    ```javascript
    data() {
	  return {
		isCatalogWrapperActive: true
	  }
    }  
    ```
 


 
       
    
 
        
  

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE3MzA0MDkyNjBdfQ==
-->