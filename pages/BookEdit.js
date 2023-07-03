import { bookService } from "../services/book.service.js"

export default {
    template: `

        <form @submit.prevent="save" class="book-edit">
            <h2>Add a Book</h2>
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
                alert('Cannot load book')
                this.$router.push('/book')
            })

    },
    methods: {
        save() {
            bookService.save(this.bookToEdit)
                .then(savedBook => {
                    this.$router.push('/book')
                })
        }
    }
}