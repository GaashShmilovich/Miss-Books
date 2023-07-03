// ֿimport { createApp } from './lib/vue.js'
const { createApp } = Vue

import { router } from './routes.js'

import AppHeader from './cmps/AppHeader.js'
import AppFooter from './cmps/AppFooter.js'

// import HomePage from './pages/HomePage.js'
// import BookIndex from './pages/BookIndex.js'
// import AboutPage from './pages/AboutUs.js'

const options = {
    template: `
    <div>
        <AppHeader/>
        <section class="main-route">
            <RouterView/>
        </section>
        <AppFooter />
    </div>
    `,
    data() {
        return {
            route: 'book',
        }
    },
    components: {
        // HomePage,
        // BookIndex,
        // AboutPage,
        AppHeader,
        AppFooter,
    }
}
const app = createApp(options)
app.use(router)
app.mount('#app')
