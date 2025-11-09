import { NavLink, Outlet } from 'react-router';

const courses = [
  { id: 'react', title: 'React' },
  { id: 'vue', title: 'Vue' },
  { id: 'svelte', title: 'Svelte' },
];

function Courses() {
  return (
    <div>
      <h2>Courses</h2>
      <ul>
        {courses.map(course => (
          <li key={course.id}>
            <NavLink to={course.id}>{course.title}</NavLink>
          </li>
        ))}
      </ul>
      <hr />
      <Outlet />
    </div>
  );
}

export default Courses;