class APIfeatures {
    constructor(query, querystring) {
        this.query = query;
        this.querystring = querystring;
    }

    search() {
        const searchQuery = this.querystring.keyword ? {
            name: {
                $regex: this.querystring.keyword,
                $options: "i"
            }
        } : {}

        this.query = this.query.find({ ...searchQuery })
        return this;
    }

    filter() {
        const querycopy = { ...this.querystring }
        const removeItems = ["keyword", "page", "limit"];
        removeItems.forEach(elem => {
            delete querycopy[elem]
        })

        // filter for price
        if (this.querystring.price) {
            const [lp, gp] = this.querystring.price.split("_");
            querycopy.price = { $gte: lp, $lte: gp }
        }

        //filter for rating
        if (this.querystring.rating) {
            querycopy.rating = this.querystring.rating;
        }

        this.query = this.query.find(querycopy)
        return this;
    }

    pagination(itemsperpage) {
        const currentpage = parseInt(this.querystring.currentpage) || 1;
        const skip = (currentpage - 1) * itemsperpage;
        this.query = this.query.limit(itemsperpage).skip(skip);
        return this;
    }

}

module.exports = APIfeatures;