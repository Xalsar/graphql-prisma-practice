const Subscription = {
    post: {
        subscribe(parent, args, { db, pubsub }, info) {
            return pubsub.asyncIterator(`WATCH_POST`)
        }
    },
    comment: {
        subscribe(parent, args, { pubsub }, info) {
            return pubsub.asyncIterator('WATCH_COMMENT')
        }
    }
}

export { Subscription as default }