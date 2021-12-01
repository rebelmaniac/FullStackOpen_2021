import React from 'react'

const Header = ({ course }) => {
    return (
      <h2>{course.name}</h2>
    )
}
  
const Total = ({ course }) => {
    const totalExercises = course.parts.reduce( (sum, part) => {
      return sum + part.exercises
    }, 0)
    
    return(
      <b>Number of exercises {totalExercises}</b>
    ) 
}
  
  
const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
}
  
const Content = ({ course }) => {
    return (
      <div>
        {course.parts.map(part => 
          <Part key={part.id} part={part} />
        )}
      </div>
    )
}
  
const Course = ({ course }) => {
  return (course.map((course) => 

    <div key={course.id}>
      <Header course = {course} />
      <Content course = {course} />
      <Total course = {course} />
    </div>
    )
  )
}

export default Course