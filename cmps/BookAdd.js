import { bookService } from "../services/book.service.js"

export default {
    template: `
    <ul>
        <li v-for="book in books" :key="book.id">
            <p>{{book.title}}</p>
            <button @click="addBook(book)">+</button>
        </li>
    </ul>
    `,
    data() {
        return {
            books: null,
        }
    },
    created() {
        this.loadBooks()
    },
    methods: {
        loadBooks() {
            bookService.getGoogleBooks()
                .then(books => this.books = books)
        },
        addBook(book) {
            bookService.addBookFromGoogle({ ...book })
        },
    }
}