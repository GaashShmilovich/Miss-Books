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
            <AddReview :book="book" />
            <h4>Reviews:</h4>
            <section class="reviews" v-for="review in book.reviews" :key="review.id">
                <span> {{ review.date }} </span> <span> {{ review.name }} </span> rating: <span>{{review.rating}}</span>  <button @click="removeReview(index)">X</button>
            </section>
            <RouterLink :to="'/book/' + book.prevBookId">Previous book</RouterLink> |
            <RouterLink :to="'/book/' + book.nextBookId">Next book</RouterLink>
            <RouterLink to="/book" class="back-link">Back to list</RouterLink>
        </section>
    `,
    data() {
        return {
            book: null,
        }
    },
    created() {
        this.loadBook()
    },
    methods: {
        getPrice(price) {
            if (price > 150) return 'pricey'
            else if (price < 20) return 'cheap'
        },
        removeReview(reviewIndex) {
            this.book.reviews.splice(reviewIndex, 1)
            bookService.save(this.book)
        },
        loadBook() {
            const { bookId } = this.$route.params
            bookService.get(bookId)
                .then(book => {
                    this.book = book
                })
                .catch(err => {
                    alert('Cannot load book')
                    this.$router.push('/book')
                })
        }

    },
    watch: {
        '$route.params.bookId'() {
            this.loadBook()
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