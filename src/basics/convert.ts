const Rx = require('@reactivex/rxjs')

Rx.Observable.of('foo', 'bar')

Rx.Observable.from([1,2,3])

const myObservable1 = new Rx.Subject();
myObservable1.subscribe(value => console.log(value));
myObservable1.next('foo');

var myObservable2 = Rx.Observable.create(observer => {
  observer.next('foo');
  setTimeout(() => observer.next('bar'), 1000);
});
myObservable2.subscribe(value => console.log(value));
