
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
