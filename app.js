// ֿimport { createApp } from './lib/vue.js'
const { createApp } = Vue

import { router } from './routes.js'

import AppHeader from './cmps/AppHeader.js'
import AppFooter from './cmps/AppFooter.js'
import UserMsg from './cmps/UserMsg.js'

const options = {
    template: `
    <div>
        <AppHeader/>
        <section class="main-route">
            <RouterView/>
        </section>
        <AppFooter />
        <UserMsg />
    </div>
    `,
    data() {
        return {
            route: 'book',
        }
    },
    components: {
        AppHeader,
        AppFooter,
        UserMsg,
    }
}
const app = createApp(options)
app.use(router)
app.mount('#app')
