
export default {
    props: ['book'],
    template: `
        <article class="book-preview">
            <h2>{{ book.title }}</h2>
            <h3 :class="getPrice(book.listPrice.amount)">{{ book.listPrice.amount }}{{book.listPrice.currencyCode}}</h3>
            <RouterLink :to="'/book/' + book.id">Details</RouterLink> |
            <RouterLink :to="'/book/edit/' + book.id">Edit</RouterLink>
        </article>
    `,
    methods: {
        getPrice(price) {
            if (price > 150) return 'pricey'
            else if (price < 20) return 'cheap'
        }
    },
    computed: {

    }
}