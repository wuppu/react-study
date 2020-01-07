# 노마드 코더 - React Basic

[노마드 코더 - React Fundamentals 2019](https://www.youtube.com/watch?v=gJdHKIj0Bx4&list=PL7jH19IHhOLPp990qs8MbSsUlzKcTKuCf&index=2)

## Why...?

- 많은 회사들이 사용하고 있기 때문이다.
- Airbnb, npm, netflix, spotify, slack...
- 많은 돈 ,시간, 자원이 투자되고 있다.
- 많은 사람들이 사용하고 있기 때문에, 튜토리얼, 리뷰, 문제점을 쉽게 해결할 수 있다.
- 점점 더 성장하고 있다.

## React

- Virtual DOM(Virtual Document Object Model)
- 소스코드에는 보이지 않는다.
- React는 소스코드에 처음부터 HTML에 넣지 않고, HTML에서 HTML을 추가하거나 제거하는 방법을 알고 있다.
- 빈 HTML파일을 불러오고, react가 HTML을 밀어넣는다. ("root"에 밀어넣는다.)
- 이러한 특징들이 빠르게 작용한다.

## Component

- component 는 HTML을 반환하는 함수
- `<App />` 컴포넌트 사용 (JSX = Javascript + HTML)
- Props 는 Component 의 argument 로 들어간다.
```react
import React from "react";

function Food(props) {
  return <h1>I like Food {props.fav}</h1>;
}

function App() {
  return (
        <div>
​      <h1>Hello</h1>
​      <Food fav="kimchi" />
​    </div>
  );
}
export default App;
```

## 필기

- `map` 활용
- `map` 은 return 데이터는 array이다.
```react
function renderFood(dish) {
  console.log(dish);
  return <Food name={dish.name} picture={dish.image}/>;
}

function App() {
    return (
        <div>
            <h1>Hello</h1>
            {foodILike.map(renderFood)}
        </div>
    );
}
```
- Prop 을 인자로 받을 때, 정확한 인자를 받았는지 확인하는 단계가 필요하다.
  - npm install prop-types 커맨드 후, 설치
  - Component를 작성하고 어떤 자료형을 사용하는지 정해주면 된다.
  ```react
  import PropTypes from "prop-types";
  function Food({ name, picture, rating }) {
    return (
      <div>
        <h1>I like Food {name}</h1>
        <h2>{rating}/5.0</h2>
        <img src={picture} alt={name} />
      </div>
    );
  }
  Food.propTypes = {
      name: PropTypes.string.isRequired,
      picture: PropTypes.string.isRequired,
      rating: PropTypes.number
  };
  ```
- react component 는 아래와 같이 무조건 해줘야한다.
  ```react
  class App extends React.Component {
    
  }
  ```
- 유용한 기능들을 간편하게 사용하기 위해서 이다.
- 지금까지 한 것은 function component, 지금부터 사용하는 것은 class component이다.
- function component는 return 하면서 작동하였지만, class component 는 render라는 함수를 통해 작동한다.
- react는 자동적으로 해당 class component의 render method를 실행한다.
  ```react
  import React, { Component } from 'react';
  import PropTypes from "prop-types";

  class App extends Component {
      render() {
          return <h1>I'm a class component</h1>
      }
  }

  export default App;
  ```
- 사용상에는 function component가 편하지만, 왜 class component를 사용해야 하는가?
  - state가 있기 때문이다.
  - state에 있는 데이터는 변하기 때문에 이를 처리하기 쉽게 설계되어있다.
  - state에 들어있는 데이터만 바꿔서 render를 재호출한다.
- state에 있는 데이터는 직접 수정할 수 없으며, `setState()`를 사용한다.
  - `setState()`를 사용할 때, 항상 새로운 state를 받아야 한다.
    ```react
    state = {
      count: 0
    };

    add = () => {
      this.setState({ count: 1 });
    };
    minus = () => {
      this.setState({ count: -1 });
    };
    ```
    ```react
    state = {
      count: 0
    };

    add = () => {
      this.setState(current => ({ count: current.count + 1 }));
    };
    minus = () => {
      this.setState(current => ({ count: current.count - 1 }));
    };
    ```
- **매 순간 `setState()`를 호출할 때 마다 react는 새로운 state와 함께 render function을 호출한다.**
- Component life cycle
  - Mounting: 생성됬을 때
    - constructor(): class가 생성될 때, 호출된다.
    - componentDidMount(): render가 끝났을 때, 호출된다.
  - Updating: 변경됬을 때
    - componentDidUpdate(): render가 다시 호출됬을 때, 호출된다.
  - Unmouning: 죽었을 때
    - componentWillUnmount(): 제거 되었을 때, 호출된다.
```react
constructor(props) {
  super(props);
  console.log("I'm coming");
}
componentDidMount() {
  console.log("I rendered");
}
componentDidUpdate() {
  console.log("I just updated");
}
componentWillUnmount() {
  console.log("Goodbye");
}
```
- CSS를 사용하고 싶으면 `style={{...}}/` 하면 된다.

## Axios(fetch)
- 사용한 api url: https://yts-proxy.now.sh/list_movies.json
- npm install axios
- Axios는 fetch 위에서 작동하는 작은 layer이다.
```react
axios.get("https://yts-proxy.now.sh/list_movies.json");
```
- Axios는 느리다. 그렇기에 기다려야 하는 상황이 나온다.
- `async` 비동기 함수, `await` 가 필요하다.
```react
getMovies =  async() => {
  const movies = await axios.get("https://yts-proxy.now.sh/list_movies.json");
}
componentDidMount() {
    this.getMovies();
}
```