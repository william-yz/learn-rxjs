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


var numbers = Rx.Observable.of({a:1}, {a:2});
var letters = Rx.Observable.of('a', 'b', 'c');

numbers.subscribe(console.log)
letters.subscribe(console.log)

var result = numbers.concat(letters);
result.subscribe(x => console.log(x));
