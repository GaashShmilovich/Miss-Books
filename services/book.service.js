import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'
import bookList from '../data/books.json'assert{type: 'json'}

const PAGE_SIZE = 5
const BOOK_KEY = 'bookDB'

var gFilterBy = { title: '', price: 0 }
var gSortBy = { title: 1 }
var gPageIdx

_createBooks()


export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getNextBookId: getNextBookId,
    getFilterBy,
    setFilterBy,
    getGoogleBooks,
    addBookFromGoogle,
    // getCarCountBySpeedMap
}
window.bookService = bookService

function query() {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (gFilterBy.title) {
                const regex = new RegExp(gFilterBy.title, 'i')
                books = books.filter(book => regex.test(book.title))
            }
            if (gFilterBy.price) {
                books = books.filter(book => book.listPrice.amount >= gFilterBy.price)
            }
            if (gPageIdx !== undefined) {
                const startIdx = gPageIdx * PAGE_SIZE
                books = books.slice(startIdx, startIdx + PAGE_SIZE)
            }
            if (gSortBy.price !== undefined) {
                books.sort((c1, c2) => (c1.price - c2.price) * gSortBy.price)
            } else if (gSortBy.title !== undefined) {
                books.sort((c1, c2) => c1.title.localeCompare(c2.title) * gSortBy.title)
            }

            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
        .then(book => _setNextPrevBookId(book))
}

function _setNextPrevBookId(book) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            const bookIdx = books.findIndex(currBook => currBook.id === book.id)
            book.nextBookId = books[bookIdx + 1] ? books[bookIdx + 1].id : books[0].id
            book.prevBookId = books[bookIdx - 1]
                ? books[bookIdx - 1].id
                : books[books.length - 1].id
            return book
        })
}

function getGoogleBooks() {
    return Promise.resolve(
        [
            {
                title: 'Harry Potter',
                id: 'abc1'
            },
            {
                title: 'Harry Potter 2',
                id: 'abc2'
            },
            {
                title: 'Harry Potter 3',
                id: 'abc3'
            },
        ]
    )
}

function addBookFromGoogle(book) {
    //     return storageService.get(BOOK_KEY, book.id)
    //         .catch((err) => {
    //             console.log(err)
    //             console.log('adding book', book)
    //             return storageService.post(BOOK_KEY, book)

    //         }).then(res => {
    //             // if (res) return
    //         })

    const books = storageService.query(BOOK_KEY)
    console.log(books)
    console.log(book)
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getEmptyBook(title = '', price = 0) {
    return { id: '', title, listPrice: { amount: price } }
}

function getFilterBy() {
    return { ...gFilterBy }
}

function setFilterBy(filterBy = {}) {
    if (filterBy.title !== undefined) gFilterBy.title = filterBy.title
    if (filterBy.minSpeed !== undefined) gFilterBy.price = filterBy.price
    return gFilterBy
}

function getNextBookId(bookId) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            var idx = books.findIndex(book => book.id === bookId)
            if (idx === books.length - 1) idx = -1
            return books[idx + 1].id
        })
}

// function getCarCountBySpeedMap() {
//     return storageService.query(BOOK_KEY)
//         .then(cars => {
//             const carCountBySpeedMap = cars.reduce((map, car) => {
//                 if (car.price < 120) map.slow++
//                 else if (car.price < 200) map.normal++
//                 else map.fast++
//                 return map
//             }, { slow: 0, normal: 0, fast: 0 })
//             return carCountBySpeedMap
//         })
// }

function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = bookList

        utilService.saveToStorage(BOOK_KEY, books)
    }
}
