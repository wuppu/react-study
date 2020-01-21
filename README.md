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
- Virtual DOM에 그리고 실제 DOM과 최소로 비교하여 수정된 부분만 밀어넣는 방식이다.
- 전부 업데이트하지 않고 일부분만 업데이트를 한다는 것이다.
- 이러한 특징들이 빠르게 작용한다.

## Component

- component 는 HTML을 반환하는 함수
- `<App />` 컴포넌트 사용 (JSX = Javascript + HTML)
- Props 는 Component 의 argument 로 들어간다.
```jsx
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

- `import fs from "fs";` == `const fs = require("fs");`
- 컴포넌트를 반환할 때에는 하나의 요소로 감싸서 반환해야 한다. 하지만 react에서 이를 방지하여, `<Fragment>`태그를 만들었고 이는 `<div>`를 렌더링을 생략할 수 있게 한다.
- `condition ? "true" : null` == `condition && "true"`
- CSS를 JSON으로 작성할 수 있다.(JSON에는 `-`을 사용할 수 없기 때문에 camelCase로 작성한다. `background-color` == `backgroundColor`, `-`바로 뒤 문자는 대문자, `-ms`는 예외로 `ms`로 작성한다.)
- 태그를 열었을 경우에는 무조건 닫아줘야 한다.(`<input>`이 아니고 `<input />`)
- 주석을 사용할 때에는 자바스크립트라는 명시하므로, brace(`{}`)를 사용해야 한다.
- Javascript - `...`전개 연산자는 뒤에 위치한 배열 값을 그래도 꺼내서 현재 배열에 복사하는 것이다.
- 임의의 화살표 메서드에 파라미터가 있을 때는 사용할 때 내부에서 화살표 함수를 새로 만들어 사용하면 된다.

```jsx
handleRemove = (index) => {
    const {names} = this.state;
    
    // names에서 index만 제외하고 slice해서 새로운 배열을 만든다.
	this.setState({
        names: [
            ...names.slice(0, index),
            ...names.slice(index + 1, names.length)
        ]
    });   
}

render() {
	const nameList = this.state.names.map(
        (name, index) => (
            // 새로운 화살표 함수를 사용한 이유는 index 값을 함수의 인자로 설정하기 위해서 이다.
            // 이처럼 임의 메서드에 파라미터가 있을 때는 사용할 때 내부에서 함수를 새로 만들면 된다.
    		<li key={index} onDoubleClick={() => handleRemove(index)}>{name}</li>
    	)                              
	);
}
```

- 배열 내장함수인 `filter()`함수를 사용하면 보다 쉽게 구현할 수 있다.
```jsx
handleRemove = (index) => {
    const {names} = this.state;
    this.setState({
        names: names.filter((name, i) => i !== index)
    });
}
```



- `map` 활용
- `map` 은 return 데이터는 array이다.
```jsx
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
```jsx
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
```jsx
class App extends React.Component {
  
}
```
- 유용한 기능들을 간편하게 사용하기 위해서 이다.
- 지금까지 한 것은 function component, 지금부터 사용하는 것은 class component이다.
- function component는 return 하면서 작동하였지만, class component 는 render라는 함수를 통해 작동한다.
- react는 자동적으로 해당 class component의 render method를 실행한다.
```jsx
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
```jsx
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
```jsx
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
- state 배열을 가지고 있을 때, `push()`가 아니라 `concat()`을 사용해야 한다.(`push()`는 기존의 배열 자체가 변형되므로 이는 state목적에 맞지 않는 사용 방법이다. 따라서 자동으로 리렌더링을 트리거하지 않기 때문에 오류가 발생한다. 하지만 `concat()`은 기존의 항목에 추가할 항목을 추가하여 새로운 배열을 만드므로 오류 없이 작동한다.)
- **Component life cycle**
  - Mounting: 생성됬을 때
    - constructor(): class가 생성될 때, 호출된다.
    - componentDidMount(): render가 끝났을 때, 호출된다.
  - Updating: 변경됬을 때
    - componentDidUpdate(): render가 다시 호출됬을 때, 호출된다.
  - Unmouning: 죽었을 때
    - componentWillUnmount(): 제거 되었을 때, 호출된다.
