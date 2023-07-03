import { bookService } from "../services/book.service.js"
import AddReview from "../cmps/AddReview.js"

export default {
    template: `
        <section class="book-details" v-if="book">
            <h2>Title: {{ book.title }}</h2>
            <h4 :class="getPrice(book.listPrice.amount)">Price: {{ book.listPrice.amount }}{{book.listPrice.currencyCode}}</h4>
            <h4>Subtitle: {{book.subtitle}}</h4>
            <h4>Authors: {{getAuthors}}</h4>
            <h4>Publish date: {{book.publishedDate}} {{bookAge}}</h4>
            <h4>Language: {{book.language}}</h4>
            <h4>Categories: {{getCategories}}</h4>
            <h4>Pages: {{book.pageCount}}</h4>
            <h4 >{{ setReaderLevel }}</h4>
            <img :src="imgSrc" alt="">

            <ul>
                <li v-for="review in book.reviews" :key="review.id">
                {{ review.fullname }} - {{ review.rating }}/5
                <button @click="deleteReview(review.id)">Delete</button>
                </li>
            </ul>
            <h2>Add a Review</h2>
            <AddReview @add-review="addReview" />

            <RouterLink to="/book">Back to list</RouterLink>
            <!-- <RouterLink :book="book"></RouterLink> -->
        </section>
    `,
    data() {
        return {
            book: null
        }
    },
    created() {
        const { bookId } = this.$route.params
        bookService.get(bookId)
            .then(book => {
                this.book = book
            })
            .catch(err => {
                alert('Cannot load book')
                this.$router.push('/book')
            })
    },
    methods: {
        getPrice(price) {
            if (price > 150) return 'pricey'
            else if (price < 20) return 'cheap'
        },
        addReview(review) {
            console.log("bookId:", this.$route.params.bookId)
            console.log("review:", review)
            const { bookId } = this.$route.params
            bookService.addReview(bookId, review)
                .then(savedBook => {
                    this.book.reviews.push(savedBook.reviews[savedBook.reviews.length - 1])
                })
        },
        deleteReview(reviewId) {
            const { bookId } = this.$route.params
            bookService.deleteReview(bookId, reviewId)
                .then(() => {
                    const index = this.book.reviews.findIndex(review => review.id === reviewId)
                    this.book.reviews.splice(index, 1)
                })
        }
    },
    computed: {
        imgSrc() {
            return this.book.thumbnail
        },
        getAuthors() {
            return this.book.authors.join('')
        },
        getCategories() {
            return this.book.categories.join(',')
        },
        setReaderLevel() {
            if (this.book.pageCount > 500) return "Serious Reading"
            else if (this.book.pageCount > 200) return "Descent Reading"
            else return "Light Reading"
        },
        bookAge() {
            if (new Date().getFullYear() - this.book.publishedDate > 10) return "Vintage"
            else return "New"
        }
    },
    components: {
        AddReview,
    }
}
