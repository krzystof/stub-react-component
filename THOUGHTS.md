
**An <AsyncAction /> component**

Because sometimes it might be convenient to just handle an async fn individually.
The component might look like this

```
<AsyncAction callback={api.getStuff}>
  {result => (
    <div>Whatever you want in this render prop</div>
  )}
</AsyncAction>
```



**Utilities for Msg**

Something that would allow us to define constants easily

```js
const Msg = Messages([
  'ClearSomething',
  'ChangeName',
  // ...
])
```

Can even throw an Error if trying to access a `Msg.NotExists`.
