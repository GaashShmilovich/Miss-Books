import { bookService } from '../services/book.service.js'

import BookDetails from '../cmps/BookDetails.js'
import BookEdit from '../cmps/BookEdit.js'

import BookFilter from '../cmps/BookFilter.js'
import BookList from '../cmps/BookList.js'


export default {
    template: `
        <section class="book-index">
            <bookFilter @filter="setFilterBy"/>
            <bookList 
                v-if="books"
                :books="filteredBooks"
                @select="selectBook" 
                @remove="removeBook" /> 
            <bookDetails 
                v-if="selectedBook" 
                :book="selectedBook" 
                @close="selectedBook = null"/>
            <bookEdit @save="saveBook" />
        </section>
    `,
    data() {
        return {
            books: null,
            selectedBook: null,
            filterBy: {},
        }
    },
    methods: {
        removeBook(bookId) {
            bookService.remove(bookId)
                .then(() => {
                    const idx = this.books.findIndex(book => book.id === bookId)
                    this.books.splice(idx, 1)
                })
        },
        selectBook(bookId) {
            console.log('bookId', bookId)
            this.selectedBook = this.books.find(book => book.id === bookId)
        },
        saveBook(bookToSave) {
            bookService.save(bookToSave)
                .then(savedBook => this.books.push(savedBook))
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
        console.log('hi')
        bookService.query()
            .then(books => {
                console.log(books)
                this.books = books
            }
            )
    },
    components: {
        BookDetails: BookDetails,
        BookEdit: BookEdit,
        BookFilter,
        BookList,
    }
}