function openMenu() {
  document.body.classList += " menu--open";}
function closeMenu() {
  document.body.classList.remove("menu--open");}

async function renderBooks(filter) {
  const booksWrappper = document.querySelector(".booked");
  const books = await getBooks();

  if (filter === 'LOW-TO-HIGH') {
    books.sort((a, b) => ( a.salesPrice || a.originalPrice) - (b.salesPrice || b.originalPrice))
  }
  else if (filter === 'HIGH-TO-LOW') {
    books.sort((a, b) => (b.salesPrice || b.originalPrice) - (a.salesPrice || a.originalPrice))
  }
  else if (filter === 'RATING') {
    books.sort((a, b) => b.rating - a.rating)
  }


  const bookHTML = books
  .map((book) => {
    return `<div class="book">
    <figure class="book__image--wrapper">
    <img
      src="${book.url}"
      alt=""
      class="book__img"
    />
  </figure>
  <h3 class="book__name">${book.title}</h3>
  <div class="book__ratings">
    ${ratingsHTML(book.rating)}
  </div>
  <div class="book__price">
    ${renderPrice(book.originalPrice, book.salesPrice)}
  </div>
</div>`;
  }).join("")
  booksWrappper.innerHTML = bookHTML
}

function renderPrice(originalPrice, salesPrice) {
  if (!salesPrice) {
    return originalPrice
  }
  return `<span class="book__price--og">${originalPrice.toFixed(2)}</span> ${salesPrice.toFixed(2)}`
}


function ratingsHTML(rating) {
  let ratingHTML = '';

  for (let i = 0; i < Math.floor(rating); i++) {
    ratingHTML += '<i class="fas fa-star"></i>'
  }
  if (!Number.isInteger(rating)) {
    ratingHTML += '<i class="fas fa-star-half-alt"></i>'
  }
  if (rating <= 4) {
    ratingHTML += '<i class="far fa-star"></i>'
  }
  
  
  
  return ratingHTML
}

function filterBooks(event) {
  renderBooks(event.target.value)
}

setTimeout(() => {
  renderBooks();
}, 600);

function getBooks() {
   return new Promise((resolve) => {
    setTimeout(() => {
      resolve ([
        {
          id: 1,
          title: "Crack the Coding Interview",
          url: "assets/crack the coding interview.png",
          originalPrice: 20.99,
          salesPrice: null,
          rating: 4.5,
        },
        {
          id: 2,
          title: "Atomic Habits",
          url: "assets/atomic habits.jpg",
          originalPrice: 18.99,
          salesPrice: 12.99,
          rating: 4,
        },
        {
          id: 3,
          title: "Deep Work",
          url: "assets/deep work.jpeg",
          originalPrice: 22.99,
          salesPrice: null,
          rating: 5,
        },
        {
          id: 4,
          title: "Can't Hurt Me",
          url: "assets/david goggins.jpeg",
          originalPrice: 16.99,
          salesPrice: 11.99,
          rating: 3.5,
        },
        {
          id: 5,
          title: "The 10X rule",
          url: "assets/book-1.jpeg",
          originalPrice: 19.99,
          salesPrice: 14.99,
          rating: 5,
        },
        {
          id: 6,
          title: "Be Obssessed or Be Average",
          url: "assets/book-2.jpeg",
          originalPrice: 24.99,
          salesPrice: 18.99,
          rating: 5,
        },
        {
          id: 7,
          title: "Rich Dad Poor Dad",
          url: "assets/book-3.jpeg",
          originalPrice: 29.99,
          salesPrice: 24.99,
          rating: 4.5,
        },
        {
          id: 8,
          title: "Cashflow Quadrant",
          url: "assets/book-4.jpeg",
          originalPrice: 21.99,
          salesPrice: 16.99,
          rating: 3.7,
        },
        {
          id: 9,
          title: "Power",
          url: "assets/book-5.jpeg",
          originalPrice: 21.99,
          salesPrice: null,
          rating: 5,
        },
        {
          id: 10,
          title: "The Five Second Rule",
          url: "assets/book-6.jpeg",
          originalPrice: 21.99,
          salesPrice: null,
          rating: 4,
        },
        {
          id: 11,
          title: "Your Next Five Moves",
          url: "assets/book-7.jpg",
          originalPrice: 21.99,
          salesPrice: null,
          rating: 4.5,
        },
      ]);
    }, 1000);
  });
}
