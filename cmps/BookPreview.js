export default {
    props: ['book'],
    template: `
        <article class="car-preview">
            <h2>{{ book.title }}</h2>
            <h3>{{ book.price }}</h3>
        </article>
    `,
}