import { bookService } from "../services/book.service.js"

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
            <RouterLink to="/book">Back to list</RouterLink>
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
    }
}