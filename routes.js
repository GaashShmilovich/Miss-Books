import BookIndex from './pages/BookIndex.js'
import HomePage from './pages/HomePage.js'
import AboutPage from './pages/AboutUs.js'
import BookDetails from './pages/BookDetails.js'
import BookEdit from './pages/BookEdit.js'
import UserMsg from './cmps/UserMsg.js'
import AddReview from './cmps/AddReview.js'

const { createRouter, createWebHashHistory } = VueRouter

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
            path: '/book/edit/:bookId?',
            component: BookEdit
        },
        {
            path: '/msg',
            component: UserMsg
        },
        {
            path: '/review',
            component: AddReview
        }

    ]
}
export const router = createRouter(options)
