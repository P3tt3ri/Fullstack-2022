import React from 'react'

const Course = ({ course }) => {
  console.log(course); 
  console.log("xyz")
  //console.log(course.name);
  //console.log(course.id);
  //console.log(course.parts);

  const total = 
    course.parts.reduce((x, y) => { return x + y.exercises; }, 0) 
    
  return (
    <div>
      <h2>{course.name}</h2>
      <ul>
        {course.parts.map(part => 
          <li key={part.id}>
            {part.name} {part.exercises}
          </li>
        )}
      </ul>
      <p><strong>total of {total} exercises</strong></p>
    </div>
  )

}

export default Course