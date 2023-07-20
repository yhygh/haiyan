import React from "react";
import { Link } from "react-router-dom";
import HaiyanHead from "../images/HaiyanYang.jpg";

const Home = () => {
  const skills = [
    "Node",
    "Express",
    "JWT",
    "MongoDB",
    "React",
    "React-redux",
    "Responsive Design",
    "JavaScript",
    "HTML",
    "CSS",
    "JSON",
    "Letsencrypt",
    "Bootstrap",
  ];

  return (
    <div>
      <h2>Welcome to Haiyan's Techland</h2>
      <div className="home-head">
        <img src={HaiyanHead} alt="Haiyan Head Shot" />
      </div>
      <div className="intro">
        <h4>To be a real developer, not an executor.</h4>
        <p>
          It seems a pretty straightforward task to build a website simply
          following a tutorial. However, I quickly learned that this is not true
          once I became a full stack engineer. Without truly understanding
          JavaScript, the idea of any framework or tool, it will become
          impossible to address the challenges that come daily: performance,
          scalability, refactor, security, etc. Yet, the web development
          community uses a ton of frameworks that are changing rapidly. I've run
          into many sticky situations at work when a problem was triggered due
          to misunderstanding of the ideas of a framework. That's why{" "}
          <strong>UNDERSTANDING </strong>
          has become a constanct goal of mine. I believe this effort is what
          makes me a real engineer, not a web framework executor. Luckily, I
          found engineers who shared my views.
        </p>

        <p>
          My favorite web course instructor is <strong>Tony Alicea</strong>, the
          author of
          <strong>JavaScript: Understanding the Weird Parts</strong>. Since I
          took that course, I bought all of Tony's courses, including the latest
          one:{" "}
          <a href="https://dontimitateunderstand.com/p/understanding-react">
            Understanding React
          </a>
          . There's no other person like him out there. It is my ultimate goal
          to become an engineer like him and make my team thrive.
        </p>

        <p>
          This is a responsive <strong>full stack website</strong> that is
          designed for my personal usage in 2020. From creating a favicon image,
          designing the look and feel, architecing the backend and frontend,
          implementing a sandwich bar for cell phone usage, to generating a SSL
          certificate and deployment, I did everything from scratch. I found a
          ton of fantastic
          <Link to="/techinfo"> web development resources</Link> including
          Youtube videos, Udemy courses, bloggers, and articles.{" "}
        </p>
        <p>
          {" "}
          I started by bookmarking these resources and then quickly realized
          that a bookmark feature cannot meet my needs. That's when I started to
          design and develop this website. Whenever I discover something
          valuable, I'd be able to add and categorize it to this website
          directly and also comment on it. Since it's mainly for my personal
          usage, some pages and functions are not visible to you, However, I'm
          sharing with you some of the most valuable resources. If you are also
          a web developer, I hope that you can benefit from my list. Swimming in
          the google ocean isn't really fun, because it takes a lot of time to
          sort out what's worth reading and learning and who is best at
          explaning technologies. I would also appreciate it if you could share
          with me your suggestions about this website or great resources you
          have found out under the
          <Link to="/suggestion"> Your Suggestions</Link> area. I will continue
          to work on it. Here is the{" "}
          <a href="https://github.com/yhygh/haiyan">source code</a>. Looking
          back, I'd like to rewrite this whole website if I had time. :)
          <strong> Thank you!</strong>
        </p>

        <div>
          The skills that I used to build this website in 2020 are as follows:
        </div>
        <ul>
          {skills.map((skill, i) => (
            <li key={i}>{skill}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
