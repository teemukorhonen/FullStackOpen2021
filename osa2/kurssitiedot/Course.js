import React from 'react'

const Header = (props) => {
    return <h2>{props.course.name}</h2>
  }
  
const Part = (props) => {
    return <p>{props.part.name} {props.part.exercises}</p>
}

const Content = ({ parts }) => {
    return (
        parts.map( part => <Part key={part.id} part={part} /> )
    )
}


const Total = ({ parts }) => {
    const total = parts.reduce(
        (s, p) => s + p.exercises, 
        0 // Tarvitsee summan alkutilanteessa
    )
    return <p><b>Total of {total} exercises</b></p>
}


const Course = ({ course }) => {
  return (
      <div>
        <Header course={course}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
      </div>
  )
}

export default Course