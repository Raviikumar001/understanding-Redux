When we are making our app, we want our state to be managed well,
so what we can do to make our state more predictable is to have a
central state.
What we want to achieve is state predictabiliy when we are making our app
then if the state is modified by anyone then the state predictiablity decreses
and therefore we cannot predict state.

A) One way is we can make an object that describes our state. We can call it an action.
Action is a object which represent an specific event , which will change the state of our store
We use pure functions to solve this. Pure function are fuctions which do not change the state
but return them as it is.

Characteristics of Pure Function

1. The always return the same result if the same arguments are passed in.
2.) They depend on the arguments passed into them. The return value of a pure function is <!-- 
   depedent on the input it receives and nothing else.  -->
3.Pure Functions must never produce any side effects.


Reducer takes the state and reduces it to simple actions.

It is a good practise to break down your actions into action creators.

