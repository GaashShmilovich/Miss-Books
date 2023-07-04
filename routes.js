import BookIndex from './pages/BookIndex.js'
import HomePage from './pages/HomePage.js'
import AboutPage from './pages/AboutUs.js'
import BookDetails from './pages/BookDetails.js'
import BookEdit from './pages/BookEdit.js'

const { createRouter, createWebHashHistory } = VueRouter

const AboutTeam = {
    template: `<section>
        <h1>Our Team</h1>
        <p>Our team is amazing</p>
    </section>`
}
const AboutGoals = {
    template: `<section>
        <h1>Our Goals</h1>
        <p>Our goals are awesome</p>
    </section>`
}


const options = {
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: HomePage
        },
        {
            path: '/about',
            component: AboutPage,
        },
        {
            path: '/book',
            component: BookIndex
        },
        {
            path: '/book/:bookId',
            component: BookDetails
        },
        {
            // path: '/book/edit/:bookId?',
            path: '/book/edit/:bookId?',
            component: BookEdit
        }

    ]
}
export const router = createRouter(options)
