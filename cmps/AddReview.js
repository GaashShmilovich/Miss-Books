export default {
  data() {
    return {
      fullname: '',
      rating: null,
      readAt: ''
    }
  },
  computed: {
    ratings() {
      return [1, 2, 3, 4, 5]
    }
  },
  methods: {
    submitReview() {
      const review = {
        fullname: this.fullname,
        rating: this.rating,
        readAt: this.readAt
      }
      this.$emit('add-review', review)
      this.fullname = ''
      this.rating = null
      this.readAt = ''
    }
  }
}