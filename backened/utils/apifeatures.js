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
        let querycopy = { ...this.querystring }
        const removeItems = ["keyword", "page", "limit"];
        removeItems.forEach(elem => {
            delete querycopy[elem]
        })

        // filter for price and rating;
        if (this.querystring.price) {
            const [lp, gp] = this.querystring.price.split("_");
            querycopy.price = { $gte: lp, $lte: gp }
        }

        this.query = this.query.find(querycopy)
        return this;
    }
}

module.exports = APIfeatures;