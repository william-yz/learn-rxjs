const Rx = require('@reactivex/rxjs')

const promise = new Promise(resolve => {
  resolve({a : 1})
})
const fromArray = Rx.Observable.from([1,2,3])
const fromPromise = Rx.Observable.from(promise)

fromArray.subscribe(console.log)
fromPromise.subscribe(console.log)

const fromPromise1 = Rx.Observable.fromPromise(promise)
fromPromise1.subscribe(console.log)

var numbers = Rx.Observable.interval(1000);
numbers.subscribe(x => console.log(x));


var numbers = Rx.Observable.of(10, 20, 30);
var letters = Rx.Observable.of('a', 'b', 'c');
var interval = Rx.Observable.interval(1000);
var result = numbers.concat(letters).concat(interval);
result.subscribe(x => console.log(x));
