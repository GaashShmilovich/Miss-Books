export default {
    props: ['book'],
    template: `
        <section class="book-details">
            <h2>{{ book.title }}</h2>
            <h3>{{ book.maxSpeed }}</h3>
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
            return `../assets/img/${this.book.title}.png`
        }
    }
}