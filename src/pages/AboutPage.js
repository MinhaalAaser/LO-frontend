import AboutImage from '../images/about-page.jpg';

function AboutPage() {
  return (
    <div className="about-wrapper">
      <div
        className="about-img"
        style={{
          background: 'url(' + AboutImage + ') no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          border: 'transparent 5px',
          borderRadius: '5px',
        }}
      ></div>
      <div className="about-text">
        <h3 className="about-heading">Life, Organized</h3>
        <p>
          We all have responsibilities, and sometimes the biggest challenge is
          remembering all of them. Life, Organized is meant to be a simple tool
          to manage your tasks and prioritize them
        </p>
        <h4>Features:</h4>
        <ul>
          <li>Add tasks as you think of them.</li>
          <li>Improve your productivity by organizing your tasks.</li>
          <li>Keep track of your progress by marking tasks as completed.</li>
          <li>... and many more to come!</li>
        </ul>
        <h4>Who is this app for?</h4>
        <p>
          Life, Organized is for anyone who wants to improve their productivity
          and organization. <br /> Its a great tool for people who have a lot of
          tasks to juggle, such as students, professionals and parents.
        </p>
      </div>
    </div>
  );
}

export default AboutPage;
