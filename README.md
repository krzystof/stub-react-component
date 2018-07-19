# A React Architecture Example

> Spoiler: I might be doing something really dumb here, trying to reinvent something that exist or similar.
> Ah well, I would not be the first one to reinvent Redux…

This is an experience to come up with a template that helps me build stuff quicker.

I am trying to represent a "component", the easiest way to imagine it
is: one page.

How can I have a quick set up that give me an optimized architecture?

## So far

**I might be complicating things to much.** We divide our page into a couple of common things:

- some data fetching, file reading, any asynchronous function
- the data of our page
- the UI

It's similar to Elm architecture, where there is a update function which is pure, represented
here by the component that holds the data of our page. The view is our UI function. And in Elm,
we dispatch Commands that are handled by the runtime, do whatever side-effect things it wants,
and come back to our Update function.
