const Rx = require('@reactivex/rxjs')


var x = Rx.Observable.interval(1000)
  .debounce(() => Rx.Observable.interval(3000))



x.subscribe(console.log)
