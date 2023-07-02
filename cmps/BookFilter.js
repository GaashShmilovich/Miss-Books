export default {
    template: `
        <section class="book-filter">
            <input 
                v-model="filterBy.txt" 
                @input="onSetFilterBy"
                type="text" 
                placeholder="search">
                <input
                type="number"
                v-model="filterBy.price"
                @input="onSetFilterBy"
                placeholder="Enter Max Price">
        </section>
    `,
    data() {
        return {
            filterBy: {
                price: null,
                txt: ''
            },
        }
    },
    methods: {
        onSetFilterBy() {
            this.$emit('filter', this.filterBy)
        }
    }
}

