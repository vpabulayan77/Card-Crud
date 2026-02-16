let books = [];
let filteredBooks = [];
let editIndex = -1;
let deleteIndex = -1;

// Load books from JSON
fetch('books.json')
    .then(res => res.json())
    .then(data => {
        books = data;
        filteredBooks = [...books];
        renderCards();
    });

// READ - Display all cards
function renderCards() {
    const cardsDiv = document.getElementById('cards');
    cardsDiv.innerHTML = '';
    
    filteredBooks.forEach((book, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h2>${book.title}</h2>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Year:</strong> ${book.published_year}</p>
            <p><strong>Genre:</strong> ${book.genre}</p>
            <div class="card-actions">
                <button class="editCard" onclick="editCard(${books.indexOf(book)})">Edit</button>
                <button class="deleteCard" onclick="deleteCard(${books.indexOf(book)})">Delete</button>
            </div>
        `;
        cardsDiv.appendChild(card);
    });
}

// CREATE - Add new card
function addCard() {
    const title = document.getElementById('card-title').value;
    const author = document.getElementById('card-author').value;
    const year = document.getElementById('card-year').value;
    const genre = document.getElementById('card-genre').value;
    
    if (title && author && year && genre) {
        const newBook = {
            title: title,
            author: author,
            published_year: parseInt(year),
            genre: genre
        };
        books.push(newBook);
        filteredBooks = [...books];
        
        document.getElementById('card-title').value = '';
        document.getElementById('card-author').value = '';
        document.getElementById('card-year').value = '';
        document.getElementById('card-genre').value = '';
        
        renderCards();
    } else {
        alert('Please fill in all fields');
    }
}

// UPDATE - Edit card
function editCard(index) {
    editIndex = index;
    const book = books[index];
    
    document.getElementById('edit-title').value = book.title;
    document.getElementById('edit-author').value = book.author;
    document.getElementById('edit-year').value = book.published_year;
    document.getElementById('edit-genre').value = book.genre;
    
    document.getElementById('edit-card').style.display = 'block';
}

function saveCard() {
    const title = document.getElementById('edit-title').value;
    const author = document.getElementById('edit-author').value;
    const year = document.getElementById('edit-year').value;
    const genre = document.getElementById('edit-genre').value;
    
    if (title && author && year && genre) {
        books[editIndex] = {
            title: title,
            author: author,
            published_year: parseInt(year),
            genre: genre
        };
        filteredBooks = [...books];
        editIndex = -1;
        
        document.getElementById('edit-card').style.display = 'none';
        renderCards();
    } else {
        alert('Please fill in all fields');
    }
}

function cancelEdit() {
    editIndex = -1;
    document.getElementById('edit-card').style.display = 'none';
}

// DELETE - Remove card
function deleteCard(index) {
    deleteIndex = index;
    document.getElementById('delete-confirmation').style.display = 'block';
}

function confirmDelete() {
    books.splice(deleteIndex, 1);
    filteredBooks = [...books];
    deleteIndex = -1;
    
    document.getElementById('delete-confirmation').style.display = 'none';
    renderCards();
}

function cancelDelete() {
    deleteIndex = -1;
    document.getElementById('delete-confirmation').style.display = 'none';
}

// SEARCH - Filter cards
function searchCards() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    filteredBooks = books.filter(book => 
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm) ||
        book.genre.toLowerCase().includes(searchTerm)
    );
    renderCards();
}
