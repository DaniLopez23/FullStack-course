import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

//Exercise 1.1
const Content = (props) => {
  return (
    <>
      <p>{props.parts[0].name} {props.parts[0].exercises}</p>
      <p>{props.parts[1].name} {props.parts[1].exercises}</p>
      <p>{props.parts[2].name} {props.parts[2].exercises}</p>
    </>
  )
}

//Exercise 1.2

// const Part = (props) => {
//   <p>{props.part} {props.exercise}</p> 
// }

// const Content = (props) => {
//   return (
//     <>
//       <Part part={props.part1} exercise={props.exercises1}/>
//       <Part part={props.part2} exercise={props.exercises2}/>
//       <Part part={props.part3} exercise={props.exercises3}/>
//     </>
//   )
// }

const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.total}</p>
    </>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    // <>
    //   <Header course={course} />
    //   <Content part1={part1.name} part2={part2.name} part3={part3.name}/>
    //   <Total total={part1.exercises+part2.exercises+part3.exercises} />
    // </>
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}



ReactDOM.render(<App />, document.getElementById('root'))