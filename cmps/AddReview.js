import { bookService } from "../services/book.service.js"
import { utilService } from "../services/util.service.js"

export default {
    name: 'AddReview',
    props: ['book'],
    template: `
    <section class="review-container">
        <fieldset>
         <legend>Add Review</legend>
            <form action="" @submit.prevent="saveReview()">
               Name <input type="text" v-model="name"/>
            Read at <input v-model="date" type="date" />    
             Rating <select v-model="rating">
                        <option value="1">1 Star</option>
                        <option value="2">2 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="5">5 Stars</option>
                     </select>
                     <button :disabled="isDisabled">Save Review</button>
            </form>
        </fieldset>
        
    </section>
`,
    data() {
        return {
            name: null,
            date: null,
            rating: null,
            id: utilService.makeId()
        }
    },
    computed: {
        isDisabled() {
            return !this.name || !this.date || !this.rating
        }
    },
    methods: {
        saveReview() {
            const review = {
                name: this.name,
                date: this.date,
                rating: this.rating
            }
            if (!this.book.reviews) this.book.reviews = []
            this.book.reviews.push(review)
            bookService.save(this.book)

        }
    }

}