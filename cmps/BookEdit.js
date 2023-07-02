import { bookService } from "../services/book.service.js"

export default {
    template: `

        <form @submit.prevent="save" class="book-edit">
            <h2>Add a Book</h2>
            <input v-model="book.title" type="text" placeholder="Enter title">
            <!-- <input v-model="book.listPrice.amount" type="text" > -->
            <button>save</button>
        </form>
    `,
    data() {
        return {
            book: bookService.getEmptyBook(),
        }
    },
    methods: {
        save() {
            this.$emit('save', this.book)
            this.book = bookService.getEmptyBook()
        }
    }
}