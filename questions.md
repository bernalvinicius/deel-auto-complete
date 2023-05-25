**1 - What is the difference between Component and PureComponent? Give an example where it might break my app.**

- In PureComponent, the component only renders when there is a change in the component's props or state, thus avoiding unnecessary renderings. Different from Class component.
- The problem with PureComponent is in relation to shouldComponentUpdate, if you change an array/object that is being used without creating a new one, PureComponent will not identify the change, as PureComponent only performs superficial checks, which can lead to lack of updates in the component. If so, it might be rendering an outdated array/object.

**2 - Context + ShouldComponentUpdate might be dangerous. Why is that?**

- Here also the danger can be due to the updates. That´s because If a component that uses Context implements ShouldComponentUpdate and returns false, it prevents the component from being updated, even if the Context has changed to a new state. This happens because the shouldComponentUpdate is used to optimize the performance of a component. React calls this method before updating a component, and if it returns false, the component will not be re-rendered. But Context allows data to be shared globally across multiple components, without needing to pass it explicitly via props. So if the context is changed but ShouldComponentUpdate returns false, unexpected errors can happen.

**3 - Describe 3 ways to pass information from a component to its PARENT.**

- Props : The most common way. The parent component can pass a prop to the child component, and the child can call a specific function passed as a prop to send information back to the parent.

- Context: You can create a context in the parent component and then the child component can access and update that context.

- Redux: This library provides a way to manage the state of the application, allowing components in different parts of the tree to access and pass information.

**4 - Give 2 ways to prevent components from re-rendering.**

- If it's a Class Component you can use `shouldComponentUpdate` or `PureComponent`: Both approaches are intended to compare props and state and decide if a rendering is needed.
- If you are using functional components, you can use the `React.memo` function to create a memoized version of the component. This means that the component will only be re-rendered if its props change. Or also the `useCallback` function to memorize some function, ensuring that it is always the same reference, unless its dependencies change.

**5 - What is a fragment and why do we need it? Give an example where it might break my app.**

- Fragments are a React feature that allow us to return multiple elements from a component, without the need to wrap them in a parent element. I use it a lot when I want to avoid creating too many unnecessary HTML elements, for example, in some cases where we are returning arrays of elements.
- If you don't want to use a div to wrap the elements of a component, then you can use the fragment. It is necessary to choose between one or the other, because if an element does not ReactJS presents an error saying that the elements must have at least one parent element.
- Here's an example of the **wrong** way to do it:

```
function Component() {
  return (
    <h2>Component A</h2>
    <p>Esse é o Component A</p>
  );
}
```

**6 - Give 3 examples of the HOC pattern.**
First of all, we need to understand the concept of HOC, which is to reuse common logic between different components.

- Theme: a component that needs to be styled a certain way can use a HOC that injects custom styles into the component.
- Authentication: A component that needs to verify that the user is authenticated before allowing access to certain resources can use a HOC that checks the user's credentials adds this logic to the component.
- HTTP request: - a component that needs to fetch data from a server can use a HOC to pass the received data as a property to the component.

**7 - What's the difference in handling exceptions in promises, callbacks and async...await?**
Basically to handle exceptions in asynchronous functions I need to do syntax handling and flow control. For example:

- Async/await: is a syntax that provides a simpler way to handle asynchronous operations. You use `async` to define an asynchronous function and `await` to wait for a Promise to complete. Exception handling is done with a `try...catch` block.

- Promises: were introduced as a cleaner alternative to deal with asynchronous programming. When using Promises, you chain together `then()` and `catch()` methods to handle successful results or errors.

- Callbacks: are an older way of dealing with asynchronous programming in JavaScript. You pass a function to an asynchronous operation, and that function executes when the operation completes. To handle exceptions in callbacks is to check the first parameter of the callback function, which is used to indicate errors. If the first parameter is an error object, it means that an exception has occurred.

**8 - How many arguments does setState take and why is it async.**
The setState method accepts two arguments:

- An object that describes the changes to be made to the state.
- An optional callback function that runs after the state update is complete.

`setState` is asynchronous primarily to optimize performance and group multiple state updates into a single process. When setState is called, React merges the pending changes into a single update and performs the update with the component tree.

**9 - List the steps needed to migrate a Class to Function Component.**
you can follow the following steps:

1. Create a new file for the function component with the appropriate extension, such as `.ts` or `.tsx`, in case using TypeScript.

2. Import React and any other required dependencies.

3. Instead of extending the `React.Component` class, you will define a function with the same name as the component. Remove code from the constructor, lifecycle methods (like `componentDidMount`, `componentDidUpdate`, etc.), and any other methods from the class.

4. Move the state into the `useState` hook: If the class component has a state using `this.state` and `this.setState()`, move the state into a `useState` hook.

5. Update references to `this.props`: In a function component, props are passed as arguments to the function.

6. Update lifecycle methods: If the class component has specific lifecycle methods, like `componentDidMount` or `componentDidUpdate`, you can use equivalent hooks for function components.

After these steps, you will start the process of migrating from a class component to a functional component. There are several other things to be done that will depend on the complexity of the component. But for starters, you can follow these steps above.

**10 - List a few ways styles can be used with components.**
There are several ways, here are the most common ones I've worked with:

- pure CSS;
- CSS modules;
- Style-components;
- Tailwind CSS:
- node-sass

**11 - How to render an HTML string coming from the server.**

I'm going to make an example that I used in this project to highlight the search, which is the `dangerouslySetInnerHTML`.

`dangerouslySetInnerHTML` is React’s replacement for using innerHTML in the browser DOM. We have the `__html` what is the key of the object returned from the some function.

```
<h3
  dangerouslySetInnerHTML={{
    __html: highlightSearchTerm(country.name.common),
  }}
/>
```
