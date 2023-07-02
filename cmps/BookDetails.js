export default {
    props: ['book'],
    template: `
        <section class="book-details">
            <h2>{{ book.title }}</h2>
            <h3>{{ book.listPrice.amount }}{{book.listPrice.currencyCode}}</h3>
            <h4>{{book.subtitle}}</h4>
            <h4>{{book.authors}}</h4>
            <h4>{{book.publishedDate}}</h4>
            <h4>{{book.language}}</h4>
            <h4>{{book.categories}}</h4>
            <h4>{{book.pageCount}}</h4>
            <img :src="imgSrc" alt="">
            <button @click="onClose">close</button>
        </section>
    `,
    methods: {
        onClose() {
            this.$emit('close')
        }
    },
    computed: {
        imgSrc() {
            return this.book.thumbnail
        }
    }
}