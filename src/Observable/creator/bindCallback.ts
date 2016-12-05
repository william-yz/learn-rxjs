const Rx = require('@reactivex/rxjs')

var obs = Rx.Observable.bindCallback(function(a, callback) {
  callback(a)
})

var result = obs('123')
result.subscribe(a => {
  console.log(a)
}, b => {
  console.log(b)
});
