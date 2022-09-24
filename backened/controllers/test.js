class Test {
    constructor(abc) {
        this.abc = abc;
    }

    show() {
        console.log(" i am showing");

        return this;
    }

    show1() {
        console.log("I am called from this");
        return "asshole"
    }
}


const x = new Test("hello")
const x1 = x.show().show1();
console.log(x1)
// console.log(x === x1)
