import { Observable, Subject } from 'rxjs'
import { createTodoItem, mockHttpPost } from './lib'

const $input = <HTMLInputElement>document.querySelector('.todo-val')
const $list = <HTMLUListElement>document.querySelector('.list-group')
const $add = document.querySelector('.button-add')

const enter$ = Observable.fromEvent<KeyboardEvent>($input, 'keydown')
  .filter(e => e.keyCode === 13)

const clickAdd$ = Observable.fromEvent<MouseEvent>($add, 'click')

const input$ = enter$.merge(clickAdd$)

const clearInputSubject$ = new Subject<void>()

const item$ = input$
  .map(() => $input.value)
  .filter(r => r !== '')
  .distinct(null, clearInputSubject$)
  .switchMap(mockHttpPost)
  .map(createTodoItem)
  .do((ele: HTMLLIElement) => {
    $list.appendChild(ele)
    $input.value = '';
  })
  .publishReplay(1)
  .refCount()

const toggle$ = item$
  .mergeMap($todoItem => {
    return Observable.fromEvent<MouseEvent>($todoItem, 'click')
      .filter(e => e.target === $todoItem)
      .mapTo($todoItem)
  })
  .do(($todoItem: HTMLElement) => {
    if ($todoItem.classList.contains('done')) {
      $todoItem.classList.remove('done')
    } else {
      $todoItem.classList.add('done')
    }
  })

const remove$ = item$
  .mergeMap($todoItem => {
    const $removeButton = $todoItem.querySelector('.button-remove')
    return Observable.fromEvent($removeButton, 'click')
      .mapTo($todoItem)
})
  .do($todoItem => {
    const $parent = $todoItem.parentNode
    $parent.removeChild($todoItem)
  })

const app$ = toggle$.merge(remove$)

app$.subscribe()