```jsx
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
```jsx
axios.get("https://yts-proxy.now.sh/list_movies.json");
```
- Axios는 느리다. 그렇기에 기다려야 하는 상황이 나온다.
- `async` 비동기 함수, `await` 가 필요하다.
```jsx
getMovies =  async() => {
  const movies = await axios.get("https://yts-proxy.now.sh/list_movies.json");
}
componentDidMount() {
    this.getMovies();
}
```

## Router(react-router-dom)
- npm install react-router-dom
- Navigation 역할을 한다.
- path를 순차적인 순서로 확인하게 된다.
  - 아래와 같이 `/`, `/about`이 있으면, `/`의 컴포넌트를 불러오고, `/about`컴포넌트를 불러오게 되서 두개의 컴포넌트가 rendering된다.
  - 하지만 `exact={true}`를 써주면 `/`와 완전 동일하지 않으면 컴포넌트를 rendering하지 않는다.
```jsx
<HashRouter>
  <Route path="/" exact={true} component={Home} />
  <Route path="/about" component={About} />
</HashRouter>
```
- 페이지를 이동할 때는 `a`태그에 `href`를 사용하지만 이를 사용하게 되면 새로고침되서 react가 부팅된다.
- 그래서 `react-router-dom`의 `Link`태그에 `to`를 사용해서 처리해야 한다.
```jsx
import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </div>
  );
}

export default Navigation;
```
- `Link`를 사용하고 있는 컴포넌트는 `HashRouter`태그 내부에 사용할 수 있다.
- `BrowerRouter`는 `#`마크가 사라지지만 github pages의 업로드에 어려움이 있다.
- `Route`의 path와 `Link`의 to를 맞춰줘야 한다.
- `Route`의 component도 위 항목에 맞게 기입해야 한다.
```jsx
import About from "./routes/About";
import Home from "./routes/Home";
import Detail from "./routes/Detail";
import Navigation from "./components/Navigation";

function App() {
  return (
    <HashRouter>
      <Navigation />
      <Route path="/" exact={true} component={Home} />
      <Route path="/about" component={About} />
      <Route path="/movie-detail" component={Detail} />
    </HashRouter>
  );
}
```
```jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  return (
    <div className="nav__container">
      <Link className="nav__item" to="/">HOME</Link>
      <div className="nav__line"/>
      <Link className="nav__item" to="/about">ABOUT</Link>
    </div>
  );
}
```
- 하지만 더 좋게 보이기 위해서는 path를 분리시켜주는 것이 좋다.
- `props`로 id를 받고 이를 path에 넣주는 방식이다.(path="/movie/:id", pathname: \`/movie/${id}\`)
```jsx
function App() {
  return (
    <HashRouter>
      <Navigation />
      <Route path="/" exact={true} component={Home} />
      <Route path="/about" component={About} />
      <Route path="/movie/:id" component={Detail} />
    </HashRouter>
  );
}
```
```jsx
<Link className="movie__link"
  to={{
    pathname: `/movie/${id}`,
    state: {
      year,
      title,
      summary,
      poster,
      genres
    }
  }}
>
```

## Redux
- 지금 까지의 문제점
  - 페이지를 이동할 때마다 컴포넌트에 있는 state가 유지되지 않고 초기화되는 문제점이 있다.
  - 그래서 페이지를 돌아갈 때마다 다시 데이터를 불러오는 경우가 생긴다.
- 해결 방안
  - state를 스크린 밖에 있도록 도와주는 기능이 필요하다.
  - ex) 영화 리스트를 다른 곳에 저장해 놨다가, 다시 돌아왔을 때 로딩을 다시 할 필요가 없도록 한다.
- Redux가 이러한 기능을 가지고 있고 도와준다.

## Github 에 react page 올리기
- gh-pages 설치: npm install gh-pages
- `package.json`에서 `"homepage": "https://wuppu.github.io/react-study/"`추가 repository 이름이 소문자여야함.(소문자!)
- 프로젝트 빌딩: npm run build
- `"deploy": "gh-pages -d build"`script 부분에 추가하고
- `"predeploy": "npm run build"` script 부분에 추가
- Publish: `npm run deploy`
- 완료

- deploy는 build 폴더에 업로드함(npm run build)
- build를 하지않고 deploy하면 predeploy가 실행됨



## 참고 도서

### 실무에서 알아야 할 기술은 따로 있다! 리액트를 다루는 기술 

출판사: 길벗

지은이: 김민준

