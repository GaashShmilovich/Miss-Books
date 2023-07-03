import { bookService } from '../services/book.service.js'

import BookFilter from '../cmps/BookFilter.js'
import BookList from '../cmps/BookList.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'


export default {
    template: `
        <section class="book-index">
        <RouterLink to="/book/edit">Add a new book</RouterLink>
            <bookFilter @filter="setFilterBy"/>
            <bookList 
                v-if="books"
                :books="filteredBooks"
                @remove="removeBook" /> 
        </section>
    `,
    data() {
        return {
            books: null,
            filterBy: {},
        }
    },
    methods: {
        removeBook(bookId) {
            bookService.remove(bookId)
                .then(() => {
                    const idx = this.books.findIndex(book => book.id === bookId)
                    this.books.splice(idx, 1)
                    showSuccessMsg('Book removed')
                })
                .catch(err => {
                    alert('Cannot remove car')
                    showErrorMsg('Can not remove book')
                })
        },
        setFilterBy(filterBy) {
            this.filterBy = filterBy
        }
    },
    computed: {
        filteredBooks() {
            let filteredBooks = this.books
            const regex = new RegExp(this.filterBy.txt, 'i')
            filteredBooks = filteredBooks.filter(book => regex.test(book.title))
            if (this.filterBy.price) {
                filteredBooks = filteredBooks.filter(book => book.listPrice.amount <= this.filterBy.price)
            }
            return filteredBooks
        }
    },
    created() {
        bookService.query()
            .then(books => {
                console.log(books)
                this.books = books
            }
            )
    },
    components: {
        BookFilter,
        BookList,
    }
}