const App = () => {
  return (
    <div>
      <h1>父组件</h1>
      <Child />
    </div>
  );
}

const Child = () => {
  return (
    <div>
      <h1>子组件</h1>
    </div>
  );
}

export default App;