import { bookService } from "../services/book.service.js"
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

export default {
    template: `

        <form @submit.prevent="save" class="book-edit">
            <h2>{{(bookToEdit.id)? 'Edit' : 'Add'}} a Book</h2>
            <input v-model="bookToEdit.title" type="text" placeholder="Enter title">
            <input v-model.number="bookToEdit.listPrice.amount" type="number" >
            <RouterLink to="/book">Cancel</RouterLink>
            <button>save</button>
        </form>
    `,
    data() {
        return {
            bookToEdit: bookService.getEmptyBook(),
        }
    },
    created() {
        const { bookId } = this.$route.params
        if (!bookId) return
        bookService.get(bookId)
            .then(book => {
                this.bookToEdit = book
            })
            .catch(err => {
                showErrorMsg('Can not load book for edit')
                this.$router.push('/book')
            })

    },
    methods: {
        save() {
            bookService.save(this.bookToEdit)
                .then(savedBook => {
                    showSuccessMsg('Car saved')
                    this.$router.push('/book')
                })
                .catch(err => {
                    showErrorMsg('Can not save book')
                })
        }
    }
}