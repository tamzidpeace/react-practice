import { useParams } from 'react-router';

function Course() {
  const { courseId } = useParams();

  return (
    <div>
      <h3>Course Details</h3>
      <p>
        <strong>Course ID:</strong> {courseId}
      </p>
    </div>
  );
}

export default Course;